import { fetchPlayerStats, fetchPlayerSummary } from "@/apis/players";
import { QUERY_KEYS } from "@/constants/query-key";
import { MATCH_TYPE } from "@/types/lol/players";
import { useQuery } from "@tanstack/react-query";

export interface PlayerStatRow {
  matchId: string;
  playerId: string;
  playerName: string;
  side: "BLUE" | "RED";
  role: "TOP" | "JG" | "MID" | "AD" | "SUP";
  champion: string;
  type: string;
  kill: number;
  death: number;
  assist: number;
  gold: number;
  dmg: number;
  KDA: number;
  KP: number;
  DPM: number;
  DPG: number;
  "DMG%": number;
  GPM: number;
  "GOLD%": number;
}

export function usePlayerStats(matchId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.PLAYERS_STATS(matchId),
    queryFn: () => fetchPlayerStats(matchId),
    enabled: !!matchId,
    staleTime: 5 * 60000,
  });
}

export function usePlayerSummary(mode: MATCH_TYPE, playerId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.PLAYERS_SUMMARY(mode, playerId),
    queryFn: () => fetchPlayerSummary(mode, playerId),
    enabled: !!mode,
    staleTime: 5 * 60_000,
  });
}
