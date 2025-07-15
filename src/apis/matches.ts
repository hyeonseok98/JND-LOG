import { GOOGLE_ENDPOINTS } from "@/apis/end-points";
import apiClient from "@/apis/index";
import { ChampSummaryRow, MatchRow, SideSummaryRow, TeamSummaryRow } from "@/types/lol/matches";

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
 * @param date 경기 날짜
 * @returns 지정 날짜의 matches
 */
export async function getMatchesByDate(date: string) {
  const { data } = await apiClient.get<MatchRow[]>(GOOGLE_ENDPOINTS.MATCHES, { params: { date } });
  return data;
}

/**
 * @param type 내전/공식스크림/비공식스크림
 * @returns type에 맞는 team_summary
 */
export async function getTeamSummary(type: string) {
  const { data } = await apiClient.get<TeamSummaryRow[]>(GOOGLE_ENDPOINTS.TEAM_SUMMARY, { params: { type } });
  return data;
}

/**
 * @param type 내전/공식스크림/비공식스크림
 * @returns type에 맞는 champ_summary
 */
export async function getChampSummary(type: string) {
  const { data } = await apiClient.get<ChampSummaryRow[]>(GOOGLE_ENDPOINTS.CHAMP_SUMMARY, { params: { type } });
  return data;
}

/**
 * @param type 내전/공식스크림/비공식스크림
 * @returns type에 맞는 side_summary
 */
export async function getSideSummary(type: string) {
  const { data } = await apiClient.get<SideSummaryRow[]>(GOOGLE_ENDPOINTS.SIDE_SUMMARY, { params: { type } });
  return data;
}
