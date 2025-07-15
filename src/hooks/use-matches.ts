"use client";

import { getChampSummary, getMatches, getMatchesByDate, getSideSummary, getTeamSummary } from "@/apis/matches";
import { QUERY_KEYS } from "@/constants/query-key";
import { useMatchStore } from "@/store/match";
import type { MatchRow } from "@/types/lol/matches";
import { useQuery } from "@tanstack/react-query";

/**
 * 전체 경기 with 타입 필터(내전·스크림)
 */
export function useMatches(initialData?: MatchRow[]) {
  const { type } = useMatchStore(); // 필터 용도로 사용: "전체" | "공식스크림" | "비공식스크림" | "내전"

  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.MATCHES(type),
    queryFn: () => getMatches(type === "전체" ? undefined : { type }),
    initialData,
    staleTime: 5 * 60000,
  });
}

/**
 * 날짜별 경기 목록(YYYY-MM-DD)
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

export function useTeamSummary(type: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.TEAM_SUMMARY(type),
    queryFn: () => getTeamSummary(type),
    staleTime: 10 * 60000,
  });
}

export function useChampSummary(type: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.CHAMP_SUMMARY(type),
    queryFn: () => getChampSummary(type),
    staleTime: 10 * 60000,
  });
}

export function useSideSummary(type: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.SIDE_SUMMARY(type),
    queryFn: () => getSideSummary(type),
    staleTime: 10 * 60000,
  });
}
