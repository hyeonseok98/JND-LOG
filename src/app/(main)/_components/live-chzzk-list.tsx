"use client";

import Avatar from "@/components/ui/avatar";
import { useChzzkLiveDetails } from "@/hooks/use-chzzk-live-detail";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

const MAIN_STREAME: { id: string; name: string; avatar: StaticImageData }[] = [
  { id: "22bd842599735ae19e454983280f611e", name: "인첸트A", avatar: "/logo/pig.png" as unknown as StaticImageData },
  { id: "a53ae259f77b730616f8b533aeac8bee", name: "인첸트B", avatar: "/logo/pig.png" as unknown as StaticImageData },
  { id: "560651bcf90a9399dbe79c6bd2ebbf0e", name: "포니", avatar: "/logo/pig.png" as unknown as StaticImageData },
  { id: "368ca51e82c85583e059fe669ef0f028", name: "김정민", avatar: "/logo/pig.png" as unknown as StaticImageData },
];

export default function LiveChzzkList() {
  const ids = MAIN_STREAME.map((s) => s.id);
  const { data } = useChzzkLiveDetails(ids);
  if (!data) return null;

  return (
    <div className="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
      {MAIN_STREAME.map(({ id, name, avatar }) => {
        const { thumbnail, isLive, title } = data[id] ?? {};

        return (
          <Link
            key={id}
            href={`https://chzzk.naver.com/live/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
              {thumbnail ? (
                <Image src={thumbnail} alt={title ?? ""} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">OFF</div>
              )}
              {isLive && (
                <span className="absolute top-1 left-1 px-2 py-0.5 bg-green-600 text-xs text-white font-semibold rounded">
                  LIVE
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Avatar src={avatar} isLive={isLive} size={30} />
              <div className="flex-1">
                {title && <p className="text-sm font-medium text-gray-200 line-clamp-2">{title}</p>}
                <span className="text-xs font-semibold text-gray-400">{name}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
