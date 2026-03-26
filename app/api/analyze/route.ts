import { NextRequest, NextResponse } from "next/server";
import { analysisResultSchema } from "@/lib/contracts";
import { mockAnalyze } from "@/lib/mockAnalyze";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = String(body?.text ?? "");

    const result = mockAnalyze(text);
    const parsed = analysisResultSchema.safeParse(result);

    if (!parsed.success) {
      return NextResponse.json(
        {
          records: [],
          totals: { revenue: 0, entries: 0 },
          topItems: [],
          insights: ["We could not validate the extracted result."],
          warnings: ["Schema validation failed on the server."],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(parsed.data);
  } catch {
    return NextResponse.json(
      {
        records: [],
        totals: { revenue: 0, entries: 0 },
        topItems: [],
        insights: ["We could not analyze the sales notes."],
        warnings: ["Request parsing failed."],
      },
      { status: 200 }
    );
  }
}
