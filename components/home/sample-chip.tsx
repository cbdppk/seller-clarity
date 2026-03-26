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
      className="rounded-full border-indigo-200 bg-white px-3 py-2 text-xs font-medium text-[#1E40AF] shadow-sm dark:border-[#2a2a2a] dark:bg-[#161616] dark:text-slate-200"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
