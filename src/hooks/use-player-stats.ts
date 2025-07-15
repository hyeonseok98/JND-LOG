import apiClient from "@/apis"; // axios instance
import { GOOGLE_ENDPOINTS } from "@/apis/end-points";
import { QUERY_KEYS } from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";

export interface PlayerStatRow {
  matchId: string;
  playerId: string;
  playerName: string;
  side: "BLUE" | "RED";
  role: "TOP" | "JG" | "MID" | "AD" | "SUP";
  champion: string;
  kill: number;
  death: number;
  assist: number;
  KDA: number;
  KP: number;
}

async function fetchPlayerStats(matchId: string) {
  const { data } = await apiClient.get<PlayerStatRow[]>(GOOGLE_ENDPOINTS.PLAYERS_STATS, { params: { matchId } });
  return data;
}

export function usePlayerStats(matchId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.PLAYERS_STATS(matchId),
    queryFn: () => fetchPlayerStats(matchId),
    enabled: !!matchId,
    staleTime: 5 * 60000,
  });
}
