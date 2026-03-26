"use client";

import { AnalysisResult } from "@/lib/contracts";
import { currency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function RevenueChart({ result }: { result: AnalysisResult }) {
  const grouped = new Map<string, number>();

  for (const record of result.records) {
    grouped.set(record.item, (grouped.get(record.item) ?? 0) + record.amount);
  }

  const data = [...grouped.entries()]
    .map(([item, revenue]) => ({
      name: item.length > 12 ? `${item.slice(0, 12)}…` : item,
      revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  if (data.length === 0) return null;

  return (
    <Card className="p-4 text-slate-900 dark:text-slate-50">
      <p className="mb-3 text-sm font-semibold text-[#1E40AF] dark:text-slate-50">Revenue by item</p>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="2 2" stroke="var(--chart-muted)" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tick={{ fill: "var(--chart-text)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickCount={4}
              tickFormatter={(value) => currency(Number(value))}
              tick={{ fill: "var(--chart-text)", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => currency(Number(value))}
              labelFormatter={(label) => String(label)}
              wrapperStyle={{ color: "var(--tooltip-text)" }}
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: 12,
              }}
              labelStyle={{ color: "var(--tooltip-text)" }}
              itemStyle={{ color: "var(--tooltip-text)" }}
            />
            <Bar dataKey="revenue" fill="currentColor" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
