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
  const [text, setText] = useState<string>(sampleInputs[0].text);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      saveResult(data);
      router.push("/results");
    } catch (err) {
      setError("Could not analyze right now. Try sample data again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="mb-3 flex items-center gap-2 text-slate-900">
          <Sparkles size={18} />
          <p className="text-sm font-semibold">Paste messy sales notes</p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-48 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
          placeholder="Sold black bag - 120&#10;Red bag - 150&#10;Delivery - 20"
        />

        <p className="mt-3 text-xs text-slate-500">
          Text-first for speed. You can add image upload later as a hackathon bonus.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {sampleInputs.map((sample) => (
            <SampleChip key={sample.id} label={sample.label} onClick={() => setText(sample.text)} />
          ))}
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <Button className="mt-4 w-full" onClick={analyze} disabled={loading || !text.trim()}>
          {loading ? "Analyzing..." : "Analyze sales notes"}
        </Button>
      </Card>

      <p className="text-center text-xs text-slate-500">
        Privacy note: this starter does not store user data on a database.
      </p>
    </div>
  );
}
