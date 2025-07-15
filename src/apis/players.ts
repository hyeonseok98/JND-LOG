import { PlayerStatRow } from "@/hooks/use-player-stats";
import { Mode, PlayerRow, PlayerSummaryRow } from "@/types/lol/players";
import { sanitize } from "@/util/sanitize";
import apiClient from ".";
import { GOOGLE_ENDPOINTS, GOOGLE_ENDPOINTS_MAP } from "./end-points";

/**
 * @returns 전체 player 스탯
 */
export async function getPlayersRaw() {
  const { data } = await apiClient.get<PlayerRow[]>(GOOGLE_ENDPOINTS.PLAYERS_ROW);
  return sanitize(data);
}

/**
 * @param matchId
 * @returns matchId에 맞는 player stat
 */
export async function getPlayers(params?: { matchId?: string }) {
  const { data } = await apiClient.get<PlayerRow[]>(GOOGLE_ENDPOINTS.PLAYERS, params ? { params } : undefined);
  return sanitize(data);
}

export async function fetchPlayerStats(matchId: string) {
  const { data } = await apiClient.get<PlayerStatRow[]>(GOOGLE_ENDPOINTS.PLAYERS_STATS, { params: { matchId } });
  return data;
}

export async function fetchPlayerSummary(mode: Mode, playerId?: string) {
  const { data } = await apiClient.get<PlayerSummaryRow[]>(GOOGLE_ENDPOINTS_MAP[mode], {
    params: { playerId },
  });
  return data;
}
