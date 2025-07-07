import { getChzzkLiveDetail, getChzzkLiveDetails } from "@/apis/chzzk";
import { QUERY_KEYS } from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";

export const useChzzkLiveDetail = (channelId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHZZK.LIVE_DETAIL(channelId),
    queryFn: () => getChzzkLiveDetail(channelId),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    enabled: !!channelId,
  });
};

export const useChzzkLiveDetails = (channelIds: string[]) =>
  useQuery({
    queryKey: QUERY_KEYS.CHZZK.LIVE_DETAILS(channelIds),
    queryFn: () => getChzzkLiveDetails(channelIds),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 5,
    enabled: channelIds.length > 0,
  });
