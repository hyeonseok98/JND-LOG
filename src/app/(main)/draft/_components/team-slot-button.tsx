"use client";

import cn from "@/lib";
import { useDraft } from "@/store/draft";
import { LolLine, Slot } from "@/types/draft";
import Image from "next/image";

interface TeamSlotButtonProps {
  teamId: string;
  line: LolLine;
  slot: Slot;
}

export default function TeamSlotButton({ teamId, line, slot }: TeamSlotButtonProps) {
  const selectedTeamId = useDraft((s) => s.selectedTeamId);
  const selectedLine = useDraft((s) => s.selectedLine);
  const selectSlot = useDraft((s) => s.selectSlot);
  const removePlayer = useDraft((s) => s.removePlayerFromTeam);

  const isSelected = selectedTeamId === teamId && selectedLine === line;

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();
    slot.player ? removePlayer(teamId, line) : selectSlot(teamId, line);
  };

  return (
    <button
      type="button"
      onClick={handle}
      className={cn(
        "relative w-16 h-16 flex items-center justify-center rounded-md border transition-colors overflow-hidden",
        slot.player ? "border-emerald-400" : "border-gray-600 hover:border-gray-400",
        isSelected && "ring-2 ring-sky-500",
      )}
    >
      {slot.player ? (
        <>
          <Image src={slot.player.avatar} alt={slot.player.name} sizes="64px" className="w-16 h-16 object-cover" />
          <span className="absolute bottom-0 w-full text-[9px] text-center bg-black/60">
            {slot.player.name} · {slot.player.cost}
          </span>
        </>
      ) : (
        <span className="text-[10px] text-gray-400">{line}</span>
      )}
    </button>
  );
}
