import { NextRequest, NextResponse } from "next/server";
import { mockAnalyze } from "@/lib/mockAnalyze";
import { createEmptyAnalysisResult, validateAnalysisResult } from "@/lib/validateAnalysis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = String(body?.text ?? "");
    const imageBase64 = typeof body?.imageBase64 === "string" ? body.imageBase64 : undefined;

    if (!text.trim()) {
      const warnings = ["No sales notes were provided."];
      if (imageBase64) {
        warnings.push("Image input is not used in the mock analyzer yet. Please paste text notes for now.");
      }

      return NextResponse.json(createEmptyAnalysisResult(warnings), { status: 200 });
    }

    const result = mockAnalyze(text);
    return NextResponse.json(
      validateAnalysisResult(result, "Schema validation failed on the server."),
      { status: 200 }
    );
  } catch {
    return NextResponse.json(createEmptyAnalysisResult(["Request parsing failed."]), { status: 200 });
  }
}
