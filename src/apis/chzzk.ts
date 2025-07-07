import resizeThumbnail from "@/app/util/resize-thumbnail";
import axios from "axios";
import { CHZZK_ENDPOINTS } from "./end-points";
import apiClient from "./index";

export interface ChzzkLiveDetail {
  isLive: boolean;
  title: string;
  thumbnailUrl: string | null;
  viewers: number;
  channelName: string;
}

export const localClient = axios.create({ baseURL: "" });

export async function getChzzkLiveDetail(channelId: string) {
  const { data } = await apiClient.get(`/api/chzzk/live-detail?channelId=${channelId}`);
  const live = data.content;
  return {
    isLive: live.status === "OPEN",
    title: live.liveTitle,
    thumbnailUrl: resizeThumbnail(live.liveImageUrl ?? live.defaultThumbnailImageUrl),
    viewers: live.concurrentUserCount,
    channelName: live.channel.channelName,
  };
}
/**
 *
 * @param channelIds 스트리머 채널 ID
 * @returns isLive: 라이브 상태인지 확인, thumbnail: 라이브 미리보기 이미지
 */
export async function getChzzkLiveDetails(channelIds: string[]) {
  const results = await Promise.all(
    channelIds.map(async (id) => {
      try {
        const { data } = await apiClient.get(CHZZK_ENDPOINTS.LIVE_DETAIL(id));
        const live = data.content;
        return [
          id,
          {
            isLive: live.status === "OPEN",
            thumbnail: resizeThumbnail(live.liveImageUrl ?? live.defaultThumbnailImageUrl),
          },
        ] as const;
      } catch {
        return [id, { isLive: false, thumbnail: null }] as const;
      }
    }),
  );

  return Object.fromEntries(results);
}
