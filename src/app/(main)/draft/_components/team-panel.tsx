"use client";

import { useDraft } from "@/store/draft";
import { LolLine } from "@/types/draft";
import { useState } from "react";

function CostRow({ teamId, line, name, cost }: { teamId: string; line: LolLine; name: string; cost: number }) {
  const [value, setValue] = useState(cost);
  const updateCost = useDraft((s) => s.updatePlayerCost);

  // 정글(팀장)은 포인트 수정 불가
  if (line === "JG") {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="w-14 shrink-0 text-center">{line}</span>
        <span className="flex-1 truncate text-center">{name}</span>
        <span className="w-20 text-center text-amber-400">팀장</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-14 shrink-0 text-center">{line}</span>
      <span className="flex-1 truncate text-center">{name}</span>
      <input
        type="number"
        value={value}
        min={0}
        max={1000}
        className="w-20 bg-zinc-800 rounded px-1"
        onChange={(e) => {
          const v = Number(e.target.value);
          setValue(Math.min(Math.max(v, 0), 1000));
        }}
        onBlur={() => updateCost(teamId, line, value)}
      />
    </div>
  );
}

/* ───────────────────────── 팀 패널 ───────────────────────── */
export default function TeamPanel() {
  const selectedTeamId = useDraft((s) => s.selectedTeamId);
  const selectedLine = useDraft((s) => s.selectedLine);
  const team = useDraft((s) => s.teams.find((t) => t.id === selectedTeamId));

  if (!team || selectedLine) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6 text-center text-gray-400 text-sm">
        <p>
          1. 라인 슬롯을 선택한 뒤 <br />
          오른쪽에서 선수를 고르세요.
        </p>
        <p>
          2. 페이지를 새로고침 하면 <br /> 팀이 초기화됩니다.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4 p-4 overflow-y-auto scrollbar-hidden">
      <h3 className="pb-4 text-lg font-semibold text-center">포인트 분배</h3>

      <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-3">
        <span className="w-14 shrink-0 text-center">라인</span>
        <span className="flex-1 text-center">선수</span>
        <span className="w-20 text-center">포인트</span>
      </div>

      {/* 정글 제외 라인별 포인트 수정 */}
      {Object.entries(team.slots)
        .filter(([l]) => l !== "JG")
        .map(([lineKey, slot]) =>
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
