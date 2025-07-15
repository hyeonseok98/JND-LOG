export type Mode = "내전" | "공식스크림" | "비공식스크림";
export interface PlayerRow {
  /* 기본키 */
  matchId: string;
  playerId: string;

  /* 프로필 */
  playerName: string;
  side: "BLUE" | "RED";
  role: "TOP" | "JG" | "MID" | "AD" | "SUP";
  champion: string;

  /* 구분 */
  type: "내전" | "공식스크림" | "비공식스크림";

  /* 원-데이터 */
  win: number | null;
  kill: number | null;
  death: number | null;
  assist: number | null;
  cs: number | null;
  gold: number | null;
  dmg: number | null;

  /* 계산 필드 */
  KDA: number | null;
  KP: number | null; // kill participation
  DPM: number | null;
  DPG: number | null;
  DMGpct: number | null;
  GPM: number | null;
  GOLDpct: number | null;
}

export interface PlayerSummaryRow {
  playerId: string;
  playerName: string;
  games: number;
  wins: number;
  winRate: number;
  avgKDA: number;
  avgKP: number;
  avgDPM: number;
  avgDPG: number;
  "avgDMG%": number;
  avgGPM: number;
  "avgGOLD%": number;
}
