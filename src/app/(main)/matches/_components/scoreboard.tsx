"use client";

import { usePlayersByMatch } from "@/hooks/use-matches";
import cn from "@/lib";
import type { PlayerRow } from "@/types/lol/players";
import ScoreRow from "./scoreboard-row";

interface Props {
  matchId: string;
  winner: string;
}

export default function Scoreboard({ matchId, winner }: Props) {
  const { data = [] } = usePlayersByMatch(matchId);

  const blue = data.filter((p) => p.side === "BLUE");
  const red = data.filter((p) => p.side === "RED");

  /* 2) 팀 블록(제목 + 5줄) */
  const renderSide = (team: PlayerRow[], side: "BLUE" | "RED") => (
    <div className="space-y-1">
      {/* ─ 팀 줄 ─ */}
      <div
        className={cn(
          "px-2 py-1 rounded-t-md text-sm font-semibold",
          side === "BLUE" ? "bg-blue-900/60 text-blue-100" : "bg-red-900/60  text-red-100",
          side === winner ? "bg-primary/20" : "bg-muted/40",
        )}
      >
        {side}
      </div>

      {/* ─ 플레이어 5줄 ─ */}
      <div className="border-l border-r border-b rounded-b-md">
        {team.map((p, idx) => (
          <ScoreRow key={`${matchId}-${p.side}-${p.playerId}-${idx}`} player={p} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      {renderSide(blue, "BLUE")}
      {renderSide(red, "RED")}
    </div>
  );
}
