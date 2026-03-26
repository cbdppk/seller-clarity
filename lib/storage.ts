import { AnalysisResult } from "./contracts";

const KEY = "seller-clarity:last-result";

export function saveResult(result: AnalysisResult) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(result));
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
