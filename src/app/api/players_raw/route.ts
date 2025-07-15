export const runtime = "nodejs";

import { sheetsClient, SPREADSHEET_ID } from "@/lib/sheets";
import { NextResponse } from "next/server";

/**
 * matchId별로 파싱해서 players_raw 값을 가져옴
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");

  const { data } = await sheetsClient.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "players_raw!A1:L",
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  const [header, ...rows] = data.values ?? [];
  let json = rows.map((r) =>
    header.reduce<Record<string, unknown>>((o, key, idx) => {
      o[key as string] = r[idx] ?? null;
      return o;
    }, {}),
  );

  if (matchId) json = json.filter((p) => p.matchId === matchId);

  return NextResponse.json(json, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=600" },
  });
}
