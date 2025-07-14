export interface PlayerRow {
  matchId: string;
  playerId: string;
  playerName: string;
  side: string;
  role: string;
  champion: string;
  type: string;

  win: number | null;
  kill: number | null;
  death: number | null;
  assist: number | null;
  cs: number | null;
  gold: number | null;
  dmg: number | null;

  KDA: number | null;
  KP: number | null; // 시트에 KP 라는 헤더
  DPM: number | null;
  DPG: number | null;
  DMGpct: number | null; // 시트 헤더: DMG%
  GPM: number | null;
  GOLDpct: number | null; // 시트 헤더: GOLD%
}
