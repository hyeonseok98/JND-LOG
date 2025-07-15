import { Mode } from "@/types/lol/players";

export const QUERY_KEYS = {
  CHZZK: {
    LIVE_DETAIL: (channelId: string) => ["chzzk", "liveDetail", channelId] as const,
    LIVE_DETAILS: (channelIds: string[]) => ["chzzk", "LiveDetails", ...channelIds] as const,
  },
  GOOGLE_SHEET: {
    PLAYERS: (matchId?: string) => ["players", matchId] as const,
    PLAYERS_STATS: (matchId: string) => ["playerStats", matchId] as const,
    PLAYERS_SUMMARY: (mode: Mode, playerId?: string) => ["players_summary", mode, playerId] as const,
    MATCHES: (type?: string) => ["matches", type ?? "전체"] as const,
    MATCHES_BY_DATE: (date?: string) => ["matches", date] as const,
    TEAMS: (team: string) => ["teams", team] as const,
    TEAM_SUMMARY: (type?: string) => ["team_summary", type] as const,
    CHAMP_SUMMARY: (type?: string) => ["champ_summary", type] as const,
    SIDE_SUMMARY: (type?: string) => ["side_summary", type] as const,
    CHAMPIONS: () => ["champions"],
  },
};
