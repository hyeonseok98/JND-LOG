"use client";

import ProfileCard from "@/components/profile-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Avatar from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StreamerInfos } from "@/constants/streamers";
import { useSidebar } from "@/contexts";
import { useChzzkLiveDetails } from "@/hooks/use-chzzk-live-detail";
import cn from "@/lib";
import Image from "next/image";

const ALL_CHANNEL_IDS = StreamerInfos.flatMap((l) => l.members.map((m) => m.channelId));

export default function Sidebar() {
  const { isOpened } = useSidebar();

  const { data: liveMap = {}, isLoading } = useChzzkLiveDetails(ALL_CHANNEL_IDS);

  return (
    <aside
      className={cn(
        "bg-dark text-white overflow-y-auto scrollbar-hide transition-all duration-300",
        isOpened ? "w-[198px] px-3" : "w-[60px]",
      )}
    >
      <TooltipProvider delayDuration={150}>
        <Accordion type="multiple" defaultValue={StreamerInfos.map(({ line }) => line)} className="mt-4 space-y-1">
          {StreamerInfos.map(({ line, icon, members }) => (
            <AccordionItem key={line} value={line} className="border-b border-white/10">
              <AccordionTrigger
                className={cn(
                  "flex items-center w-full py-2 hover:bg-white/5",
                  isOpened ? "gap-3 px-2 hover:no-underline" : "justify-center px-2 gap-1",
                )}
              >
                <Image src={icon} alt={line} width={20} height={20} />
                {isOpened && <span className="text-sm font-medium">{line}</span>}
              </AccordionTrigger>

              <AccordionContent>
                <ul className={cn(isOpened ? "px-4 py-1" : "flex flex-col items-center gap-[10px] py-2")}>
                  {members.map(({ name, avatar, channelId }) => {
                    const live = liveMap[channelId];
                    const isLive = live?.isLive;
                    const thumb = live?.thumbnail;

                    return (
                      <li key={channelId} className="cursor-pointer">
                        <StreamerItem
                          name={name}
                          avatar={avatar}
                          opened={isOpened}
                          isLive={isLive}
                          thumbnailUrl={thumb}
                          loading={isLoading && !live}
                        />
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TooltipProvider>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────
   개별 스트리머 + 툴팁
   ─────────────────────────────────────────────────────────── */
function StreamerItem({
  name,
  avatar,
  opened,
  isLive,
  thumbnailUrl,
  loading,
}: {
  name: string;
  avatar: any;
  opened: boolean;
  isLive?: boolean;
  thumbnailUrl?: string | null;
  loading: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {opened ? (
          <div>
            <ProfileCard src={avatar} name={name} size="sm" isLive={isLive} />
          </div>
        ) : (
          <div>
            <Avatar src={avatar} alt={name} size={28} isLive={isLive} />
          </div>
        )}
      </TooltipTrigger>

      <TooltipContent side="right" sideOffset={12} className="p-0 border-none bg-transparent">
        <div className="w-48 rounded-md bg-black p-2 text-white">
          <p className="mb-1 text-center text-xs font-medium">{name}</p>

          {loading ? (
            <div className="h-[108px] flex items-center justify-center text-xs text-gray-400">로딩 중…</div>
          ) : isLive && thumbnailUrl ? (
            <Image
              src={thumbnailUrl.replace("{type}", "360")}
              alt={`${name} 라이브 썸네일`}
              width={192}
              height={108}
              className="rounded-md object-cover"
            />
          ) : (
            <div className="h-[108px] flex items-center justify-center rounded-md bg-zinc-700 text-xs">오프라인</div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
