"use client";

import { useDraft } from "@/store/draft";
import { LolLine } from "@/types/draft";
import { useState } from "react";

function CostRow({ teamId, line, name, cost }: { teamId: string; line: LolLine; name: string; cost: number }) {
  const [value, setValue] = useState(cost);
  const updateCost = useDraft((s) => s.updatePlayerCost);

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-14 shrink-0">{line}</span>
      <span className="flex-1 truncate">{name}</span>
      <input
        type="number"
        value={value}
        min={0}
        className="w-20 bg-zinc-800 rounded px-1"
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={() => updateCost(teamId, line, value)}
      />
    </div>
  );
}

export default function TeamPanel() {
  const selectedTeamId = useDraft((s) => s.selectedTeamId);
  const selectedLine = useDraft((s) => s.selectedLine);
  const team = useDraft((s) => s.teams.find((t) => t.id === selectedTeamId));

  if (!team || selectedLine) {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-full gap-4 text-center text-zinc-500 text-sm">
          <p>
            1. 포인트 차등제는 정글(팀장)의 <br /> 포인트를 조절해서 책정해 주세요.
          </p>
          2. 슬롯을 먼저 선택한 뒤<br />
          오른쪽에서 선수를 고르세요.
        </div>
      </>
    );
  }

  return (
    <section className="space-y-4 p-4 overflow-y-auto scrollbar-hidden">
      <h3 className="pb-4 text-lg font-semibold text-center">포인트 분배</h3>
      {Object.entries(team.slots).map(([lineKey, slot]) =>
        slot.player ? (
          <CostRow
            key={lineKey}
            teamId={team.id}
            line={lineKey as LolLine}
            name={slot.player.name}
            cost={slot.player.cost}
          />
        ) : null,
      )}
    </section>
  );
}
