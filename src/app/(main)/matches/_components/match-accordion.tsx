"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { MatchRow } from "@/types/lol/matches";
import { formatDuration } from "@/util/format-number";
import dayjs from "dayjs";
import { TypeBadge } from "./badge";
import Scoreboard from "./scoreboard";

interface MatchAccordionProps {
  match: MatchRow;
}

export default function MatchAccordion({ match }: MatchAccordionProps) {
  const {
    matchId,
    type, // 내전 / 공식스크림 / 비공식스크림
    date, // 2025-07-01-01 형식
    blueTeam,
    redTeam,
    winner,
    durationSec, // 게임 길이(초)
  } = match;

  return (
    <AccordionItem value={matchId} className="rounded-md border">
      <AccordionTrigger className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-white">
        <div className="flex items-center gap-3">
          <TypeBadge value={type} />
          <span>{dayjs(date).format("HH:mm")}</span>

          <span className="font-medium">
            {blueTeam}
            <span className="mx-1 text-muted-foreground">vs</span>
            {redTeam}
          </span>
        </div>

        <span className="text-muted-foreground">{formatDuration(durationSec)}</span>
      </AccordionTrigger>

      <AccordionContent>
        <Scoreboard matchId={matchId} winner={winner} />
      </AccordionContent>
    </AccordionItem>
  );
}
