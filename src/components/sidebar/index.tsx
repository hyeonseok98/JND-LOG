"use client";

import { useSidebar } from "@/contexts";
import clsx from "clsx";

const menu = [
  { label: "전체 방송", icon: "📺" },
  { label: "인기 클립", icon: "✂️" },
  { label: "카테고리", icon: "📂" },
  { label: "팔로잉", icon: "❤️" },
];

export default function Sidebar() {
  const { opened } = useSidebar();

  return (
    <aside
      className={clsx(
        "fixed top-[50px] left-0 h-[calc(100vh-50px)] bg-[#111] text-white transition-all duration-300 overflow-hidden",
        opened ? "w-[220px]" : "w-[60px]",
      )}
    >
      <ul className="mt-4 flex flex-col">
        {menu.map((m) => (
          <li
            key={m.label}
            className={clsx(
              "flex items-center hover:bg-[#222] cursor-pointer",
              opened ? "px-3 py-[10px]" : "justify-center h-[40px]",
            )}
          >
            <span className="text-[15px]">{m.icon}</span>
            {opened && <span className="ml-[12px] text-[14px] whitespace-nowrap">{m.label}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
}
