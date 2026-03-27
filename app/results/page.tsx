"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadHistory, loadResultState, saveResult, setCurrentResult, type AnalysisHistoryEntry } from "@/lib/storage";
import { AnalysisResult } from "@/lib/contracts";
import { SummaryCards } from "@/components/results/summary-cards";
import { WarningsCard } from "@/components/results/warnings-card";
import { RecordsList } from "@/components/results/records-list";
import { RevenueChart } from "@/components/results/revenue-chart";
import { ChannelChart } from "@/components/results/channel-chart";
import { InsightsList } from "@/components/results/insights-list";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockAnalyze } from "@/lib/mockAnalyze";
import { sampleInputs } from "@/lib/sampleInputs";
import { cn, currency } from "@/lib/utils";

function formatStamp(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Saved result";
  }

  return new Intl.DateTimeFormat("en-GH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getPreview(entry: AnalysisHistoryEntry) {
  const firstLine = entry.sourceText?.split("\n").find((line) => line.trim());
  if (firstLine) {
    return firstLine.slice(0, 56);
  }

  const firstItem = entry.result.records[0]?.item;
  return firstItem ? `Starts with ${firstItem}` : "Saved analysis";
}

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [tryingSample, setTryingSample] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadResultState();
    const entries = loadHistory();
    setResult(stored.result);
    setHistory(entries);
    setSelectedHistoryId(entries[0]?.id ?? null);
    setErrorMessage(stored.status === "error" ? stored.message : "");
    setLoading(false);
  }, []);

  const historyCountLabel = useMemo(() => {
    if (history.length === 0) return "No saved runs";
    if (history.length === 1) return "1 saved run";
    return `${history.length} saved runs`;
  }, [history.length]);

  function trySampleData() {
    if (tryingSample) return;
    setTryingSample(true);

    try {
      const sampleText = sampleInputs[0]?.text ?? "";
      const sampleResult = mockAnalyze(sampleText);
      const saved = saveResult(sampleResult, sampleText);

      if (!saved) {
        throw new Error("Could not save sample result");
      }

      setResult(sampleResult);
      const entries = loadHistory();
      setHistory(entries);
      setSelectedHistoryId(entries[0]?.id ?? null);
      setErrorMessage("");
    } finally {
      setTryingSample(false);
    }
  }

  function openHistoryItem(entry: AnalysisHistoryEntry) {
    setCurrentResult(entry.result);
    setResult(entry.result);
    setSelectedHistoryId(entry.id);
    setErrorMessage("");
  }

  function printResults() {
    window.print();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-6 md:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between no-print">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Results</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Saved sales history and latest result</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" onClick={printResults}>
            Print or save PDF
          </Button>
          <Link href="/analyze" className={cn(buttonVariants({ size: "default" }))}>
            New analysis
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="h-28 animate-pulse rounded-[20px] bg-slate-100" />
            <div className="h-28 animate-pulse rounded-[20px] bg-slate-100" />
            <div className="h-28 animate-pulse rounded-[20px] bg-slate-100" />
          </div>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-4">
              <div className="h-64 animate-pulse rounded-[20px] bg-slate-100" />
              <div className="h-64 animate-pulse rounded-[20px] bg-slate-100" />
            </div>
            <div className="h-72 animate-pulse rounded-[20px] bg-slate-100" />
          </div>
        </div>
      ) : errorMessage ? (
        <Card>
          <CardContent className="space-y-5 p-6">
            <Badge variant="outline" className="w-fit">
              Saved result issue
            </Badge>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-slate-950">Could not open the saved result.</p>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                {errorMessage} Run the analysis again or open sample data to keep the demo moving.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/analyze" className={cn(buttonVariants({ variant: "secondary" }), "w-full sm:flex-1")}>
                Back to analyze
              </Link>
              <Button className="sm:flex-1" onClick={trySampleData} disabled={tryingSample}>
                {tryingSample ? "Preparing sample..." : "Use sample data"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : !result ? (
        <Card>
          <CardContent className="space-y-5 p-6">
            <Badge variant="outline" className="w-fit">
              No result yet
            </Badge>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-slate-950">Run one note to fill this page.</p>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                Start in the analyze page, or use sample data if you want to preview the full layout quickly.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/analyze" className={cn(buttonVariants({ variant: "secondary" }), "w-full sm:flex-1")}>
                Back to analyze
              </Link>
              <Button className="sm:flex-1" onClick={trySampleData} disabled={tryingSample}>
                {tryingSample ? "Preparing sample..." : "Use sample data"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6 print-area">
            <SummaryCards result={result} />
            <WarningsCard warnings={result.warnings} />
            <RecordsList result={result} />
            <div className="grid gap-6 xl:grid-cols-2">
              <RevenueChart result={result} />
              <ChannelChart result={result} />
            </div>
            <InsightsList result={result} />
          </div>

          <aside className="space-y-4 no-print">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">History</p>
              <p className="text-sm text-slate-600">{historyCountLabel}</p>
            </div>

            <div className="space-y-3">
              {history.length === 0 ? (
                <Card>
                  <CardContent className="p-5">
                    <p className="text-sm leading-6 text-slate-600">Each new analysis appears here so you can reopen it later.</p>
                  </CardContent>
                </Card>
              ) : (
                history.map((entry) => {
                  const active = selectedHistoryId === entry.id;

                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => openHistoryItem(entry)}
                      className={`w-full rounded-[20px] border px-4 py-4 text-left transition ${
                        active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-950 hover:border-slate-300"
                      }`}
                    >
                      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${active ? "text-slate-300" : "text-slate-400"}`}>
                        {formatStamp(entry.createdAt)}
                      </p>
                      <p className={`mt-2 text-sm font-medium leading-6 ${active ? "text-white" : "text-slate-900"}`}>{getPreview(entry)}</p>
                      <p className={`mt-3 text-sm ${active ? "text-slate-300" : "text-slate-500"}`}>
                        {currency(entry.result.totals.revenue)} · {entry.result.totals.entries} entries
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
