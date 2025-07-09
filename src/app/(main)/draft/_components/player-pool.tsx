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
    <section className="flex flex-col justify-center items-center space-y-8 pt-8">
      {groupByLine.map((group, idx) => (
        <div key={idx} className="w-full">
          <div className="flex items-center gap-2 mt-1 mb-4">
            <span className="text-sm font-semibold">{LOL_LINES[idx]}</span>
            <hr className="flex-1 border-t border-gray-500 ml-2" />
          </div>

          <div className="grid grid-cols-6 gap-4">
            {group.map((pl) => {
              // 팀 선택시 아직 고르지 않은 라인 표시
              const selectedTeam = selectedTeamId && teams.find((t) => t.id === selectedTeamId)!.slots[pl.line].player; // 이미 채워져 있으면 객체, 아니면 undefined

              const isLocked =
                lockedPlayerIds.has(pl.id) || // 다른 팀에 이미 있음
                (selectedLine // 라인을 골랐다면
                  ? pl.line !== selectedLine // 다른 라인은 잠금
                  : !!selectedTeam); // 라인을 안 골랐으면, 빈 슬롯만 열어 줌

              return <PlayerCard key={pl.id} player={pl} disabled={isLocked} onPick={() => handlePick(pl.id)} />;
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
