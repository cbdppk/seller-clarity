import { AnalysisResult } from "@/lib/contracts";
import { Card } from "@/components/ui/card";

export function InsightsList({ result }: { result: AnalysisResult }) {
  const insights = result.insights ?? [];

  return (
    <Card className="p-4">
      <div className="mb-3">
        <p className="text-sm font-semibold text-[#1E40AF] dark:text-slate-50">Advice</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Small next steps based on your notes.</p>
      </div>

      {insights.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No advice available for this input yet.</p>
      ) : (
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {insights.map((insight) => (
            <li
              key={insight}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 leading-snug dark:border-[#2a2a2a] dark:bg-[#161616]/40"
            >
              {insight}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
