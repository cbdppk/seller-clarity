import { HomeForm } from "@/components/home/home-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e2e8f0_0%,#f8fafc_48%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top,#1a1a1a_0%,#161616_48%,#111111_100%)]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1D4ED8] dark:text-slate-400">
            Seller assistant
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#1E40AF] dark:text-slate-50">
            Seller Clarity
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
            Paste rough sales notes and get clear totals, charts, and simple insights in seconds.
          </p>
        </div>

        <HomeForm />
      </div>
    </main>
  );
}
