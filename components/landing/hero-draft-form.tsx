"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function HeroDraftForm() {
  const router = useRouter();
  const [draft, setDraft] = useState("");

  function openWorkspace() {
    const query = draft.trim() ? `?draft=${encodeURIComponent(draft.trim())}` : "";
    router.push(`/analyze${query}`);
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <Textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        className="min-h-[170px] border-none bg-slate-50 shadow-none focus:ring-0"
        placeholder="rice 2 bags 120&#10;delivery 20&#10;sold eggs 70"
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Start with a rough note here, then continue in the analyze workspace.</p>
        <Button size="lg" onClick={openWorkspace} className="sm:min-w-[180px]">
          Open workspace
        </Button>
      </div>
    </div>
  );
}
