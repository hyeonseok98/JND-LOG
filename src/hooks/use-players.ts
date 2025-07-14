import apiClient from "@/apis";
import { GOOGLE_ENDPOINTS } from "@/apis/end-points";
import { QUERY_KEYS } from "@/constants/query-key";
import { PlayerRow } from "@/types/lol/players";
import { toNumber } from "@/util/number";
import { useQuery } from "@tanstack/react-query";

export function usePlayers() {
  return useQuery<PlayerRow[]>({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.PLAYERS,
    queryFn: async () => {
      const { data } = await apiClient.get<PlayerRow[]>(GOOGLE_ENDPOINTS.PLAYERS);

      return data.map((r: any) => ({
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
        DMGpct: toNumber(r["DMG%"] ?? r.DMGpct),
        GPM: toNumber(r.GPM),
        GOLDpct: toNumber(r["GOLD%"] ?? r.GOLDpct),
      }));
    },
    staleTime: 10 * 60 * 1000,
  });
}
