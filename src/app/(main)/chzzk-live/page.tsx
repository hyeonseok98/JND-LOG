// src/app/chzzk-live/page.tsx
"use client";

import { useChzzkLiveDetails } from "@/hooks/use-chzzk-live-detail";
import Image from "next/image";

// ➊ 테스트용 채널 ID 4개 (원하는 스트리머 36개 넣으면 됨)
const CHANNEL_IDS = [
  "21a0de8b586c517181d76f183272de57",
  "c100f81959d1c17044be0541eed56f5b",
  "826f57d3283418e1fa39dfb23dc1dea8",
  "dff5fc9706f8260682ce6eb93acaad64", // 없는 ID 예시
];

export default function ChzzkTestPage() {
  const { data, isLoading, error } = useChzzkLiveDetails(CHANNEL_IDS);

  if (isLoading) return <p className="p-6">로딩 중…</p>;
  if (error) return <p className="p-6 text-red-500">{`${error}`}</p>;
  if (!data) return null;

  return (
    <main className="p-6 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
      {CHANNEL_IDS.map((id) => {
        const info = data[id];
        return (
          <div key={id} className="rounded border border-white/20 bg-zinc-900 p-3 flex flex-col gap-2">
            {/* 썸네일 */}
            {info?.isLive && info.thumbnail ? (
              <Image src={info.thumbnail} alt="live thumb" width={192} height={108} className="rounded" priority />
            ) : (
              <div className="h-[108px] flex items-center justify-center rounded bg-zinc-700 text-sm text-zinc-300">
                OFF&nbsp;LINE
              </div>
            )}

            {/* 상태 라벨 */}
            <span className={info?.isLive ? "text-xs font-semibold text-red-500" : "text-xs text-zinc-400"}>
              {info?.isLive ? "LIVE 🔴" : "OFFLINE"}
            </span>

            {/* 채널 ID 표시(디자인용) */}
            <span className="break-all text-xs text-zinc-400">{id}</span>
          </div>
        );
      })}
    </main>
  );
}
