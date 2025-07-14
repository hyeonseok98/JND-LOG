"use client";

import { getMatches, getMatchesByDate } from "@/apis/matches";
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
    staleTime: 5 * 60_000,
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
    staleTime: 5 * 60_000,
  });
}
