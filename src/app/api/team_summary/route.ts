import { fetchSheetAsJson } from "@/util/sheet-to-json";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchType = searchParams.get("type");

  let json = await fetchSheetAsJson("team_summary!A1:Z");
  if (matchType) json = json.filter((r) => r.playerId === matchType);

  return NextResponse.json(json, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=600" },
  });
}
