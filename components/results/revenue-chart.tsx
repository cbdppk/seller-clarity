"use client";

import { AnalysisResult } from "@/lib/contracts";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function RevenueChart({ result }: { result: AnalysisResult }) {
  const data = result.topItems.map((item) => ({
    name: item.item.length > 12 ? `${item.item.slice(0, 12)}…` : item.item,
    revenue: item.revenue,
  }));

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
