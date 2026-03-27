"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/app/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/analyze", label: "Analyze" },
  { href: "/results", label: "Results" },
];

export function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="no-print border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <BrandMark />

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white p-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link href="/analyze" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "hidden md:inline-flex")}>
          Open workspace
        </Link>

        <Link
          href="/analyze"
          className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 md:hidden"
        >
          Open
        </Link>
      </div>
    </header>
  );
}
