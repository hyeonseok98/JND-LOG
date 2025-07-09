"use client";

import { PLAYERS } from "@/constants/players";
import { useDraft } from "@/store/draft";
import { useMemo } from "react";
import PlayerCard from "./player-card";

export default function PlayerPool() {
  const selectedTeamId = useDraft((s) => s.selectedTeamId);
  const selectedLine = useDraft((s) => s.selectedLine);
  const addPlayer = useDraft((s) => s.addPlayerToTeam);

  const teams = useDraft((s) => s.teams);
  const lockedPlayerIds = useMemo(() => {
    const ids: string[] = [];
    for (const team of teams) {
      for (const slot of Object.values(team.slots)) {
        if (slot.player) {
          ids.push(slot.player.id);
        }
      }
    }
    return new Set(ids);
  }, [teams]);

  const handlePick = (id: string) => {
    if (!selectedTeamId || !selectedLine) return;
    addPlayer(selectedTeamId, id);
  };

  return (
    <section className="grid grid-cols-6 gap-4 pb-10">
      {PLAYERS.map((pl) => {
        const isLocked = !selectedLine || pl.line !== selectedLine || lockedPlayerIds.has(pl.id);

        return <PlayerCard key={pl.id} player={pl} disabled={isLocked} onPick={() => handlePick(pl.id)} />;
      })}
    </section>
  );
}
