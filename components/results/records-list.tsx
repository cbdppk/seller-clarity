import { AnalysisResult } from "@/lib/contracts";
import { Card } from "@/components/ui/card";
import { currency } from "@/lib/utils";

export function RecordsList({ result }: { result: AnalysisResult }) {
  return (
    <Card className="p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900">Extracted records</p>
      <div className="space-y-3">
        {result.records.length === 0 ? (
          <p className="text-sm text-slate-500">No records found.</p>
        ) : (
          result.records.map((record, index) => (
            <div
              key={`${record.item}-${index}`}
              className="flex items-start justify-between rounded-xl border border-slate-100 p-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{record.item}</p>
                <p className="mt-1 text-xs text-slate-500">{record.note ?? "No original note"}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">{currency(record.amount)}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
