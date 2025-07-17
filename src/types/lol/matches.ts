export type MATCH_TYPE =
  | "내전"
  | "공식스크림"
  | "비공식스크림"
  | "조별리그A조"
  | "조별리그B조"
  | "시드결정전"
  | "플레이오프";

export interface MatchRow {
  matchId: string;
  date: string;
  durationSec: number;
  blueTeam: string;
  redTeam: string;
  winner: string;
  type: MATCH_TYPE;
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
