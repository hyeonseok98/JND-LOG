import { fetchSheetAsJson } from "@/util/sheet-to-json";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const playerId = searchParams.get("playerId");

  let json = await fetchSheetAsJson("players_summary_내전!A1:Z");
  if (playerId) json = json.filter((r) => r.playerId === playerId);

  return NextResponse.json(json, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=600" },
  });
}
