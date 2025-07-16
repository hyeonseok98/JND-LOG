import { SectionLayout } from "@/components/layout";

type Team = {
  name: string;
  played: number;
  wins: number;
  losses: number;
};

type Group = {
  title: string;
  teams: Team[];
  /** 남은 마지막 경기 매치업 */
  remainingPair: [string, string];
};

const groups: Group[] = [
  {
    title: "A조",
    teams: [
      { name: "중년만화", played: 4, wins: 1, losses: 3 },
      { name: "할만한데", played: 3, wins: 2, losses: 1 },
      { name: "신과함께", played: 3, wins: 2, losses: 1 },
    ],
    remainingPair: ["할만한데", "신과함께"],
  },
  {
    title: "B조",
    teams: [
      { name: "폭탄목걸이", played: 4, wins: 1, losses: 3 },
      { name: "오추바사삭", played: 3, wins: 3, losses: 0 },
      { name: "그정도아니야", played: 3, wins: 1, losses: 2 },
    ],
    remainingPair: ["오추바사삭", "그정도아니야"],
  },
];

const cloneTeams = (teams: Team[]): Team[] => teams.map((t) => ({ ...t }));

/** 정렬: 승률 → 승수 → 이름 */
const sortTeams = (teams: Team[]): Team[] =>
  [...teams].sort((a, b) => {
    const rateA = a.wins / a.played;
    const rateB = b.wins / b.played;
    if (rateA !== rateB) return rateB - rateA;
    if (a.wins !== b.wins) return b.wins - a.wins;
    return a.name.localeCompare(b.name, "ko");
  });

interface Scenario {
  label: string;
  direct: string[];
  tie: string[];
}

/** 남은 1경기 시나리오(2가지) 산출 */
function buildScenarios(group: Group): Scenario[] {
  const [xName, yName] = group.remainingPair;
  return [1, 0].map((xWin) => {
    const teams = cloneTeams(group.teams);
    const x = teams.find((t) => t.name === xName)!;
    const y = teams.find((t) => t.name === yName)!;

    x.wins += xWin;
    x.losses += 1 - xWin;
    x.played += 1;

    y.wins += 1 - xWin;
    y.losses += xWin;
    y.played += 1;

    const sorted = sortTeams(teams);

    const first = sorted[0];
    const second = sorted[1];
    const third = sorted[2];

    const firstRate = first.wins / first.played;
    const secondRate = second.wins / second.played;

    const direct: string[] = [];
    const tie: string[] = [];

    // 1위 판단
    const firstGroup = sorted.filter((t) => t.wins / t.played === firstRate);
    if (firstGroup.length === 1) {
      direct.push(first.name);
    } else {
      // 1위 동률 2~3팀 모두 tie
      tie.push(...firstGroup.map((t) => t.name));
    }

    // 2위 판단 (only if direct already has 1 team)
    if (direct.length === 1) {
      const secondGroup = sorted.filter((t) => t.wins / t.played === secondRate && !direct.includes(t.name));
      if (secondGroup.length === 1) {
        direct.push(second.name);
      } else {
        tie.push(...secondGroup.map((t) => t.name));
      }
    }

    const label = xWin === 1 ? `${xName} 승` : `${yName} 승`;
    return { label, direct: [...new Set(direct)], tie: [...new Set(tie)] };
  });
}

export default function NewsPage() {
  return (
    <SectionLayout>
      <div className="flex flex-col gap-16 mx-auto max-w-4xl py-8">
        {groups.map((group) => {
          const scenarios = buildScenarios(group);
          const teamsSorted = sortTeams(group.teams);

          // 공통 direct 세트가 동일 & tie가 전부 빈 배열인지 체크
          const uniqueDirectSets = new Set(scenarios.map((s) => [...s.direct].sort().join("|")));
          const sameOutcome = uniqueDirectSets.size === 1 && scenarios.every((s) => s.tie.length === 0);
          const guaranteedTeams = sameOutcome ? scenarios[0].direct.join(", ") : null;

          return (
            <article key={group.title} className="bg-gray-900 w-full rounded-2xl shadow-lg p-8 space-y-6">
              <header className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-2xl font-bold text-white">{group.title} 조별 리그</h2>
                <span className="text-sm text-gray-400">
                  상위 <strong className="text-amber-400">2팀</strong> 진출
                </span>
              </header>

              <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="min-w-full text-gray-200 text-sm">
                  <thead className="bg-gray-800/60">
                    <tr>
                      <th className="py-2 pl-3 text-left">순위</th>
                      <th className="py-2 text-left">팀</th>
                      <th className="py-2 text-center">경기</th>
                      <th className="py-2 text-center text-emerald-400">승</th>
                      <th className="py-2 text-center text-rose-400">패</th>
                      <th className="py-2 text-center">승률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamsSorted.map((t, idx) => (
                      <tr key={t.name} className={idx < 2 ? "bg-gray-800/30" : "hover:bg-gray-800/20"}>
                        <td className="py-1 pl-3 text-gray-400">{idx + 1}</td>
                        <td className="py-1">{t.name}</td>
                        <td className="py-1 text-center">{t.played}</td>
                        <td className="py-1 text-center font-medium text-emerald-400">{t.wins}</td>
                        <td className="py-1 text-center text-rose-400">{t.losses}</td>
                        <td className="py-1 text-center">{((t.wins / t.played) * 100).toFixed(0)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-800/60 px-4 py-5 rounded-lg space-y-3 text-sm text-gray-300">
                <h3 className="text-gray-100 font-semibold mb-1">
                  시나리오별 결과 (남은 1경기: {group.remainingPair[0]} vs {group.remainingPair[1]})
                </h3>

                {sameOutcome ? (
                  <p>
                    ⚡ 어느 팀이 승리하더라도 
                    <span className="text-emerald-400 font-medium">{guaranteedTeams}</span>
                    팀이 다음 라운드에 진출
                  </p>
                ) : (
                  <ul className="space-y-1 list-disc list-inside">
                    {scenarios.map((s) => (
                      <li key={s.label} className="leading-5">
                        <span className="text-white font-medium">{s.label}</span>
                        {" : "}
                        {s.direct.length > 0 && (
                          <>
                            <span className="text-emerald-400 font-medium">{s.direct.join(", ")}</span> 직행
                          </>
                        )}
                        {s.tie.length > 0 && (
                          <>
                            {s.direct.length > 0 && " / "}
                            ⚔️ <span className="text-amber-300 font-medium">{s.tie.join(" vs ")}</span> 데스매치
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </SectionLayout>
  );
}
