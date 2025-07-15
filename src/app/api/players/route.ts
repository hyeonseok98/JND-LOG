export const runtime = "nodejs";

import { sheetsClient, SPREADSHEET_ID } from "@/lib/sheets";
import { NextResponse } from "next/server";

export async function GET() {
  const range = "players_stats!A1:U";

  const { data } = await sheetsClient.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  const [header, ...rows] = data.values ?? [];

  const json = rows.map((r) =>
    header.reduce<Record<string, unknown>>((o, key, i) => {
      o[key as string] = r[i] ?? null;
      return o;
    }, {}),
  );

  return NextResponse.json(json, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=600" },
  });
}
