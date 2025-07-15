// src/app/api/matches/route.ts
export const runtime = "nodejs";

import { sheetsClient, SPREADSHEET_ID } from "@/lib/sheets";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  /* 1) date 파라미터 추출 */
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date"); // YYYY-MM-DD

  /* 2) 시트 읽기 */
  const { data } = await sheetsClient.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "matches!A1:R",
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  /* 3) 헤더 & rows → 객체 배열 */
  const [header, ...rows] = data.values ?? [];
  let json = rows.map((r) =>
    header.reduce<Record<string, unknown>>((o, key, i) => {
      o[key as string] = r[i] ?? null;
      return o;
    }, {}),
  );

  /* 4) 날짜 필터(선택) */
  if (date) json = json.filter((m) => m.date === date);

  /* 5) 응답 */
  return NextResponse.json(json, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=600" },
  });
}
