"use client";
import { TEAM_COLORS } from "@/constants/palette";
import { LOL_LINES } from "@/constants/players";
import cn from "@/lib";
import { useMockDraft } from "@/store/mock-draft";
import { Team } from "@/types/draft";
import TeamSlotButton from "../../draft/_components/team-slot-button";

export default function TeamCardMock({ team }: { team: Team }) {
  const selected = useMockDraft((s) => s.selectedTeamId);
  const selectTeam = useMockDraft((s) => s.selectTeam);
  const color = TEAM_COLORS[useMockDraft.getState().teams.findIndex((t) => t.id === team.id) % TEAM_COLORS.length];

  return (
    <article
      onClick={(e) => e.target === e.currentTarget && selectTeam(team.id)}
      className={cn(
        "bg-zinc-900/80 p-[11px] rounded-lg space-y-2 cursor-pointer transition",
        selected === team.id && "ring-2 ring-sky-500",
      )}
    >
      <header className="flex justify-between pb-1 text-sm font-semibold" style={{ color }}>
        <span>
          {team.name} <span className="text-amber-400">({team.budget}pt)</span>
        </span>
        <span className="text-white">
          잔여{" "}
          <span className={team.points > team.budget ? "text-red-400" : "text-amber-400"}>
            {team.budget - team.points}
          </span>
          pt
        </span>
      </header>

      <div className="grid grid-cols-5 gap-2">
        {LOL_LINES.map((ln) => (
          <TeamSlotButton key={ln} teamId={team.id} line={ln as any} slot={team.slots[ln]} />
        ))}
      </div>
    </article>
  );
}
