"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Avatar from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StreamerInfos } from "@/constants/streamers";
import { useSidebar } from "@/contexts";
import cn from "@/lib";
import Image from "next/image";

export default function Sidebar() {
  const { isOpened } = useSidebar();

  return (
    <aside
      className={cn(
        "bg-dark text-white transition-all duration-300 overflow-y-auto scrollbar-hide",
        isOpened ? "w-[218px] px-3" : "w-[60px]",
      )}
    >
      <Accordion type="multiple" defaultValue={StreamerInfos.map(({ line }) => line)} className="mt-4 space-y-1">
        {StreamerInfos.map(({ line, icon, members }) => (
          <AccordionItem key={line} value={line} className="border-b border-white/10">
            <AccordionTrigger
              className={cn(
                "flex items-center w-full py-2 hover:bg-white/5 cursor-pointer",
                isOpened ? "gap-3 px-2 hover:no-underline" : "justify-center px-2 gap-1",
              )}
            >
              <Image src={icon} alt={line} width={20} height={20} />
              {isOpened && <span className="text-sm font-medium">{line}</span>}
            </AccordionTrigger>

            <AccordionContent>
              {/* 사이드 바 펼쳤을 때 */}
              {isOpened ? (
                <ul className="pl-9 pb-1">
                  {members.map(({ name }) => (
                    <li key={name} className="py-[3px] text-xs cursor-pointer">
                      {name}
                    </li>
                  ))}
                </ul>
              ) : (
                /* 사이드 바 접었을  */
                <TooltipProvider delayDuration={150}>
                  <ul className="flex flex-col items-center gap-[10px] py-2">
                    {members.map(({ name, avatar, channelId }) => (
                      <li key={name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              {/* asChild 사용시 단일의 React Element를 넘겨야 함으로 div로 감쌈*/}
                              <Avatar src={avatar} alt={name} size={28} />
                            </div>
                          </TooltipTrigger>

                          <TooltipContent
                            side="right"
                            sideOffset={12}
                            className="flex justify-center items-center p-2 rounded-md bg-black text-white text-xs"
                          >
                            <div className="mb-1 text-xs font-medium text-white">{name}</div>

                            {/* 라이브 썸네일 (lazy fetch) */}
                            {/* <LiveThumbnail channelId={channelId} /> */}
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </TooltipProvider>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}
