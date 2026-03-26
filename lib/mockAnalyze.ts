import { AnalysisResult, SaleRecord } from "./contracts";

function extractAmount(line: string): number | null {
  const match = line.match(/(gh¢|ghs|cedis)?\s*(\d+(?:[.,]\d+)?)/i);
  if (!match) return null;
  return Number(match[2].replace(",", "."));
}

function extractItem(line: string): string {
  const cleaned = line
    .replace(/(sold|delivery)/gi, "")
    .replace(/(gh¢|ghs|cedis)/gi, "")
    .replace(/\d+(?:[.,]\d+)?/g, "")
    .replace(/[-:]/g, " ")
    .trim();

  return cleaned.length > 0 ? cleaned : "Unknown item";
}

export function mockAnalyze(text: string): AnalysisResult {
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const records: SaleRecord[] = [];
  const warnings: string[] = [];

  for (const line of lines) {
    const amount = extractAmount(line);
    if (amount === null) {
      warnings.push(`Skipped a line because no amount was detected: "${line}"`);
      continue;
    }

    const item = extractItem(line);

    records.push({
      item,
      amount,
      currency: "GHS",
      channel: "unknown",
      note: line,
    });
  }

  const revenue = records.reduce((sum, r) => sum + r.amount, 0);
  const grouped = new Map<string, { revenue: number; count: number }>();

  for (const record of records) {
    const entry = grouped.get(record.item) ?? { revenue: 0, count: 0 };
    entry.revenue += record.amount;
    entry.count += 1;
    grouped.set(record.item, entry);
  }

  const topItems = [...grouped.entries()]
    .map(([item, data]) => ({ item, revenue: data.revenue, count: data.count }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const insights: string[] = [];
  if (topItems[0]) {
    insights.push(`${topItems[0].item} brings in the highest revenue so far.`);
  }
  if (records.length > 0) {
    insights.push(`You recorded ${records.length} sales entries with total revenue of ${revenue.toFixed(2)} GHS.`);
  }
  if (topItems.some((item) => item.count > 1)) {
    const repeat = topItems.find((item) => item.count > 1);
    if (repeat) insights.push(`${repeat.item} appears repeatedly, which may suggest strong demand.`);
  }
  while (insights.length < 3) {
    insights.push("Keep entering sales consistently so the app can show stronger patterns.");
  }

  return {
    records,
    totals: {
      revenue,
      entries: records.length,
      averageSale: records.length ? revenue / records.length : 0,
    },
    topItems,
    insights: insights.slice(0, 3),
    warnings: warnings.length ? warnings.slice(0, 3) : undefined,
  };
}
