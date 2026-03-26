"use client";

import { AnalysisResult } from "@/lib/contracts";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#334155", "#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0"];

export function ChannelChart({ result }: { result: AnalysisResult }) {
  const grouped = new Map<string, number>();

  for (const record of result.records) {
    const key = record.channel ?? "unknown";
    grouped.set(key, (grouped.get(key) ?? 0) + record.amount);
  }

  const data = [...grouped.entries()]
    .map(([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0);

  if (data.length <= 1) return null;

  return (
    <Card className="p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900">Revenue share by channel</p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={45} outerRadius={78}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
