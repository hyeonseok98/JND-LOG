import { GOOGLE_ENDPOINTS } from "@/apis/end-points";
import apiClient from "@/apis/index";
import { MatchRow } from "@/types/lol/matches";
import { PlayerRow } from "@/types/lol/players";
import { sanitize } from "@/util/sanitize";

export interface GetMatchesProps {
  type?: "내전" | "공식스크림" | "비공식스크림";
}

/**
 * @returns 타입에 맞는 경기 리스트
 */
export async function getMatches(params?: GetMatchesProps) {
  const { data } = await apiClient.get<MatchRow[]>(GOOGLE_ENDPOINTS.MATCHES, { params });
  return data;
}

/**
 *
 * @param date 경기 날짜
 * @returns 지정 날짜의 matches
 */
export async function getMatchesByDate(date: string) {
  const { data } = await apiClient.get<MatchRow[]>(GOOGLE_ENDPOINTS.MATCHES, { params: { date } });
  return data;
}

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
