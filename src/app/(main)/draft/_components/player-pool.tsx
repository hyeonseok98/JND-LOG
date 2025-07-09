"use client";

import { PLAYERS } from "@/constants/players";
import { useDraft } from "@/store/draft";
import PlayerCard from "./player-card";

export default function PlayerPool() {
  const selectedTeamId = useDraft((s) => s.selectedTeamId);
  const selectedLine = useDraft((s) => s.selectedLine);
  const addPlayerToTeam = useDraft((s) => s.addPlayerToTeam);

  const handlePick = (playerId: string) => {
    if (!selectedTeamId || !selectedLine) return;
    addPlayerToTeam(selectedTeamId, playerId);
  };

  return (
    <section className="grid grid-cols-6 gap-4 pb-10">
      {PLAYERS.map((p) => (
        <PlayerCard
          key={p.id}
          player={p}
          disabled={!selectedLine || p.line !== selectedLine}
          onPick={() => handlePick(p.id)}
        />
      ))}
    </section>
  );
}
