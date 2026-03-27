import { NextRequest, NextResponse } from "next/server";
import { AnalysisResult } from "@/lib/contracts";
import { mockAnalyze } from "@/lib/mockAnalyze";
import { createEmptyAnalysisResult, validateAnalysisResult } from "@/lib/validateAnalysis";
import { analysisPromptTemplate } from "@/lib/prompts";

const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-5-mini";
const MAX_INPUT_CHARS = 4000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const CACHE_TTL_MS = 5 * 60_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type CacheEntry = {
  result: AnalysisResult;
  expiresAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();
const analysisCache = new Map<string, CacheEntry>();

const analysisResultJsonSchema = {
  name: "analysis_result",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      records: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            item: { type: "string" },
            amount: { type: "number" },
            quantity: { type: ["number", "null"] },
            date: { type: ["string", "null"] },
            channel: { type: ["string", "null"] },
            note: { type: ["string", "null"] },
          },
          required: ["item", "amount", "quantity", "date", "channel", "note"],
        },
      },
      totals: {
        type: "object",
        additionalProperties: false,
        properties: {
          revenue: { type: "number" },
          entries: { type: "number" },
          averageSale: { type: ["number", "null"] },
        },
        required: ["revenue", "entries", "averageSale"],
      },
      insights: {
        type: "array",
        items: { type: "string" },
        maxItems: 3,
      },
      warnings: {
        type: ["array", "null"],
        items: { type: "string" },
      },
    },
    required: ["records", "totals", "insights", "warnings"],
  },
} as const;

function withWarnings(result: AnalysisResult, warnings: string[]): AnalysisResult {
  const mergedWarnings = [...(result.warnings ?? []), ...warnings];

  return {
    ...result,
    warnings: mergedWarnings.length > 0 ? mergedWarnings.slice(0, 5) : undefined,
  };
}

function buildPrompt(text: string) {
  return analysisPromptTemplate.replace("{{USER_INPUT}}", text);
}

function stripNulls<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripNulls(item)) as T;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, entryValue]) => entryValue !== null)
      .map(([key, entryValue]) => [key, stripNulls(entryValue)]);

    return Object.fromEntries(entries) as T;
  }

  return value;
}

function normalizeInput(text: string) {
  return text.trim().replace(/\s+/g, " ");
}

function getClientKey(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip") ?? "unknown";
}

function enforceRateLimit(clientKey: string) {
  const now = Date.now();
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  rateLimitStore.set(clientKey, current);
  return true;
}

function getCachedAnalysis(cacheKey: string) {
  const entry = analysisCache.get(cacheKey);
  if (!entry) {
    return null;
  }

  if (entry.expiresAt <= Date.now()) {
    analysisCache.delete(cacheKey);
    return null;
  }

  return entry.result;
}

function setCachedAnalysis(cacheKey: string, result: AnalysisResult) {
  analysisCache.set(cacheKey, {
    result,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

async function requestStructuredAnalysis(text: string): Promise<AnalysisResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      reasoning_effort: "minimal",
      max_completion_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            "You extract seller sales notes into structured JSON. Never invent uncertain facts. Put uncertainty into warnings.",
        },
        {
          role: "user",
          content: buildPrompt(text),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: analysisResultJsonSchema,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string | null;
        refusal?: string;
      };
    }>;
  };

  const message = data.choices?.[0]?.message;
  if (!message) {
    throw new Error("OpenAI response did not include a message.");
  }

  if (message.refusal) {
    return createEmptyAnalysisResult([`The model refused the extraction request: ${message.refusal}`]);
  }

  if (!message.content) {
    throw new Error("OpenAI response did not include structured content.");
  }

  const parsedContent = JSON.parse(message.content) as AnalysisResult;
  return validateAnalysisResult(
    stripNulls(parsedContent),
    "The AI response did not match the analysis schema."
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawText = String(body?.text ?? "");
    const imageBase64 = typeof body?.imageBase64 === "string" ? body.imageBase64 : undefined;
    const text = rawText.trim().slice(0, MAX_INPUT_CHARS);
    const textWasTrimmed = rawText.trim().length > MAX_INPUT_CHARS;

    if (!text) {
      const warnings = ["No sales notes were provided."];
      if (imageBase64) {
        warnings.push("Image input is not used in the mock analyzer yet. Please paste text notes for now.");
      }

      return NextResponse.json(createEmptyAnalysisResult(warnings), { status: 200 });
    }

    if (imageBase64) {
      return NextResponse.json(
        withWarnings(
          createEmptyAnalysisResult(["Image analysis is not enabled yet. Please paste the notes as text for now."]),
          []
        ),
        { status: 200 }
      );
    }

    const clientKey = getClientKey(req);
    if (!enforceRateLimit(clientKey)) {
      return NextResponse.json(
        createEmptyAnalysisResult(["Too many analysis requests in a short time. Please wait a minute and try again."]),
        { status: 429 }
      );
    }

    const cacheKey = normalizeInput(text);
    const cached = getCachedAnalysis(cacheKey);
    if (cached) {
      return NextResponse.json(
        withWarnings(cached, ["Recent identical notes were reused to save time and tokens."]),
        { status: 200 }
      );
    }

    try {
      const llmResult = await requestStructuredAnalysis(text);

      if (!llmResult) {
        const fallback = mockAnalyze(text);
        const finalResult = withWarnings(
          fallback,
          [
            "OPENAI_API_KEY is missing, so mock analysis was used instead.",
            ...(textWasTrimmed ? ["Input was shortened to keep analysis fast and affordable."] : []),
          ]
        );
        setCachedAnalysis(cacheKey, finalResult);
        return NextResponse.json(finalResult, { status: 200 });
      }

      const validatedResult = validateAnalysisResult(
        llmResult,
        "The AI response did not match the analysis schema."
      );

      const finalResult = withWarnings(
        validatedResult,
        textWasTrimmed ? ["Input was shortened to keep analysis fast and affordable."] : []
      );

      if (finalResult.records.length === 0 && !finalResult.warnings?.length) {
        const emptyResult = withWarnings(finalResult, ["No confident records could be extracted from the notes."]);
        setCachedAnalysis(cacheKey, emptyResult);
        return NextResponse.json(emptyResult, { status: 200 });
      }

      setCachedAnalysis(cacheKey, finalResult);
      return NextResponse.json(finalResult, { status: 200 });
    } catch {
      const fallback = mockAnalyze(text);
      const finalResult = withWarnings(
        fallback,
        [
          "AI extraction failed, so a best-effort fallback analysis was used.",
          ...(textWasTrimmed ? ["Input was shortened to keep analysis fast and affordable."] : []),
        ]
      );
      setCachedAnalysis(cacheKey, finalResult);
      return NextResponse.json(finalResult, { status: 200 });
    }
  } catch {
    return NextResponse.json(createEmptyAnalysisResult(["Request parsing failed."]), { status: 200 });
  }
}
