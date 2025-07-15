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
  PLAYER_SUMMARY_INHOUSE: "/api/players_summary_내전",
  PLAYER_SUMMARY_OFFICIAL: "/api/players_summary_공식스크림",
  PLAYER_SUMMARY_UNOFFICIAL: "/api/players_summary_비공식스크림",
  CHAMP_SUMMARY: "/api/champ_summary",
  SIDE_SUMMARY: "/api/side_summary",
} as const;
