import Link from "next/link";
import { HeroDraftForm } from "@/components/landing/hero-draft-form";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const points = [
  "Paste rough sales notes",
  "Get clean totals and charts",
  "Keep each result in local history",
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="space-y-6">
          <Badge>Seller Clarity</Badge>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              See the business day clearly from the notes you already have.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Built for informal sellers in Ghana who want a fast summary, not a complicated system.
            </p>
          </div>

          <HeroDraftForm />

          <div className="flex flex-wrap gap-3">
            {points.map((point) => (
              <div key={point} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 lg:pt-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Why it works</p>
            <p className="text-2xl font-semibold tracking-tight text-slate-950">A simple flow that looks professional in a demo.</p>
          </div>

          <div className="space-y-5 border-l border-slate-200 pl-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-950">1. Paste notes</p>
              <p className="text-sm leading-6 text-slate-600">WhatsApp lines, notebook text, delivery notes, and short shop updates all work.</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-950">2. Run analysis</p>
              <p className="text-sm leading-6 text-slate-600">The app extracts only the facts it can trust and warns you when something is unclear.</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-950">3. Keep the result</p>
              <p className="text-sm leading-6 text-slate-600">Each run stays in local history so you can reopen it or print the results page as a PDF.</p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/analyze" className={cn(buttonVariants({ size: "lg" }), "sm:min-w-[200px]")}>
              Open analyze page
            </Link>
            <Link href="/results" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "sm:min-w-[180px]")}>
              View results
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
