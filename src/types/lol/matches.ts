export interface MatchRow {
  matchId: string;
  date: string;
  durationSec: number;
  blueTeam: string;
  redTeam: string;
  winner: string;
  type: "내전" | "공식스크림" | "비공식스크림";
}

export interface TeamSummaryRow {
  team: string;
  type: string;
  games: number;
  wins: number;
  winRate: number;
}
export interface ChampSummaryRow {
  champion: string;
  type: string;
  picks: number;
  wins: number;
  winRate: number;
}
export interface SideSummaryRow {
  side: "BLUE" | "RED";
  type: string;
  games: number;
  wins: number;
  winRate: number;
}
