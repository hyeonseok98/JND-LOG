import ad from "@/assets/icons/lol-line-icon/ad-line-gold.svg";
import jungle from "@/assets/icons/lol-line-icon/jg-line-gold.svg";
import mid from "@/assets/icons/lol-line-icon/mid-line-gold.svg";
import support from "@/assets/icons/lol-line-icon/sup-line-gold.svg";
import top from "@/assets/icons/lol-line-icon/top-line-gold.svg";

import { StaticImageData } from "next/image";

export type LOL_LINE = "TOP" | "JUNGLE" | "MID" | "AD" | "SUPPORT";

export interface StreamerProps {
  line: LOL_LINE;
  icon: StaticImageData;
  streamers: string[];
}

export const Streamers: StreamerProps[] = [
  { line: "TOP", icon: top, streamers: ["푸린", "승우아빠", "치킨쿤", "맛수령", "룩삼", "던"] },
  { line: "JUNGLE", icon: jungle, streamers: ["소우릎", "플레임", "인섹", "엠비션", "갱맘", "큐베"] },
  { line: "MID", icon: mid, streamers: ["인간젤리", "헤징", "트롤야", "피닉스박", "노페", "네클릿"] },
  { line: "AD", icon: ad, streamers: ["러너", "따효니", "플러리", "눈꽃", "마소킴", "강퀴"] },
  { line: "SUPPORT", icon: support, streamers: ["크캣", "라콩", "고수달", "캡틴잭", "이희태", "매드라이프"] },
];
