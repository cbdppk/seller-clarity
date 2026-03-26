import { AnalysisResult } from "@/lib/contracts";
import { Card } from "@/components/ui/card";

export function InsightsList({ result }: { result: AnalysisResult }) {
  return (
    <Card className="p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900">Simple insights</p>
      <ul className="space-y-2 text-sm text-slate-700">
        {result.insights.map((insight) => (
          <li key={insight} className="rounded-xl bg-slate-50 p-3">
            {insight}
          </li>
        ))}
      </ul>
    </Card>
  );
}
