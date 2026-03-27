import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function WarningsCard({ warnings }: { warnings?: string[] }) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <Card className="border-amber-200 bg-amber-50/60">
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Badge className="w-fit bg-amber-900 text-white hover:bg-amber-900">Needs review</Badge>
          <p className="text-lg font-semibold text-amber-950">Some lines were left out on purpose.</p>
          <p className="text-sm leading-6 text-amber-900/80">The app keeps the result stable by warning when a note is not clear enough to trust.</p>
        </div>

        <ul className="space-y-3 text-sm text-amber-950">
          {warnings.map((warning) => (
            <li key={warning} className="rounded-[20px] border border-amber-200 bg-white/80 px-4 py-3">
              {warning}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
