import apiClient from "@/apis";
import { GOOGLE_ENDPOINTS } from "@/apis/end-points";
import { getMatchesByDate } from "@/apis/matches";
import { QUERY_KEYS } from "@/constants/query-key";
import { MatchRow, TeamSummaryRow } from "@/types/lol/matches";
import { useQuery } from "@tanstack/react-query";

/**
 * 전체 경기 or 타입 필터(내전·스크림)
 */
export function useTeam(name: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.TEAMS(name),
    queryFn: async () => {
      const { data } = await apiClient.get(`${GOOGLE_ENDPOINTS.TEAMS}?name=${encodeURIComponent(name)}`);
      return data as { totals: unknown[]; summary: unknown[] };
    },
    enabled: !!name,
  });
}

/**
 * @param date 경기 날짜
 * @returns 날짜별 경기 목록 (YYYY-MM-DD)
 */
export function useMatchesByDate(date: string, initialData?: MatchRow[]) {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.MATCHES_BY_DATE(date),
    queryFn: () => getMatchesByDate(date),
    initialData,
    enabled: !!date, // date 가 주어졌을 때만 실행
    staleTime: 5 * 60000,
  });
}

/** 모든 타입을 한꺼번에 가져옴 */
async function getTeamSummaryAll() {
  const { data } = await apiClient.get<TeamSummaryRow[]>(GOOGLE_ENDPOINTS.TEAM_SUMMARY);
  return data;
}

/** 전체 fetch → UI 쪽에서 filter */
export function useTeamSummaryAll() {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.TEAM_SUMMARY("ALL"),
    queryFn: getTeamSummaryAll,
    staleTime: 10 * 60_000,
  });
}
