import { AnalysisResult, analysisResultSchema } from "./contracts";

const KEY = "seller-clarity:last-result";

export type LoadResultState =
  | { status: "empty"; result: null }
  | { status: "ready"; result: AnalysisResult }
  | { status: "error"; result: null; message: string };

export function saveResult(result: unknown): result is AnalysisResult {
  if (typeof window === "undefined") return false;

  const parsed = analysisResultSchema.safeParse(result);
  if (!parsed.success) {
    return false;
  }

  localStorage.setItem(KEY, JSON.stringify(parsed.data));
  return true;
}

export function loadResult(): AnalysisResult | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AnalysisResult;
  } catch {
    return null;
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
        message: "Saved results could not be opened safely.",
      };
    }

    return { status: "ready", result: validated.data };
  } catch {
    return {
      status: "error",
      result: null,
      message: "Saved results could not be read on this device.",
    };
  }
}
