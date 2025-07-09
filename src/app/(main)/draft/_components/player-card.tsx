import cn from "@/lib";
import { Player } from "@/types/draft";
import Image from "next/image";

interface PlayerCardProps {
  player: Player;
  disabled: boolean;
  onPick: () => void;
}

export default function PlayerCard({ player, disabled, onPick }: PlayerCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPick}
      className={cn(
        "flex flex-col items-center gap-1 transition-opacity",
        disabled ? "opacity-25 cursor-not-allowed" : "hover:opacity-90 active:scale-95 cursor-pointer",
      )}
    >
      <Image src={player.avatar} alt={player.name} width={56} height={56} className="rounded-full" />
      <span className="text-[10px] leading-tight text-center">
        {player.name}
        <br />
        <span className="text-emerald-400">{player.cost}</span>
      </span>
    </button>
  );
}
