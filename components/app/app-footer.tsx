import Link from "next/link";
import { BrandMark } from "@/components/app/brand-mark";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/analyze", label: "Analyze" },
  { href: "/results", label: "Results" },
];

export function AppFooter() {
  return (
    <footer className="no-print border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-sm space-y-3">
          <BrandMark />
          <p className="text-sm leading-6 text-slate-500">
            Built for informal sellers in Ghana who need fast clarity from rough sales notes.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:gap-6">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-950">
              {link.label}
            </Link>
          ))}
          <span className="text-slate-400">Hackathon demo build</span>
        </div>
      </div>
    </footer>
  );
}
