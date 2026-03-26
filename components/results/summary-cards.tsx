import { AnalysisResult } from "@/lib/contracts";
import { currency } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function SummaryCards({ result }: { result: AnalysisResult }) {
  const cards = [
    { label: "Revenue", value: currency(result.totals.revenue) },
    { label: "Entries", value: String(result.totals.entries) },
    {
      label: "Average sale",
      value: result.totals.averageSale ? currency(result.totals.averageSale) : "-",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{card.label}</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{card.value}</p>
        </Card>
      ))}
    </div>
  );
}
