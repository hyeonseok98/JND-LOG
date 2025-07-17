"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePrefetchPlayerStats } from "@/hooks/use-prefetch-player-stats";
import dayjs from "dayjs";
import { BadgeType, TypeBadge } from "./badge";
import Scoreboard from "./score-board";
import TeamSummaryPanel from "./team-summary_panel";

/** 서버에서 받아온 초기 데이터를 그대로 props 로 받음 */
interface ClientMatchesProps {
  initialData: Awaited<ReturnType<typeof import("../_services/matches").fetchMatchesByDate>>;
}

const DATE_NOTES: Record<string, string> = {
  "2025-07-19": "플레이오프",
  "2025-07-17": "시드 결정전",
  "2025-07-16": "3팀 2조 풀리그",
  "2025-07-15": "공식 스크림 3일차",
  "2025-07-14": "공식 스크림 2일차",
  "2025-07-13": "공식 스크림 1일차",
  "2025-07-12": "경매날(비공식 스크림)",
  "2025-07-11": "내전 11일차",
  "2025-07-10": "내전 10일차",
  "2025-07-09": "내전 9일차",
  "2025-07-08": "내전 8일차",
  "2025-07-07": "내전 7일차",
  "2025-07-06": "내전 6일차",
  "2025-07-05": "내전 5일차",
  "2025-07-04": "내전 4일차",
  "2025-07-03": "내전 3일차",
  "2025-07-02": "내전 2일차",
  "2025-07-01": "내전 1일차",
};

export default function ClientMatches({ initialData }: ClientMatchesProps) {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">경기 기록</h1>
      <TeamSummaryPanel />
      {initialData.map(([date, matches]) => (
        <section key={date} className="space-y-4">
          <h2 className="text-lg font-semibold text-white">
            {dayjs(date).format("M월 D일")}
            {DATE_NOTES[date] && <span className="ml-2 text-sm text-muted-foreground">- {DATE_NOTES[date]}</span>}
          </h2>

          <Accordion type="multiple" className="space-y-3">
            {matches.map((m) => {
              /* viewport 200px 전에 미리 player-stats prefetch */
              const prefetchRef = usePrefetchPlayerStats(m.matchId);

              return (
                <AccordionItem key={m.matchId} value={m.matchId} ref={prefetchRef} className="rounded-md border">
                  <AccordionTrigger className="flex items-center justify-between gap-4 px-4 py-3 text-white cursor-pointer hover:no-underline">
                    <div className="flex items-center gap-3">
                      <TypeBadge value={m.type as BadgeType} />

                      <span className="font-medium truncate space-x-1">
                        <span className={m.winner === m.headerBlue ? "text-sky-400" : undefined}>
                          {m.headerBlue} 팀
                        </span>
                        <span className="hidden md:inline">({m.bluePlayers})</span>
                        <span className="mx-1 text-muted-foreground">vs</span>
                        <span className={m.winner === m.headerRed ? "text-rose-400" : undefined}>{m.headerRed} 팀</span>
                        <span className="hidden md:inline">({m.redPlayers})</span>
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="bg-muted/20 px-4 py-3 text-sm italic text-muted-foreground">
                    <Scoreboard
                      matchId={m.matchId}
                      winner={m.winner as "BLUE" | "RED"}
                      headerBlue={m.headerBlue}
                      headerRed={m.headerRed}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </section>
      ))}
    </>
  );
}
