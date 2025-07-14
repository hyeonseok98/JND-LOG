export const runtime = "nodejs";
import { SPREADSHEET_ID, sheetsClient } from "@/lib/sheets";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name"); // 필터 (갱맘, BLUE …)

  const { data } = await sheetsClient.spreadsheets.values.batchGet({
    spreadsheetId: SPREADSHEET_ID,
    ranges: ["team_totals!A1:H", "team_summary!A1:E"],
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  /** team_totals */
  const [tHead, ...tRows] = data.valueRanges![0].values ?? [];
  let totals = tRows.map((r) => tHead.reduce<Record<string, unknown>>((o, k, i) => ((o[k] = r[i] ?? null), o), {}));

  /** team_summary */
  const [sHead, ...sRows] = data.valueRanges![1].values ?? [];
  let summary = sRows.map((r) => sHead.reduce<Record<string, unknown>>((o, k, i) => ((o[k] = r[i] ?? null), o), {}));

  if (name) {
    totals = totals.filter((t) => t.team === name);
    summary = summary.filter((s) => s.team === name);
  }

  return NextResponse.json({ totals, summary });
}
