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
      variant="outline"
      size="sm"
      className="rounded-full px-4"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
