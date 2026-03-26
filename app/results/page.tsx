"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadResult } from "@/lib/storage";
import { AnalysisResult } from "@/lib/contracts";
import { SummaryCards } from "@/components/results/summary-cards";
import { WarningsCard } from "@/components/results/warnings-card";
import { RecordsList } from "@/components/results/records-list";
import { RevenueChart } from "@/components/results/revenue-chart";
import { ChannelChart } from "@/components/results/channel-chart";
import { InsightsList } from "@/components/results/insights-list";
import { Button } from "@/components/ui/button";

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    setResult(loadResult());
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Results
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Seller snapshot
          </h1>
        </div>
        <Link href="/">
          <Button variant="secondary">Back</Button>
        </Link>
      </div>

      {!result ? (
        <div className="card p-4 text-sm text-slate-600">
          No result found yet. Go back and analyze some sample data first.
        </div>
      ) : (
        <div className="space-y-4">
          <SummaryCards result={result} />
          <WarningsCard warnings={result.warnings} />
          <RevenueChart result={result} />
          <ChannelChart result={result} />
          <InsightsList result={result} />
          <RecordsList result={result} />
        </div>
      )}
    </main>
  );
}
