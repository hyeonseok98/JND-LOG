import { PlayerRow } from "@/types/lol/players";
import { toNumber } from "./number-format";

/**
 * 공통 정규화 함수
 */
export const sanitize = (rows: PlayerRow[]): PlayerRow[] => {
  return rows.map((r) => ({
    ...r,
    win: toNumber(r.win),
    kill: toNumber(r.kill),
    death: toNumber(r.death),
    assist: toNumber(r.assist),
    cs: toNumber(r.cs),
    gold: toNumber(r.gold),
    dmg: toNumber(r.dmg),
    KDA: toNumber(r.KDA),
    KP: toNumber(r.KP),
    DPM: toNumber(r.DPM),
    DPG: toNumber(r.DPG),
    DMGpct: toNumber((r as any)["DMG%"] ?? r.DMGpct),
    GPM: toNumber(r.GPM),
    GOLDpct: toNumber((r as any)["GOLD%"] ?? r.GOLDpct),
  }));
};
