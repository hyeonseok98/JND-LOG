import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import dayjs from "dayjs";
import { BadgeType, TypeBadge } from "./_components/badge";
import { fetchMatchesByDate } from "./_services/matches";

export default async function MatchesPage() {
  const matchesByDate = await fetchMatchesByDate();

  console.log(matchesByDate);

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <h1 className="text-2xl font-bold text-white">경기 기록</h1>

      {matchesByDate.map(([date, matches]) => (
        <section key={date} className="space-y-4">
          <h2 className="text-lg font-semibold text-white">{dayjs(date).format("M월 D일")}</h2>

          <Accordion type="multiple" className="space-y-3">
            {matches.map((m) => (
              <AccordionItem key={m.matchId} value={m.matchId} className="rounded-md border">
                <AccordionTrigger className="flex items-center justify-between gap-4 px-4 py-3 text-white">
                  <div className="flex items-center gap-3">
                    <TypeBadge value={m.type as BadgeType} />
                    <span className="font-medium truncate">
                      {m.headerBlue} 팀({m.bluePlayers})<span className="mx-1 text-muted-foreground">vs</span>
                      {m.headerRed} 팀({m.redPlayers})
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="bg-muted/20 px-4 py-3 text-sm italic text-muted-foreground">
                  경기 상세 준비 중…
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ))}
    </div>
  );
}
