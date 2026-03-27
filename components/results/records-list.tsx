import { AnalysisResult } from "@/lib/contracts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currency } from "@/lib/utils";

export function RecordsList({ result }: { result: AnalysisResult }) {
  return (
    <Card>
      <CardHeader className="gap-3">
        <Badge variant="outline" className="w-fit">
          Records
        </Badge>
        <div className="space-y-2">
          <CardTitle className="text-2xl">Extracted records</CardTitle>
          <CardDescription>Only the lines with clear sales details are turned into records.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {result.records.length === 0 ? (
          <p className="text-sm leading-7 text-slate-500">
            No clear records yet. Add a price to each line, for example <span className="font-medium">GH¢ 20</span>,
            then try again.
          </p>
        ) : (
          result.records.map((record, index) => (
            <div
              key={`${record.item}-${index}`}
              className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-semibold text-slate-950 break-words leading-snug">{record.item}</p>
                  {record.quantity ? <Badge variant="secondary">Qty {record.quantity}</Badge> : null}
                </div>
                <p className="text-sm text-slate-500 break-words">
                  {record.note ?? "No original note"}
                </p>
              </div>
              <p className="text-base font-bold text-slate-950 tabular-nums">{currency(record.amount)}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
