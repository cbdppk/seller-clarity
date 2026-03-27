import { AnalysisResult } from "@/lib/contracts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InsightsList({ result }: { result: AnalysisResult }) {
  const insights = result.insights ?? [];

  return (
    <Card>
      <CardHeader className="gap-3">
        <Badge variant="outline" className="w-fit">
          Insights
        </Badge>
        <CardTitle className="text-2xl">Simple insights</CardTitle>
      </CardHeader>

      {insights.length === 0 ? (
        <CardContent className="pt-0">
          <p className="text-sm leading-7 text-slate-500">No clear insight yet for this set of notes.</p>
        </CardContent>
      ) : (
        <CardContent className="space-y-3 pt-0">
          {insights.map((insight, index) => (
            <div key={insight} className="flex gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <p className="text-sm leading-7 text-slate-700">{insight}</p>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
