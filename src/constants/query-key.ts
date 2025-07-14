export const QUERY_KEYS = {
  CHZZK: {
    LIVE_DETAIL: (channelId: string) => ["chzzk", "liveDetail", channelId] as const,
    LIVE_DETAILS: (channelIds: string[]) => ["chzzk", "LiveDetails", ...channelIds] as const,
  },
  GOOGLE_SHEET: {
    PLAYERS: ["players"] as const,
    MATCHES: ["matches"] as const,
    TEAMS: ["teams"] as const,
  },
};
