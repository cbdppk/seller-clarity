import { HomeForm } from "@/components/home/home-form";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Mobile-first hackathon MVP
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Seller Clarity
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Turn messy sales notes into clear totals, charts, and next-step guidance.
        </p>
      </div>

      <HomeForm />
    </main>
  );
}
