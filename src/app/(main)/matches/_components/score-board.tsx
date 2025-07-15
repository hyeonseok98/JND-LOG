"use client";

import { LOL_LINES } from "@/constants/players";
import { RIOT_CDN_VERSION, useChampionDict } from "@/hooks/use-champion-dict";
import { usePlayerStats } from "@/hooks/use-player-stats";
import cn from "@/lib";
import { getAvatarByName } from "@/lib/streamer-avater";
import Image from "next/image";

interface Props {
  matchId: string;
  winner: "BLUE" | "RED";
  headerBlue: string;
  headerRed: string;
}

export default function Scoreboard({ matchId, winner, headerBlue, headerRed }: Props) {
  /* ① 데이터 */
  const { data: stats } = usePlayerStats(matchId);
  const { data: champDict } = useChampionDict();

  if (!stats || !champDict) return null;

  /* ② 진영·라인별 5명 */
  const team = (side: "BLUE" | "RED") =>
    LOL_LINES.map((role) => stats.find((p) => p.side === side && p.role === role)).filter(
      (p): p is (typeof stats)[number] => p !== undefined,
    );

  /* ③ 행 컴포넌트 */
  const Row = ({ p }: { p: (typeof stats)[number] }) => {
    const champKey = champDict[p.champion] ?? "Unknown";

    return (
      <div className="grid grid-cols-[32px_1fr_repeat(3,56px)_70px_70px] items-center gap-x-2 py-1 text-sm">
        <Image src={getAvatarByName(p.playerName)} alt={p.playerName} width={28} height={28} className="rounded-full" />
        <div className="flex items-center gap-1 truncate">
          <span className="truncate">{p.playerName}</span>
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${RIOT_CDN_VERSION}/img/champion/${champKey}.png`}
            alt={p.champion}
            width={18}
            height={18}
          />
        </div>
        <span className="text-right">{p.kill}</span>
        <span className="text-right text-red-400">{p.death}</span>
        <span className="text-right">{p.assist}</span>
        <span className="text-right">{p.KDA.toFixed(2)}</span>
        <span className="text-right">{p.KP.toFixed(0)}%</span>
      </div>
    );
  };

  /* ④ 팀 박스 */
  const Board = ({ side }: { side: "BLUE" | "RED" }) => (
    <div className={cn("rounded-md p-3 space-y-1", side === "BLUE" ? "bg-[#102338]" : "bg-[#381414]")}>
      <h3 className={cn("mb-1 font-semibold", winner === side && "text-primary")}>
        {side === "BLUE" ? headerBlue : headerRed}
      </h3>
      {team(side).map((p) => (
        <Row key={`${p.playerId}-${p.champion}`} p={p} />
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <Board side="BLUE" />
      <Board side="RED" />
    </div>
  );
}
