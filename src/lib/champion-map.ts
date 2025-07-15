import axios from "axios";
import { cache } from "react";

// Riot CDN 버전
export const RIOT_CDN_VERSION = "15.13.1";

export interface ChampionDict {
  [korName: string]: string;
}

export const getChampionDict = cache(async (): Promise<ChampionDict> => {
  const { data } = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${RIOT_CDN_VERSION}/data/ko_KR/champion.json`,
    {
      timeout: 10000,
    },
  );

  const dict: ChampionDict = {};
  Object.values<any>(data.data).forEach((c) => {
    dict[c.name] = c.id; // 한글 → 영문 key
    c.aliases?.forEach((a: string) => (dict[a] = c.id));
  });
  return dict;
});
