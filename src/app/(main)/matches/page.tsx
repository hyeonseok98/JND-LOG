import { SectionLayout } from "@/components/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MatchData, matchesByDay, Round } from "@/constants/matches";
import Image from "next/image";

export default function MatchPage() {
  const dayMatches: [string, MatchData[]][] = [
    ["Match 1", matchesByDay.match1],
    ["Match 2", matchesByDay.match2],
  ];

  // 팀별 승/패 집계
  const teamStats: Record<string, { win: number; lose: number }> = {};
  dayMatches.forEach(([_, matches]) => {
    matches.forEach((match) => {
      const winsA = match.rounds.filter((r) => r.winner === match.teamA).length;
      const winsB = match.rounds.filter((r) => r.winner === match.teamB).length;

      teamStats[match.teamA] ??= { win: 0, lose: 0 };
      teamStats[match.teamB] ??= { win: 0, lose: 0 };

      teamStats[match.teamA].win += winsA;
      teamStats[match.teamA].lose += winsB;
      teamStats[match.teamB].win += winsB;
      teamStats[match.teamB].lose += winsA;
    });
  });

  // 승률 계산 및 오름차순
  const statsArray = Object.entries(teamStats)
    .map(([team, { win, lose }]) => {
      const total = win + lose;
      const rate = total > 0 ? Math.round((win / total) * 100) : 0;
      return { team, win, lose, rate };
    })
    .sort((a, b) => b.rate - a.rate);

  return (
    <SectionLayout>
      <div className="max-w-4xl w-full py-8 space-y-12">
        <h1 className="text-3xl font-bold text-white text-center">2025-07-12(토) 자낳대 내전 결과</h1>

        {/* 팀별 전적 + 승률 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {statsArray.map(({ team, win, lose, rate }) => (
            <div key={team} className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
              <span className="text-lg font-semibold">TEAM {team}</span>
              <span className="mt-2 text-gray-600">
                W {win} / L {lose}
              </span>
              <span className="text-sm text-gray-500 mt-1">승률: {rate}%</span>
            </div>
          ))}
        </div>

        {/* 매치 */}
        {dayMatches.map(([title, matches]) => (
          <section key={title} className="space-y-6">
            <h2 className="text-2xl font-semibold text-white border-b border-gray-600 pb-1">{title}</h2>

            {matches.map((match, mi) => {
              const winsA = match.rounds.filter((r) => r.winner === match.teamA).length;
              const winsB = match.rounds.filter((r) => r.winner === match.teamB).length;
              const matchWinner = winsA > winsB ? "teamA" : winsB > winsA ? "teamB" : undefined;

              return (
                <Accordion key={mi} type="single" collapsible className="rounded-lg overflow-hidden shadow-md">
                  <AccordionItem value={`match-${mi}`}>
                    <AccordionTrigger className="px-4 bg-white text-black hover:no-underline cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className={matchWinner === "teamA" ? "text-green-500 font-semibold" : ""}>
                          TEAM {match.teamA}
                        </span>
                        <span className="text-gray-500">vs</span>
                        <span className={matchWinner === "teamB" ? "text-green-500 font-semibold" : ""}>
                          TEAM {match.teamB}
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-700">
                          ({winsA} : {winsB})
                        </span>
                        {/* note가 있을 때만 표시 */}
                        {match.note && <span className="ml-auto text-sm text-amber-500">{match.note}</span>}
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="p-5">
                      <div className="space-y-8">
                        {match.rounds.map((round: Round, ri: number) => (
                          <div key={ri} className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                            <Image
                              src={round.result}
                              alt={`Match ${mi + 1} Game ${ri + 1} 결과`}
                              fill
                              className="object-cover"
                              priority
                              loading="eager"
                              sizes="(max-width: 768px) 100vw, 800px"
                            />
                            <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded">
                              TEAM <span className="text-amber-200">{round.winner}</span> 승
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </section>
        ))}
      </div>
    </SectionLayout>
  );
}
