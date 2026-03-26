import { z } from "zod";

export const saleRecordSchema = z.object({
  item: z.string(),
  amount: z.number(),
  quantity: z.number().optional(),
  date: z.string().optional(),
  channel: z.string().optional(),
  note: z.string().optional(),
});

export const totalsSchema = z.object({
  revenue: z.number(),
  entries: z.number(),
  averageSale: z.number().optional(),
});

export const analysisResultSchema = z.object({
  records: z.array(saleRecordSchema),
  totals: totalsSchema,
  insights: z.array(z.string()).max(3),
  warnings: z.array(z.string()).optional(),
});

export type SaleRecord = z.infer<typeof saleRecordSchema>;
export type Totals = z.infer<typeof totalsSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;
