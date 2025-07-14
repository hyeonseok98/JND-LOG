import type { PlayerRow } from "@/types/lol/players";
import Image from "next/image";

export default function ScoreRow({ player }: { player: PlayerRow }) {
  const { playerName, role, champion, kill, death, assist, KDA, GPM, KP } = player;

  return (
    <div className="grid grid-cols-[32px_1fr_repeat(4,60px)] gap-2 px-2 py-1 text-xs items-center">
      {/* 라인 아이콘 */}
      <Image src={`/icons/role/${role}.svg`} alt={role} width={18} height={18} />

      {/* 이름 + 챔프 */}
      <div className="truncate">
        <span className="font-medium">{playerName}</span> <span className="text-muted-foreground">({champion})</span>
      </div>

      {/* 스탯 */}
      <span>
        {kill}/{death}/{assist}
      </span>
      <span>{KDA?.toFixed(2)}</span>
      <span>{GPM}</span>
      <span>{KP?.toFixed(1)}%</span>
    </div>
  );
}
