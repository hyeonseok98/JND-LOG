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
  const removePlayerFromTeam = useDraft((s) => s.removePlayerFromTeam);

  const isSelected = selectedTeamId === teamId && selectedLine === line;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    slot.player ? removePlayerFromTeam(teamId, line) : selectSlot(teamId, line);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "w-14 h-14 flex items-center justify-center rounded-md border transition-colors cursor-pointer",
        slot.player ? "border-emerald-400" : "border-gray-600 hover:border-gray-400",
        isSelected && "ring-2 ring-sky-500",
      )}
    >
      {slot.player ? (
        <Image src={slot.player.avatar} alt={slot.player.name} width={48} height={48} className="rounded-md" />
      ) : (
        <span className="text-[10px] text-gray-400">{line}</span>
      )}
    </button>
  );
}
