"use client";

import Avatar from "@/components/ui/avatar";
import { LINE_ICONS } from "@/constants/streamers";
import cn from "@/lib";
import { useAuction } from "@/store/auction";
import Image from "next/image";

export default function AuctionOrder({ className = "" }: { className?: string }) {
  const { current, order } = useAuction();
  const items = current ? [current, ...order] : order;

  return (
    <section className={cn("p-3 space-y-1 text-xs", className)}>
      <h3 className="text-sm font-semibold pb-2 border-b border-gray-500">경매순서</h3>

      {items.map((p, idx) => (
        <div key={p.id} className={cn("flex items-center gap-2", idx === 0 && "text-amber-400")}>
          <span className="w-5 text-right mr-1">{idx + 1}</span>
          <Avatar src={p.avatar} size={28} />
          <span className="truncate text-[13px]">{p.name}</span>
          <Image src={LINE_ICONS[p.line]} alt={p.line} width={16} height={16} />
        </div>
      ))}
    </section>
  );
}
