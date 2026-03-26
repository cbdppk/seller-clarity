"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadResult, saveResult } from "@/lib/storage";
import { AnalysisResult } from "@/lib/contracts";
import { SummaryCards } from "@/components/results/summary-cards";
import { WarningsCard } from "@/components/results/warnings-card";
import { RecordsList } from "@/components/results/records-list";
import { RevenueChart } from "@/components/results/revenue-chart";
import { ChannelChart } from "@/components/results/channel-chart";
import { InsightsList } from "@/components/results/insights-list";
import { Button } from "@/components/ui/button";
import { mockAnalyze } from "@/lib/mockAnalyze";
import { sampleInputs } from "@/lib/sampleInputs";

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [tryingSample, setTryingSample] = useState(false);

  useEffect(() => {
    setResult(loadResult());
    setLoading(false);
  }, []);

  function trySampleData() {
    if (tryingSample) return;
    setTryingSample(true);
    try {
      const sampleText = sampleInputs[0]?.text ?? "";
      const sampleResult = mockAnalyze(sampleText);
      saveResult(sampleResult);
      setResult(sampleResult);
    } finally {
      setTryingSample(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8] dark:text-slate-400">
            Results
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#1E40AF] dark:text-slate-50">
            Seller snapshot
          </h1>
        </div>
        <Link href="/">
          <Button variant="secondary">Back</Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-[#1a1a1a]" />
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-[#1a1a1a]" />
            <div className="hidden h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-[#1a1a1a] sm:block" />
          </div>
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100 dark:bg-[#1a1a1a]" />
          <div className="h-56 animate-pulse rounded-2xl bg-slate-100 dark:bg-[#1a1a1a]" />
        </div>
      ) : !result ? (
        <div className="card p-4">
          <p className="text-sm font-semibold text-[#1E40AF] dark:text-slate-50">No results yet</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Paste some sales notes, or tap the button below to try sample data.
          </p>
          <div className="mt-4 flex gap-2">
            <Link href="/" className="flex-1">
              <Button variant="secondary" className="w-full">
                Back to notes
              </Button>
            </Link>
            <Button className="flex-1" onClick={trySampleData} disabled={tryingSample}>
              {tryingSample ? "Preparing..." : "Try sample data"}
            </Button>
          </div>
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
