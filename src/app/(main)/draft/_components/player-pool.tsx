"use client";

import { LOL_LINES, PLAYERS } from "@/constants/players";
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

  const groupByLine = useMemo(() => {
    const result = [];
    for (let i = 0; i < PLAYERS.length; i += 6) {
      result.push(PLAYERS.slice(i, i + 6));
    }
    return result;
  }, []);

  return (
    <section className="flex flex-col justify-center items-center space-y-8 pb-10">
      {groupByLine.map((group, idx) => (
        <div key={idx} className="w-full">
          <div className="flex items-center gap-2 mt-1 mb-5">
            <span className="text-sm font-semibold">{LOL_LINES[idx]}</span>
            <hr className="flex-1 border-t border-gray-500 ml-2" />
          </div>

          <div className="grid grid-cols-6 gap-4">
            {group.map((pl) => {
              const isLocked = !selectedLine || pl.line !== selectedLine || lockedPlayerIds.has(pl.id);
              return <PlayerCard key={pl.id} player={pl} disabled={isLocked} onPick={() => handlePick(pl.id)} />;
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
