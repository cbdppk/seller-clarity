import { AnalysisResult } from "@/lib/contracts";
import { currency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type MetricCard = {
  label: string;
  value: string;
  helper: string;
  eyebrow: string;
};

export function SummaryCards({ result }: { result: AnalysisResult }) {
  const cards: MetricCard[] = [
    {
      label: "Total revenue",
      value: currency(result.totals.revenue),
      helper: "From the notes you pasted",
      eyebrow: "Main total",
    },
    {
      label: "Sales entries",
      value: String(result.totals.entries),
      helper: "Clear records found",
      eyebrow: "Count",
    },
    {
      label: "Average sale",
      value: result.totals.averageSale ? currency(result.totals.averageSale) : "-",
      helper: "Across saved entries",
      eyebrow: "Average",
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Badge className="w-fit">Snapshot</Badge>
          <p className="text-2xl font-semibold tracking-tight text-slate-950">The clean summary comes first.</p>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-500">Use this section to explain the day before moving into the detailed records and charts.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{card.eyebrow}</p>
              <p className="mt-4 text-sm font-medium text-slate-600">{card.label}</p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-slate-950">{card.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">{card.helper}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
