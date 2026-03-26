import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className = "", variant = "primary", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-60";
  const style = variant === "primary"
    ? "bg-slate-900 text-white hover:bg-slate-800"
    : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50";
  return <button className={`${base} ${style} ${className}`} {...props} />;
}
