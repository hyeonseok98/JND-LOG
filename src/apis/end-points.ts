import { MATCH_TYPE } from "@/types/lol/matches";

export const CHZZK_ENDPOINTS = {
  LIVE_DETAIL: (channelId: string) => `/api/chzzk/live-detail?channelId=${channelId}`,
} as const;

export const GOOGLE_ENDPOINTS = {
  PLAYERS: "/api/players",
  MATCHES: "/api/matches",
  TEAMS: "/api/teams",
  PLAYERS_ROW: "/api/players_raw",
  PLAYERS_STATS: "/api/players_stats",

  TEAM_TOTALS: "/api/team_totals",
  TEAM_SUMMARY: "/api/team_summary",
  CHAMP_SUMMARY: "/api/champ_summary",
  SIDE_SUMMARY: "/api/side_summary",
} as const;

export const GOOGLE_ENDPOINTS_MAP: Record<MATCH_TYPE, string> = {
  내전: "/api/players_summary_내전",
  공식스크림: "/api/players_summary_공식스크림",
  비공식스크림: "/api/players_summary_비공식스크림",
  조별리그A조: "/api/players_summary_조별리그A조",
  조별리그B조: "/api/players_summary_조별리그B조",
  시드결정전: "/api/players_summary_시드결정전",
  플레이오프: "/api/players_summary_플레이오프",
};
