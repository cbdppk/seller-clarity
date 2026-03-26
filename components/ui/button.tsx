import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className = "", variant = "primary", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-[#3a3a3a] disabled:opacity-60";
  const style =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#f1f1f1] dark:text-[#161616] dark:hover:bg-white"
      : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 dark:bg-[#1a1a1a] dark:text-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#161616]";
  return <button className={`${base} ${style} ${className}`} {...props} />;
}
