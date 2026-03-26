import { HomeForm } from "@/components/home/home-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e2e8f0_0%,#f8fafc_48%,#ffffff_100%)]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Seller assistant
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Seller Clarity
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            Paste rough sales notes and get clear totals, charts, and simple insights in seconds.
          </p>
        </div>

        <HomeForm />
      </div>
    </main>
  );
}
