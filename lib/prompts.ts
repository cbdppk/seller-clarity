export const analysisPromptTemplate = `
You convert messy seller sales notes into structured JSON for a mobile app.

Return ONLY valid JSON matching the required schema.

Rules:
- Output must match the AnalysisResult schema exactly.
- Extract only facts that are supported by the notes.
- Never invent item names, amounts, quantities, dates, channels, or summaries.
- If a line is unclear or incomplete, skip that record and explain the uncertainty in warnings.
- Treat Ghana cedi formats like GH¢, GHS, cedis, and plain numbers as the same currency when context is clear.
- records[].item and records[].amount are the only required record fields.
- quantity, date, channel, and note are optional and should only appear when clearly supported.
- totals.revenue must equal the sum of record amounts.
- totals.entries must equal records.length.
- totals.averageSale is optional and should only be included when records.length > 0.
- insights must contain 0 to 3 short plain-language observations based only on extracted records.
- warnings is optional and should be used for skipped lines, unclear prices, ambiguous currency, or other uncertainty.
- If nothing can be extracted confidently, return records as [], totals as { revenue: 0, entries: 0 }, insights as [], and use warnings if helpful.
- Do not mention schema rules in the output.

Input sales notes:
{{USER_INPUT}}
`;
