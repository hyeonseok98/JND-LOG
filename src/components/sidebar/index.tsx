"use client";

import ad from "@/assets/icons/lol-line-icon/ad-line-gold.svg";
import jungle from "@/assets/icons/lol-line-icon/jg-line-gold.svg";
import mid from "@/assets/icons/lol-line-icon/mid-line-gold.svg";
import support from "@/assets/icons/lol-line-icon/sup-line-gold.svg";
import top from "@/assets/icons/lol-line-icon/top-line-gold.svg";

import { useSidebar } from "@/contexts";
import cn from "@/lib/tailwind-cn";
import Image from "next/image";
import { useState } from "react";

const MENU = [
  { label: "TOP", icon: top },
  { label: "JUNGLE", icon: jungle },
  { label: "MID", icon: mid },
  { label: "AD", icon: ad },
  { label: "SUPPORT", icon: support },
];

const STREAMER_LIST = {
  TOP: ["푸린", "승우아빠", "치킨쿤", "맛수령", "룩삼", "던"],
  JUNGLE: ["소우릎", "플레임", "인섹", "엠비션", "갱맘", "큐베"],
  MID: ["인간젤리", "헤징", "트롤야", "피닉스박", "노페", "네클릿"],
  AD: ["러너", "따효니", "플러리", "눈꽃", "마소킴", "강퀴"],
  SUPPORT: ["크캣", "라콩", "고수달", "캡틴잭", "이희태", "매드라이프"],
};

export default function Sidebar() {
  const { isOpened } = useSidebar();
  const [showStreamer, setShowStreamer] = useState(true);

  return (
    <aside
      className={cn(
        "h-screen-header bg-dark text-white transition-all duration-300 overflow-hidden",
        isOpened ? "w-[220px]" : "w-[60px]",
      )}
    >
      <div className="bg-blue-500 w-4 h-4">ㅎㅇ</div>
      <ul className="mt-4 flex flex-col">
        {MENU.map((m) => (
          <li
            key={m.label}
            className={cn(
              "flex items-center hover:bg-[#222] cursor-pointer",
              isOpened ? "px-3 py-[10px]" : "justify-center h-10",
            )}
          >
            <Image src={m.icon} alt={`${m.label} icon`} width={20} height={20} />

            {isOpened && <span className="ml-3 text-[14px] whitespace-nowrap">{m.label}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
}
