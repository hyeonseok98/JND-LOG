import { QUERY_KEYS } from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type ChampionDict = Record<string, string>; // krName ➜ engKey
const CDN = "https://ddragon.leagueoflegends.com";
export const RIOT_CDN_VERSION = "15.13.1";

export async function getChampionDict(): Promise<ChampionDict> {
  const url = `${CDN}/cdn/${RIOT_CDN_VERSION}/data/ko_KR/champion.json`;
  const { data } = await axios.get(url);
  return Object.entries(data.data).reduce<ChampionDict>((acc, [, v]: any) => {
    acc[v.name] = v.id; //     "아리"  -> "Ahri"
    return acc;
  }, {});
}

export function useChampionDict() {
  return useQuery({
    queryKey: QUERY_KEYS.GOOGLE_SHEET.CHAMPIONS(),
    queryFn: getChampionDict,
    staleTime: Infinity,
  });
}
