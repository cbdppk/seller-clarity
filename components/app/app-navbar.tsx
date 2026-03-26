"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Sparkles } from "lucide-react";

const THEME_KEY = "seller-clarity:theme";

type ThemeMode = "light" | "dark";

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppNavbar() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(THEME_KEY) : null;
    const initial: ThemeMode = saved === "dark" || saved === "light" ? saved : getSystemTheme();

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = useMemo(
    () => () => {
      const next: ThemeMode = theme === "dark" ? "light" : "dark";
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
      window.localStorage.setItem(THEME_KEY, next);
    },
    [theme]
  );

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur dark:border-[#2a2a2a] dark:bg-[#161616]/80">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-[#1E40AF] dark:text-slate-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]/60">
            <Sparkles size={18} />
          </span>
          <span className="text-sm font-bold">Seller Clarity</span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]/60 dark:text-slate-50"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}

