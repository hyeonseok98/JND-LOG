import { LOL_LINES } from "@/constants/players";
import cn from "@/lib";
import { useDraft } from "@/store/draft";
import { LolLine, Team } from "@/types/draft";
import TeamSlotButton from "./team-slot-button";

export default function TeamCard({ team }: { team: Team }) {
  const selectedTeamId = useDraft((s) => s.selectedTeamId);
  const selectTeam = useDraft((s) => s.selectTeam);

  const overBudget = team.points > team.budget;
  const remainingPoints = team.budget - team.points;

  return (
    <article
      onClick={(e) => e.target === e.currentTarget && selectTeam(team.id)}
      className={cn(
        "bg-zinc-900/80 p-[11px] rounded-lg space-y-2 cursor-pointer transition",
        selectedTeamId === team.id && "ring-2 ring-sky-500",
      )}
    >
      <header className="flex justify-between pb-2 border-b border-b-gray-500 text-sm font-semibold">
        <span>
          {team.name} <span className="text-amber-400"> ({team.budget}pt)</span>
        </span>
        <span>
          잔여 포인트:
          <span className={cn(overBudget ? "text-red-400" : "text-amber-400", "pl-1")}> {remainingPoints} pt</span>
        </span>
      </header>

      <div className="grid grid-cols-5 gap-2">
        {LOL_LINES.map((line) => (
          <TeamSlotButton key={line} teamId={team.id} line={line as LolLine} slot={team.slots[line]} />
        ))}
      </div>
    </article>
  );
}
