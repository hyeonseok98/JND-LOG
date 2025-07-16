"use client";

import Avatar from "@/components/ui/avatar";
import { NAME_TO_AVATAR, NAME_TO_CHANNEL, TEAMLISTS } from "@/constants/streamers";
import { useChzzkLiveDetails } from "@/hooks/use-chzzk-live-detail";
import Image from "next/image";
import Link from "next/link";

export default function TeamLiveChzzkList() {
  const allIds = TEAMLISTS.flatMap((t) => t.members.map((m) => NAME_TO_CHANNEL[m]));
  const { data } = useChzzkLiveDetails(allIds);
  if (!data) return null;

  return (
    <div className="space-y-12 pt-4 w-full">
      {TEAMLISTS.map(({ name: teamName, members }) => (
        <section key={teamName} className="space-y-4">
          <h4 className="text-xl font-semibold text-white">{teamName}</h4>

          <div className="grid gap-x-6 gap-y-8 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {members.map((m) => {
              const chanId = NAME_TO_CHANNEL[m];
              const { thumbnail, isLive, title } = data[chanId] ?? {};
              const avatar = NAME_TO_AVATAR[m];

              return (
                <Link
                  key={chanId}
                  href={`https://chzzk.naver.com/live/${chanId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                    {thumbnail ? (
                      <Image src={thumbnail} alt={title ?? ""} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                        OFF
                      </div>
                    )}
                    {isLive && (
                      <span className="absolute top-1 left-1 px-2 py-0.5 bg-green-600 text-xs text-white font-semibold rounded">
                        LIVE
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Avatar src={avatar} isLive={isLive} size={30} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-200 line-clamp-2">{title}</p>
                      <span className="text-sm font-semibold text-gray-400">{m}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
