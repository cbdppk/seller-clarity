import { z } from "zod";

export const saleRecordSchema = z.object({
  item: z.string(),
  amount: z.number(),
  quantity: z.number().optional(),
  currency: z.enum(["GHS", "USD", "UNKNOWN"]).optional(),
  channel: z.enum(["whatsapp", "tiktok", "instagram", "offline", "unknown"]).optional(),
  date: z.string().optional(),
  note: z.string().optional(),
});

export const analysisResultSchema = z.object({
  records: z.array(saleRecordSchema),
  totals: z.object({
    revenue: z.number(),
    entries: z.number(),
    averageSale: z.number().optional(),
  }),
  topItems: z.array(z.object({
    item: z.string(),
    revenue: z.number(),
    count: z.number(),
  })),
  insights: z.array(z.string()).max(3),
  warnings: z.array(z.string()).optional(),
});

export type SaleRecord = z.infer<typeof saleRecordSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;
