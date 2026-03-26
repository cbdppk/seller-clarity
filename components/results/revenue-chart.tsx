"use client";

import { AnalysisResult } from "@/lib/contracts";
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
    <Card className="p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900">Revenue by item</p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="revenue" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
