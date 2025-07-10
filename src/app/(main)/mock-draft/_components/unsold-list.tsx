"use client";

import ProfileCard from "@/components/profile-card";
import { LINE_ICONS } from "@/constants/streamers";
import cn from "@/lib";
import { useAuction } from "@/store/auction";
import { Player } from "@/types/draft";
import Image from "next/image";

export default function UnsoldList({ className = "" }: { className?: string }) {
  const unsold = useAuction((s) => s.unsoldQueue);

  return (
    <section className={cn("p-3 space-y-1 text-xs", className)}>
      <h3 className="text-[13px] font-semibold pb-2 border-b border-gray-500">유찰순서</h3>

      {unsold.length === 0 ? (
        <p className="text-xs text-zinc-400 pt-2">없음</p>
      ) : (
        <div className="space-y-2 pt-2">
          {unsold.map((p: Player) => (
            <div key={p.id} className="flex items-center gap-1">
              <ProfileCard src={p.avatar} name={p.name} size="sm" />
              <Image src={LINE_ICONS[p.line]} alt={p.line} width={14} height={14} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
