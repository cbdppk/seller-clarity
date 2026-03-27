import { z } from "zod";
import { AnalysisResult } from "./contracts";
import { analysisResultSchema } from "./contracts";

const KEY = "seller-clarity:last-result";
const HISTORY_KEY = "seller-clarity:result-history";
const MAX_HISTORY = 12;

const historyEntrySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  sourceText: z.string().optional(),
  result: analysisResultSchema,
});

export type AnalysisHistoryEntry = z.infer<typeof historyEntrySchema>;

export type LoadResultState =
  | { status: "empty"; result: null }
  | { status: "ready"; result: AnalysisResult }
  | { status: "error"; result: null; message: string };

function makeHistoryEntry(result: AnalysisResult, sourceText?: string): AnalysisHistoryEntry {
  return {
    id:
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    sourceText: sourceText?.trim() ? sourceText.trim() : undefined,
    result,
  };
}

export function setCurrentResult(result: AnalysisResult): boolean {
  if (typeof window === "undefined") return false;

  localStorage.setItem(KEY, JSON.stringify(result));
  return true;
}

export function saveResult(result: unknown, sourceText?: string): result is AnalysisResult {
  if (typeof window === "undefined") return false;
  const parsed = analysisResultSchema.safeParse(result);
  if (!parsed.success) {
    return false;
  }

  setCurrentResult(parsed.data);

  const nextEntry = makeHistoryEntry(parsed.data, sourceText);
  const existing = loadHistory().filter((entry) => {
    if (sourceText?.trim() && entry.sourceText === sourceText.trim()) {
      return false;
    }

    return entry.result.totals.revenue !== parsed.data.totals.revenue || entry.createdAt !== nextEntry.createdAt;
  });

  localStorage.setItem(HISTORY_KEY, JSON.stringify([nextEntry, ...existing].slice(0, MAX_HISTORY)));
  return true;
}

export function loadResult(): AnalysisResult | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const validated = analysisResultSchema.safeParse(parsed);
    return validated.success ? validated.data : null;
  } catch {
    return null;
  }
}

export function loadHistory(): AnalysisHistoryEntry[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    const validated = z.array(historyEntrySchema).safeParse(parsed);
    return validated.success ? validated.data : [];
  } catch {
    return [];
  }
}

export function loadResultState(): LoadResultState {
  if (typeof window === "undefined") {
    return { status: "empty", result: null };
  }

  const raw = localStorage.getItem(KEY);
  if (!raw) {
    return { status: "empty", result: null };
  }

  try {
    const parsed = JSON.parse(raw);
    const validated = analysisResultSchema.safeParse(parsed);

    if (!validated.success) {
      return {
        status: "error",
        result: null,
        message: "We found saved results, but they could not be opened safely.",
      };
    }

    return { status: "ready", result: validated.data };
  } catch {
    return {
      status: "error",
      result: null,
      message: "We could not read the saved results on this device.",
    };
  }
}
