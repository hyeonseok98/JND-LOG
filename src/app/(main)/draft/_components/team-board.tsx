"use client";

import { useDraft } from "@/store/draft";
import TeamCard from "./team-card";

export default function TeamsBoard() {
  const teams = useDraft((s) => s.teams);

  return (
    <aside className="w-[440px] overflow-y-auto px-6 py-4 space-y-4">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </aside>
  );
}
