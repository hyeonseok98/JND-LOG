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
  remainingPair: [string, string];
};

const groups: Group[] = [
  {
    title: "A조",
    teams: [
      { name: "중년만화", played: 4, wins: 1, losses: 3 },
      { name: "할만한데", played: 2, wins: 2, losses: 0 },
      { name: "신과함께", played: 2, wins: 1, losses: 1 },
    ],
    remainingPair: ["할만한데", "신과함께"],
  },
  {
    title: "B조",
    teams: [
      { name: "폭탄목걸이", played: 4, wins: 1, losses: 3 },
      { name: "오추바사삭", played: 2, wins: 2, losses: 0 },
      { name: "그정도아니야", played: 2, wins: 1, losses: 1 },
    ],
    remainingPair: ["오추바사삭", "그정도아니야"],
  },
];

function cloneTeams(teams: Team[]): Team[] {
  return teams.map((t) => ({ ...t }));
}

/** 정렬: 승률 → 승수 → 이름 */
function sortTeams(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => {
    const rateA = a.wins / a.played;
    const rateB = b.wins / b.played;
    if (rateA !== rateB) return rateB - rateA;
    if (a.wins !== b.wins) return b.wins - a.wins;
    return a.name.localeCompare(b.name, "ko");
  });
}

interface Scenario {
  label: string;
  direct: string[];
  tie: string[];
  table: Team[];
}

function buildScenarios(group: Group): Scenario[] {
  const [xName, yName] = group.remainingPair;
  const xOrig = group.teams.find((t) => t.name === xName)!;
  const yOrig = group.teams.find((t) => t.name === yName)!;

  return [2, 1, 0].map((xWins) => {
    const teams = cloneTeams(group.teams);
    const x = teams.find((t) => t.name === xName)!;
    const y = teams.find((t) => t.name === yName)!;

    x.wins += xWins;
    x.losses += 2 - xWins;
    x.played += 2;

    y.wins += 2 - xWins;
    y.losses += xWins;
    y.played += 2;

    const sorted = sortTeams(teams);

    const rate1 = sorted[0].wins / sorted[0].played;
    const firstGroup = sorted.filter((t) => t.wins / t.played === rate1);

    let direct: string[] = [];
    let tie: string[] = [];

    if (firstGroup.length >= 2) {
      // 2팀 이상 동률 1위 → 모두 데스매치 (상위 2 결정 필요)
      tie = firstGroup.map((t) => t.name);
    } else {
      direct.push(firstGroup[0].name); // 1위 직행
      // determine 2위 그룹
      const rate2 =
        sorted.find((t) => t.wins / t.played < rate1)!.wins / sorted.find((t) => t.wins / t.played < rate1)!.played;
      const secondGroup = sorted.filter((t) => t.wins / t.played === rate2);
      if (secondGroup.length === 1) {
        direct.push(secondGroup[0].name); // 2위 확정
      } else {
        tie = secondGroup.map((t) => t.name); // 2위 동률 → 데스매치
      }
    }

    const label = xWins === 2 ? `${xName} 2‑0 ${yName}` : xWins === 1 ? `1‑1 (동률)` : `${yName} 2‑0 ${xName}`;

    return { label, direct, tie, table: sorted };
  });
}

export default function NewsPage() {
  return (
    <SectionLayout>
      <div className="flex flex-col gap-16 mx-auto max-w-4xl py-8">
        {groups.map((group) => {
          const scenarios = buildScenarios(group);
          const teamsSorted = sortTeams(group.teams);

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

              {/* Scenario Section */}
              <div className="bg-gray-800/60 px-4 py-5 rounded-lg space-y-4">
                <h3 className="text-gray-100 font-semibold mb-1">
                  시나리오별 결과 (남은 2경기: {group.remainingPair[0]} vs {group.remainingPair[1]})
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
                  {scenarios.map((s) => (
                    <li key={s.label} className="leading-5">
                      <span className="text-white font-medium">{s.label}</span>
                      {": "}
                      {s.direct.length > 0 && (
                        <>
                          <span className="text-emerald-400 font-medium">{s.direct.join(", ")}</span> 직행
                        </>
                      )}
                      {s.tie.length > 0 && (
                        <>
                          {s.direct.length > 0 && " / "}
                          ⚔️ <span className="text-amber-300 font-medium">{s.tie.join(" vs ")}</span> 데스매치
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </SectionLayout>
  );
}
