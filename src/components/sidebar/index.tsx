"use client";

import ad from "@/assets/icons/lol-line-icon/ad-line-gold.svg";
import jungle from "@/assets/icons/lol-line-icon/jg-line-gold.svg";
import mid from "@/assets/icons/lol-line-icon/mid-line-gold.svg";
import support from "@/assets/icons/lol-line-icon/sup-line-gold.svg";
import top from "@/assets/icons/lol-line-icon/top-line-gold.svg";

import { useSidebar } from "@/contexts";
import clsx from "clsx";
import Image from "next/image";

const menu = [
  { label: "TOP", icon: top },
  { label: "JUNGLE", icon: jungle },
  { label: "MID", icon: mid },
  { label: "AD", icon: ad },
  { label: "SUPPORT", icon: support },
];

export default function Sidebar() {
  const { isOpened } = useSidebar();

  return (
    <aside
      className={clsx(
        "h-screen-header bg-[#121212] text-white transition-all duration-300 overflow-hidden",
        isOpened ? "w-[220px]" : "w-[60px]",
      )}
    >
      <ul className="mt-4 flex flex-col">
        {menu.map((m) => (
          <li
            key={m.label}
            className={clsx(
              "flex items-center hover:bg-[#222] cursor-pointer",
              isOpened ? "px-3 py-[10px]" : "justify-center h-[40px]",
            )}
          >
            <Image src={m.icon} alt={`${m.label} 아이콘`} width={20} height={20} />

            {isOpened && <span className="ml-[12px] text-[14px] whitespace-nowrap">{m.label}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
}
