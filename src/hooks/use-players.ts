"use client";

import { getPlayers, getPlayersRaw } from "@/apis/matches";
import { QUERY_KEYS } from "@/constants/query-key";
import type { PlayerRow } from "@/types/lol/players";
import { useQuery } from "@tanstack/react-query";

/**
 * matchId 로 players_raw 가져오기
 */
export function usePlayersByMatch(matchId: string) {
  return useQuery<PlayerRow[]>({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.PLAYERS(matchId),
    queryFn: () => getPlayers({ matchId }),
    enabled: !!matchId,
    staleTime: 5 * 60000,
  });
}

/**
 * 전체 players_raw (필터 없음)
 */
export function useAllPlayersRaw(initialData?: PlayerRow[]) {
  return useQuery<PlayerRow[]>({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.PLAYERS(), // ["players", undefined]
    queryFn: () => getPlayersRaw(),
    initialData,
    staleTime: 5 * 60000,
  });
}
