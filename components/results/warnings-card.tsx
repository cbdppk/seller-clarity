import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

export function WarningsCard({ warnings }: { warnings?: string[] }) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <Card className="border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-900/20">
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 text-amber-700 dark:text-amber-200" size={18} />
        <div>
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Check these notes</p>
          <p className="mt-1 text-xs text-amber-800 dark:text-amber-200">
            A few lines were unclear. You can re-check and re-run.
          </p>
        </div>
      </div>
      <ul className="mt-3 space-y-2 text-sm text-amber-900 dark:text-amber-100">
        {warnings.map((warning) => (
          <li key={warning} className="rounded-xl bg-white/60 px-3 py-2 dark:bg-[#161616]/40">
            {warning}
          </li>
        ))}
      </ul>
    </Card>
  );
}
