import { Card } from "@/components/ui/card";

export function WarningsCard({ warnings }: { warnings?: string[] }) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <Card className="border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-semibold text-amber-900">Warnings</p>
      <ul className="mt-2 space-y-1 text-sm text-amber-800">
        {warnings.map((warning) => (
          <li key={warning}>• {warning}</li>
        ))}
      </ul>
    </Card>
  );
}
