export const QUERY_KEYS = {
  CHZZK: {
    LIVE_DETAIL: (channelId: string) => ["chzzk", "liveDetail", channelId] as const,
    LIVE_DETAILS: (channelIds: string[]) => ["chzzk", "LiveDetails", ...channelIds] as const,
  },
  GOOGLE_SHEET: {
    PLAYERS: (matchId?: string) => ["players", matchId] as const,
    MATCHES: (type?: string) => ["matches", type ?? "전체"] as const,
    MATCHES_BY_DATE: (date?: string) => ["matches", date] as const,
    TEAMS: (team: string) => ["teams", team] as const,
  },
};
