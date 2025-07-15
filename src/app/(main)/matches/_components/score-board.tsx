"use client";

import Avatar from "@/components/ui/avatar";
import Skeleton from "@/components/ui/skeleton";
import { LOL_LINES } from "@/constants/players";
import { RIOT_CDN_VERSION, useChampionDict } from "@/hooks/use-champion-dict";
import { PlayerStatRow, usePlayerStats } from "@/hooks/use-player-stats";
import cn from "@/lib";
import { getAvatarByName } from "@/lib/streamer-avater";
import { kFormat } from "@/util/number-format";
import Image from "next/image";

const COLS = [
  { key: "kill", label: "K", format: (v: number) => v },
  { key: "death", label: "D", format: (v: number) => v, className: "text-red-400" },
  { key: "assist", label: "A", format: (v: number) => v },
  { key: "KDA", label: "KDA", format: (v: number, d: any) => (d.death === 0 ? "perfect" : v.toFixed(2)) },
  { key: "KP", label: "KP%", format: (v: number) => v.toFixed(1) + "%" },
  { key: "dmg", label: "DMG", format: kFormat },
  { key: "gold", label: "GOLD", format: kFormat },
  { key: "DPM", label: "DPM", format: (v: number) => v.toFixed(0) },
  { key: "DPG", label: "DPG", format: (v: number) => v.toFixed(3) },
  { key: "DMG%", label: "DMG%", format: (v: number) => v.toFixed(2) + "%" },
  { key: "GPM", label: "GPM", format: (v: number) => v.toFixed(0) },
  { key: "GOLD%", label: "GOLD%", format: (v: number) => v.toFixed(2) + "%" },
];

const HEADER = (
  <div className="grid grid-cols-[32px_120px_40px_40px_40px_60px_55px_55px_55px_55px_60px_60px_55px_60px] gap-x-2 py-1 text-xs text-gray-300">
    <span />
    <span>플레이어</span>
    {COLS.map((col) => (
      <span key={col.key} className="text-center">
        {col.label}
      </span>
    ))}
  </div>
);

interface ScoreboardProps {
  matchId: string;
  winner: "BLUE" | "RED";
  headerBlue: string;
  headerRed: string;
}

export default function Scoreboard({ matchId, winner, headerBlue, headerRed }: ScoreboardProps) {
  const { data: stats, isLoading: statsLoading } = usePlayerStats(matchId);
  const { data: champDict, isLoading: champLoading } = useChampionDict();
  const isLoading = statsLoading || champLoading;

  if (isLoading) {
    return <Skeleton rows={3} />;
  }
  if (!stats || !champDict) return null;

  /* 진영·라인별 5명 */
  const team = (side: "BLUE" | "RED") =>
    LOL_LINES.map((role) => stats.find((p) => p.side === side && p.role === role)).filter(
      (p): p is (typeof stats)[number] => p !== undefined,
    );

  const Row = ({ p }: { p: PlayerStatRow }) => {
    const champKey = champDict[p.champion] ?? "Unknown";

    return (
      <div className="grid grid-cols-[32px_120px_40px_40px_40px_60px_55px_55px_55px_55px_60px_60px_55px_60px] items-center gap-x-2 py-0.5">
        <Avatar src={getAvatarByName(p.playerName)} alt="프로필 사진" size={28} />
        <div className="flex items-center gap-1">
          {p.playerName}
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${RIOT_CDN_VERSION}/img/champion/${champKey}.png`}
            alt={p.champion}
            width={20}
            height={20}
          />
        </div>
        {COLS.map((col) => (
          <span key={col.key} className={cn("text-center", col.className)}>
            {col.format(p[col.key as keyof PlayerStatRow] as number, p)}
          </span>
        ))}
      </div>
    );
  };

  /* 팀 박스 */
  const Board = ({ side }: { side: "BLUE" | "RED" }) => (
    <div className={cn("rounded-md p-3 space-y-1", side === "BLUE" ? "bg-[#102338]" : "bg-[#381414]")}>
      <h3 className={cn("mb-2 font-semibold text-gray-200", winner === side && "text-amber-400")}>
        {side === "BLUE" ? `${headerBlue} 팀` : `${headerRed} 팀`}
      </h3>
      {HEADER}
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
