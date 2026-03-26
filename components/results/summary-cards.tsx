import type { ComponentType } from "react";
import { BarChart3, Calculator, Wallet } from "lucide-react";
import { AnalysisResult } from "@/lib/contracts";
import { currency } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type MetricCard = {
  label: string;
  value: string;
  helper: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  accent: string;
  emphasize?: boolean;
};

export function SummaryCards({ result }: { result: AnalysisResult }) {
  const cards: MetricCard[] = [
    {
      label: "Total revenue",
      value: currency(result.totals.revenue),
      helper: "From your pasted notes",
      icon: Wallet,
      accent: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-slate-200",
      emphasize: true,
    },
    {
      label: "Sales entries",
      value: String(result.totals.entries),
      helper: "Extracted lines",
      icon: BarChart3,
      accent: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-slate-200",
    },
    {
      label: "Average sale",
      value: result.totals.averageSale ? currency(result.totals.averageSale) : "-",
      helper: "Per entry",
      icon: Calculator,
      accent: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-slate-200",
    },
  ];

  return (
    <section className="space-y-2">
      <p className="text-sm font-semibold text-[#1E40AF] dark:text-slate-50">Quick snapshot</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className={`overflow-hidden p-4 ${card.emphasize ? "col-span-2 sm:col-span-1" : "col-span-1"}`}
            >
              <div className="flex h-full flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1D4ED8] dark:text-slate-400">
                  {card.label}
                </p>

                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-2xl font-bold text-[#1E40AF] dark:text-slate-50 tabular-nums">
                    {card.value}
                  </p>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${card.accent}`}
                  >
                    <Icon size={16} />
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{card.helper}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
