"use client";

import { Button } from "@/components/ui/button";

export function SampleChip({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="secondary"
      className="rounded-full border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
