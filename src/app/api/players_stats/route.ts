import { fetchSheetAsJson } from "@/util/sheet-to-json";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");

  let json = await fetchSheetAsJson("players_stats!A1:Z");

  if (matchId) json = json.filter((r) => r.matchId === matchId);

  return NextResponse.json(json, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=600" },
  });
}
