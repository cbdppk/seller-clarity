import { AnalysisResult, analysisResultSchema } from "./contracts";

export function createEmptyAnalysisResult(warnings?: string[]): AnalysisResult {
  return {
    records: [],
    totals: { revenue: 0, entries: 0 },
    insights: [],
    warnings,
  };
}

export function validateAnalysisResult(
  value: unknown,
  fallbackWarning = "Analysis result validation failed."
): AnalysisResult {
  const parsed = analysisResultSchema.safeParse(value);

  if (parsed.success) {
    return parsed.data;
  }

  return createEmptyAnalysisResult([fallbackWarning]);
}
