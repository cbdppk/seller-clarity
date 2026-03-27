"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sampleInputs } from "@/lib/sampleInputs";
import { saveResult } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SampleChip } from "./sample-chip";
import { Sparkles } from "lucide-react";

export function HomeForm() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isDisabled = loading || !text.trim();

  async function analyze() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Analysis failed");
      }

      const data = await res.json();
      const saved = saveResult(data);
      if (!saved) {
        throw new Error("Invalid analysis result");
      }

      router.push("/results");
    } catch (err) {
      setError("Could not finish the analysis right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-4 sm:px-5 sm:py-5 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]/40">
          <div className="flex items-center gap-2 text-[#1E40AF] dark:text-slate-50">
            <Sparkles size={18} />
            <p className="text-sm font-semibold">Paste messy sales notes</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Paste the sales notes the way you already write them on WhatsApp, in a notebook, or in quick daily updates.
          </p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-4 rounded-2xl bg-slate-50 p-3 dark:bg-[#1a1a1a]/40">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8] dark:text-slate-400">
              What you can paste
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Short lines like "rice 2 bags 120", "delivery 20", "sold eggs 70", or mixed notes with missing parts are fine.
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-52 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 dark:border-[#2a2a2a] dark:bg-[#161616] dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-[#2a2a2a]"
            placeholder="rice 2 bags 120&#10;delivery 20&#10;sold eggs 70"
          />

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8] dark:text-slate-400">
              Try a sample
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sampleInputs.map((sample) => (
                <SampleChip key={sample.id} label={sample.label} onClick={() => setText(sample.text)} />
              ))}
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400">
            We only pick what looks clear. If a line is confusing, the app warns you instead of guessing.
          </p>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200">
              {error}
            </div>
          ) : null}

          <Button
            className="mt-5 h-12 w-full rounded-2xl text-sm font-semibold"
            onClick={analyze}
            disabled={isDisabled}
            aria-busy={loading}
          >
            {loading ? "Checking your sales notes..." : "Analyze sales notes"}
          </Button>

          {isDisabled && !loading ? (
            <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
              Paste some sales notes first to continue.
            </p>
          ) : null}
        </div>
      </Card>

      <Card className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8] dark:text-slate-400">
          Privacy note
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          This starter keeps the flow simple for the demo and does not save seller data to a database.
        </p>
      </Card>
    </div>
  );
}
