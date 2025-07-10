"use client";

import Avatar from "@/components/ui/avatar";
import { LINE_ICONS } from "@/constants/streamers";
import cn from "@/lib";
import { useAuction } from "@/store/auction";
import Image from "next/image";

export default function CurrentAuction({ className = "" }: { className?: string }) {
  const { current, warn, bids, fromUnsold } = useAuction();
  const highest = Math.max(0, ...Object.values(bids).map((b) => b.amount));

  if (!current) {
    return <div className={cn("flex items-center justify-center flex-1", className)}>경매가 완료되었습니다.</div>;
  }

  return (
    <div className={cn("flex flex-col items-center gap-3 py-6", className)}>
      {fromUnsold && <span className="px-2 py-0.5 text-xs rounded bg-amber-500/20 text-amber-300">유찰 경매</span>}

      <Avatar src={current.avatar} size={90} />
      <div className="flex items-center gap-2 mt-1">
        <Image src={LINE_ICONS[current.line]} alt={current.line} width={18} height={18} />
        <span className="text-lg font-semibold">{current.name}</span>
      </div>

      <p className={cn("text-xs h-4", warn ? "text-red-400" : "text-emerald-400")}>
        {warn ?? (highest ? `현재 최고가 ${highest}pt` : "")}
      </p>
    </div>
  );
}
