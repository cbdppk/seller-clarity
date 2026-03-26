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
    <Button variant="secondary" className="rounded-full px-3 py-2 text-xs" onClick={onClick}>
      {label}
    </Button>
  );
}
