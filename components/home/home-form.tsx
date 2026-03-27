"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sampleInputs } from "@/lib/sampleInputs";
import { saveResult } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SampleChip } from "./sample-chip";

const quickNotes = [
  "Paste plain text from WhatsApp, notebook lines, or shop updates",
  "The app keeps only facts it can defend",
  "Unclear lines become warnings instead of guesses",
];

type HomeFormProps = {
  initialText?: string;
};

export function HomeForm({ initialText = "" }: HomeFormProps) {
  const router = useRouter();
  const [text, setText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isDisabled = loading || !text.trim();

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  async function analyze() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      const saved = saveResult(data, text);

      if (!saved) {
        throw new Error("Invalid analysis result");
      }

      router.push("/results");
    } catch {
      setError("Could not finish the analysis right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-5 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Badge className="w-fit">Paste notes</Badge>
              <p className="text-sm text-slate-600">Keep it rough. We will structure it after.</p>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Text first</p>
          </div>

          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-[280px] text-base leading-7"
            placeholder="Yam 10gh per each and sold 40&#10;Rice 60bags - 1000gh&#10;Yeast 60cups - 200gh"
          />

          <div className="flex flex-wrap gap-2">
            {sampleInputs.map((sample) => (
              <SampleChip key={sample.id} label={sample.label} onClick={() => setText(sample.text)} />
            ))}
          </div>

          {error ? (
            <div className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Results are saved locally so you can reopen them from history.</p>
            <Button className="h-11 w-full sm:w-auto sm:min-w-[220px]" onClick={analyze} disabled={isDisabled} aria-busy={loading}>
              {loading ? "Analyzing..." : "Analyze sales notes"}
            </Button>
          </div>

          {isDisabled && !loading ? <p className="text-sm text-slate-500">Paste some sales notes first to continue.</p> : null}
        </CardContent>
      </Card>

      <div className="grid gap-4 border-t border-slate-200 pt-5 md:grid-cols-3">
        {quickNotes.map((note) => (
          <div key={note} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Guide</p>
            <p className="text-sm leading-6 text-slate-600">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
