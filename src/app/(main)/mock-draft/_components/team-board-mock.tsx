"use client";

import { useMockDraft } from "@/store/mock-draft";
import TeamCard from "./../../draft/_components/team-card";

export default function TeamsBoardMock() {
  const teams = useMockDraft((s) => s.teams);

  return (
    <aside className="w-[440px] p-4 space-y-4 overflow-y-auto">
      {teams.map((t) => (
        <TeamCard key={t.id} team={t} />
      ))}
    </aside>
  );
}
