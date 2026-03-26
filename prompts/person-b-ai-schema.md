Design a strict TypeScript type and Zod schema for a seller clarity analysis result.

Requirements:
- records[]
- totals{}
- topItems[]
- insights[] with max 3 items
- warnings[] optional

Records should support:
- item
- amount
- quantity optional
- currency optional
- channel optional
- date optional
- note optional

Then improve the analysis endpoint to handle:
- messy WhatsApp notes
- GH¢ / GHS / cedis formats
- missing quantities
- short seller slang

Return only data we can display confidently.
