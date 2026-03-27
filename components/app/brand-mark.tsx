import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  compact?: boolean;
  href?: string;
  className?: string;
};

export function BrandMark({ compact = false, href = "/", className }: BrandMarkProps) {
  const content = (
    <>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="10" height="7" rx="3.5" fill="#0F172A" />
          <rect x="11" y="13" width="10" height="7" rx="3.5" fill="#2563EB" />
          <circle cx="9" cy="16" r="2.5" fill="#E2E8F0" />
        </svg>
      </span>
      <span className={cn("min-w-0", compact && "sr-only")}>
        <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Seller Clarity</span>
        <span className="block text-sm text-slate-700">AI sales clarity for daily trade</span>
      </span>
    </>
  );

  return (
    <Link href={href} className={cn("flex items-center gap-3", className)}>
      {content}
    </Link>
  );
}
