"use client";

import cn from "@/lib";
import { MATCH_TYPE } from "@/types/lol/matches";

export type BadgeType = MATCH_TYPE;

interface CommonProps {
  className?: string;
}

export function TypeBadge({ value, className }: CommonProps & { value: BadgeType }) {
  const palette: Record<BadgeType, string> = {
    내전: "bg-blue-400/10 text-blue-300",
    공식스크림: "bg-green-600/10 text-green-600",
    비공식스크림: "bg-yellow-500/10 text-yellow-500",
    조별리그: "bg-yellow-500/10 text-yellow-500",
    플레이오프: "bg-yellow-500/10 text-yellow-500",
    결승: "bg-yellow-500/10 text-yellow-500",
  };

  return (
    <span className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold", palette[value], className)}>
      {value}
    </span>
  );
}
