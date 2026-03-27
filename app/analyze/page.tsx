import Link from "next/link";
import { HomeForm } from "@/components/home/home-form";

type AnalyzePageProps = {
  searchParams?: Promise<{
    draft?: string | string[];
  }>;
};

export default async function AnalyzePage({ searchParams }: AnalyzePageProps) {
  const params = await searchParams;
  const draft = Array.isArray(params?.draft) ? params?.draft[0] ?? "" : params?.draft ?? "";

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-6 md:py-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Analyze</p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">Paste notes and run analysis</h1>
        </div>

        <Link href="/" className="text-sm font-semibold text-slate-500 transition hover:text-slate-950">
          Back to landing
        </Link>
      </div>

      <HomeForm initialText={draft} />
    </main>
  );
}
