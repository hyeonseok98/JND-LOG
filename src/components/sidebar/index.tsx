"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StreamerInfos } from "@/constants/streamers";
import { useSidebar } from "@/contexts";
import { useChzzkLiveDetails } from "@/hooks/use-chzzk-live-detail";
import cn from "@/lib";
import Image from "next/image";
import { memo } from "react";
import StreamerList from "./streamer-list";

const ALL_CHANNEL_IDS = StreamerInfos.flatMap(({ members }) => members.map((m) => m.channelId));

function Sidebar() {
  const { isOpened } = useSidebar();
  const { data: liveMap = {}, isLoading } = useChzzkLiveDetails(ALL_CHANNEL_IDS);

  return (
    <aside
      className={cn(
        "bg-dark text-white overflow-y-auto scrollbar-hide transition-all border-r border-r-gray-500",
        "hidden md:block",
        isOpened ? "w-[218px] px-3" : "w-[60px]",
      )}
    >
      <TooltipProvider delayDuration={150}>
        <Accordion type="multiple" defaultValue={StreamerInfos.map(({ line }) => line)} className="mt-4 space-y-1">
          {StreamerInfos.map(({ line, icon, members }) => (
            <AccordionItem key={line} value={line} className="border-b border-white/10">
              {/* 라인(top/jg/mid/ad/sup) 헤더 */}
              <AccordionTrigger
                className={cn(
                  "flex items-center py-2 hover:bg-white/5 cursor-pointer",
                  isOpened ? "gap-3 px-2 hover:no-underline" : "justify-center gap-1! px-2",
                )}
              >
                <Image src={icon} alt={line} width={20} height={20} />
                {isOpened && <span className="text-sm font-semibold">{line}</span>}
              </AccordionTrigger>

              {/* 스트리머 리스트 */}
              <AccordionContent>
                <ul className={cn(isOpened ? "px-4 py-2 space-y-[6px]" : "flex flex-col items-center gap-[10px] py-2")}>
                  {members.map((m) => {
                    const live = liveMap[m.channelId];
                    return (
                      <li key={m.channelId}>
                        <StreamerList
                          opened={isOpened}
                          loading={isLoading && !live}
                          name={m.name}
                          avatar={m.avatar}
                          isLive={live?.isLive}
                          thumbnailUrl={live?.thumbnail}
                          channelId={m.channelId}
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

export default memo(Sidebar);
