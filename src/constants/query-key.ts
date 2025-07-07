export const QUERY_KEYS = {
  CHZZK: {
    LIVE_DETAIL: (channelId: string) => ["chzzk", "liveDetail", channelId] as const,
    LIVE_DETAILS: (channelIds: string[]) => ["chzzk", "LiveDetails", ...channelIds] as const,
  },
};
