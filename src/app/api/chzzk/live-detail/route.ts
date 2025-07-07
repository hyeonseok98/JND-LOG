import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const channelId = req.nextUrl.searchParams.get("channelId");
  if (!channelId) {
    return NextResponse.json({ error: "Missing channelId" }, { status: 400 });
  }

  try {
    const { data } = await axios.get(`https://api.chzzk.naver.com/service/v2/channels/${channelId}/live-detail`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) " +
          "Chrome/125.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      timeout: 5000,
    });

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("live-detail route error:", e.response?.data || e.message);
    return NextResponse.json({ error: e.response?.data || e.message }, { status: 500 });
  }
}
