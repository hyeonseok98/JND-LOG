export interface MatchRow {
  matchId: string;
  date: string;
  durationSec: number;
  blueTeam: string;
  redTeam: string;
  winner: string;
  type: "내전" | "공식스크림" | "비공식스크림";
}
