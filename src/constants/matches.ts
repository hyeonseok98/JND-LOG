export interface Round {
  ban: string;
  result: string;
  winner: string;
}

export interface MatchData {
  teamA: string;
  teamB: string;
  rounds: Round[];
  note?: string;
}

export const matchesByDay: Record<"match1" | "match2", MatchData[]> = {
  match1: [
    {
      teamA: "플레임",
      teamB: "인섹",
      rounds: [
        {
          ban: "/matches/match1-flame-insec/1-ban.png",
          result: "/matches/match1-flame-insec/1-result.png",
          winner: "플레임",
        },
        {
          ban: "/matches/match1-flame-insec/2-ban.png",
          result: "/matches/match1-flame-insec/2-result.png",
          winner: "플레임",
        },
        {
          ban: "/matches/match1-flame-insec/3-ban.png",
          result: "/matches/match1-flame-insec/3-result.png",
          winner: "플레임",
        },
      ],
    },
    {
      teamA: "갱맘",
      teamB: "큐베",
      rounds: [
        {
          ban: "/matches/match1-gangmam-cuvee/1-ban.png",
          result: "/matches/match1-gangmam-cuvee/1-result.png",
          winner: "갱맘",
        },
        {
          ban: "/matches/match1-gangmam-cuvee/2-ban.png",
          result: "/matches/match1-gangmam-cuvee/2-result.png",
          winner: "큐베",
        },
        {
          ban: "/matches/match1-gangmam-cuvee/3-ban.png",
          result: "/matches/match1-gangmam-cuvee/3-result.png",
          winner: "갱맘",
        },
      ],
    },
    {
      teamA: "소우릎",
      teamB: "앰비션",
      rounds: [
        {
          ban: "/matches/match1-souruup-ambition/1-ban.png",
          result: "/matches/match1-souruup-ambition/1-result.png",
          winner: "앰비션",
        },
        {
          ban: "/matches/match1-souruup-ambition/2-ban.png",
          result: "/matches/match1-souruup-ambition/2-result.png",
          winner: "소우릎",
        },
        {
          ban: "/matches/match1-souruup-ambition/3-ban.png",
          result: "/matches/match1-souruup-ambition/3-result.png",
          winner: "소우릎",
        },
      ],
    },
  ],

  match2: [
    {
      teamA: "앰비션",
      teamB: "큐베",
      rounds: [
        {
          ban: "/matches/match2-ambition-cuvee/1-ban.png",
          result: "/matches/match2-ambition-cuvee/1-result.png",
          winner: "앰비션",
        },
        {
          ban: "/matches/match2-ambition-cuvee/2-ban.png",
          result: "/matches/match2-ambition-cuvee/2-result.png",
          winner: "앰비션",
        },
        {
          ban: "/matches/match2-ambition-cuvee/3-ban.png",
          result: "/matches/match2-ambition-cuvee/3-result.png",
          winner: "큐베",
        },
      ],
      note: "* 탑 대타: 김뿡(사유 - 푸린 대회 참가)",
    },
    {
      teamA: "소우릎",
      teamB: "플레임",
      rounds: [
        {
          ban: "/matches/match2-souruup-flame/1-ban.png",
          result: "/matches/match2-souruup-flame/1-result.png",
          winner: "플레임",
        },
        {
          ban: "/matches/match2-souruup-flame/2-ban.png",
          result: "/matches/match2-souruup-flame/2-result.png",
          winner: "소우릎",
        },
        {
          ban: "/matches/match2-souruup-flame/3-ban.png",
          result: "/matches/match2-souruup-flame/3-result.png",
          winner: "플레임",
        },
      ],
    },
  ],
};
