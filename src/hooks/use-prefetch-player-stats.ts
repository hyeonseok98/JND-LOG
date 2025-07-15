"use client";

import { fetchPlayerStats } from "@/apis/players";
import { QUERY_KEYS } from "@/constants/query-key";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function usePrefetchPlayerStats(matchId: string) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!inView) return;
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.GOOGLE_SHEET.PLAYERS_STATS(matchId),
      queryFn: () => fetchPlayerStats(matchId),
      staleTime: 10 * 60000,
    });
  }, [inView, matchId]);

  return ref;
}
