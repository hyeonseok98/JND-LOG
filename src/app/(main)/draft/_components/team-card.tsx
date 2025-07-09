"use client";

import cn from "@/lib";
import { useDraft } from "@/store/draft";
import { LolLine, Team } from "@/types/draft";
import TeamSlotButton from "./team-slot-button";

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const selectedTeamId = useDraft((s) => s.selectedTeamId);
  const selectTeam = useDraft((s) => s.selectTeam);

  const active = selectedTeamId === team.id;

  // 팀 카드 선택시에만 활성화
  const handleSelectTeam = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      selectTeam(team.id);
    }
  };

  return (
    <article
      onClick={handleSelectTeam}
      className={cn(
        "bg-zinc-900/80 p-3 rounded-lg space-y-2 cursor-pointer transition",
        active && "ring-2 ring-sky-500",
      )}
    >
      {/* 헤더 */}
      <header className="flex justify-between text-sm font-semibold">
        <span>{team.name}</span>
        <span className="text-amber-400">
          {team.points} / {team.budget}
        </span>
      </header>

      {/* 슬롯 */}
      <div className="grid grid-cols-5 gap-2">
        {(Object.keys(team.slots) as LolLine[]).map((line) => (
          <TeamSlotButton key={line} teamId={team.id} line={line} slot={team.slots[line]} />
        ))}
      </div>
    </article>
  );
}
