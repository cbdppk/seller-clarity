import { AnalysisResult } from "@/lib/contracts";
import { Card } from "@/components/ui/card";
import { currency } from "@/lib/utils";

export function RecordsList({ result }: { result: AnalysisResult }) {
  return (
    <Card className="p-4">
      <div className="mb-3">
        <p className="text-sm font-semibold text-[#1E40AF] dark:text-slate-50">Extracted records</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Built only from lines with clear sales details.</p>
      </div>
      <div className="space-y-2">
        {result.records.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No clear records yet. Add a price to each line, for example <span className="font-medium">GH¢ 20</span>,
            then try again.
          </p>
        ) : (
          result.records.map((record, index) => (
            <div
              key={`${record.item}-${index}`}
              className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-3 dark:border-[#2a2a2a] dark:bg-[#161616]/40"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 break-words leading-snug">
                  {record.item}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 break-words">
                  {record.note ?? "No original note"}
                </p>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50 tabular-nums">{currency(record.amount)}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
