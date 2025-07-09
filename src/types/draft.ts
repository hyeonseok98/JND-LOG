import { StaticImageData } from "next/image";

export type LolLine = "TOP" | "JUNGLE" | "MID" | "AD" | "SUPPORT";

export interface Player {
  id: string;
  name: string;
  avatar: StaticImageData;
  line: LolLine;
  cost: number;
}

export interface Slot {
  line: LolLine;
  player?: Player;
}

export interface Team {
  id: string;
  name: string;
  budget: number; // 전체 예산 포인트
  points: number; // 현재 사용 포인트 합
  slots: Record<LolLine, Slot>;
}
