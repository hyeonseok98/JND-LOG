import { StaticImageData } from "next/image";

/* ───────── 라인 아이콘 ───────── */
import iconAd from "@/assets/icons/lol-line-icon/ad-line-gold.svg";
import iconJungle from "@/assets/icons/lol-line-icon/jg-line-gold.svg";
import iconMid from "@/assets/icons/lol-line-icon/mid-line-gold.svg";
import iconSupport from "@/assets/icons/lol-line-icon/sup-line-gold.svg";
import iconTop from "@/assets/icons/lol-line-icon/top-line-gold.svg";

/* ───────── TOP 아바타 ───────── */
import Dun from "@/assets/images/player-profile/top/top-던-default.webp";
import RookSam from "@/assets/images/player-profile/top/top-룩삼-default.webp";
import MatSuryung from "@/assets/images/player-profile/top/top-맛수령-default.webp";
import SeungWooAppa from "@/assets/images/player-profile/top/top-승우아빠-default.webp";
import ChickenKun from "@/assets/images/player-profile/top/top-치킨쿤-default.webp";
import Purin from "@/assets/images/player-profile/top/top-푸린-default.webp";

/* ───────── JUNGLE 아바타 ───────── */
import GangMam from "@/assets/images/player-profile/jg/jg-갱맘-default.webp";
import SouRuup from "@/assets/images/player-profile/jg/jg-소우릎-default.webp";
import Ambition from "@/assets/images/player-profile/jg/jg-엠비션-default.webp";
import Insec from "@/assets/images/player-profile/jg/jg-인섹-default.webp";
import CuVee from "@/assets/images/player-profile/jg/jg-큐베-default.webp";
import Flame from "@/assets/images/player-profile/jg/jg-플레임-default.webp";

/* ───────── MID 아바타 ───────── */
import Necklet from "@/assets/images/player-profile/mid/mid-네클릿-default.webp";
import NoFe from "@/assets/images/player-profile/mid/mid-노페-default.webp";
import InganJelly from "@/assets/images/player-profile/mid/mid-인간젤리-default.webp";
import TrollYa from "@/assets/images/player-profile/mid/mid-트롤야-default.webp";
import PhoenixPark from "@/assets/images/player-profile/mid/mid-피닉스박-default.webp";
import Hejing from "@/assets/images/player-profile/mid/mid-헤징-default.webp";

/* ───────── AD 아바타 ───────── */
import KangQui from "@/assets/images/player-profile/ad/ad-강퀴-default.webp";
import NoonKkot from "@/assets/images/player-profile/ad/ad-눈꽃-default.webp";
import DdaHyoni from "@/assets/images/player-profile/ad/ad-따효니-default.webp";
import Runner from "@/assets/images/player-profile/ad/ad-러너-default.webp";
import MasoKim from "@/assets/images/player-profile/ad/ad-마소킴-default.webp";
import Flurry from "@/assets/images/player-profile/ad/ad-플러리-default.webp";

/* ───────── SUPPORT 아바타 ───────── */
import GoSuDal from "@/assets/images/player-profile/sup/sup-고수달-default.webp";
import Racong from "@/assets/images/player-profile/sup/sup-라콩-default.webp";
import MadLife from "@/assets/images/player-profile/sup/sup-매드라이프-default.webp";
import HeeTae from "@/assets/images/player-profile/sup/sup-이희태-default.webp";
import CaptainJack from "@/assets/images/player-profile/sup/sup-캡틴잭-default.webp";
import CrazyCat from "@/assets/images/player-profile/sup/sup-크캣-default.webp";

export type LOL_LINE = "TOP" | "JUNGLE" | "MID" | "AD" | "SUPPORT";

export interface StreamerInfo {
  name: string;
  avatar: StaticImageData;
  channelId: string;
}

export interface LineInfo {
  line: LOL_LINE;
  icon: StaticImageData;
  members: StreamerInfo[];
}

export const StreamerInfos: LineInfo[] = [
  {
    line: "TOP",
    icon: iconTop,
    members: [
      { name: "던", avatar: Dun, channelId: "000000…" },
      { name: "룩삼", avatar: RookSam, channelId: "000000…" },
      { name: "맛수령", avatar: MatSuryung, channelId: "000000…" },
      { name: "승우아빠", avatar: SeungWooAppa, channelId: "000000…" },
      { name: "치킨쿤", avatar: ChickenKun, channelId: "000000…" },
      { name: "푸린", avatar: Purin, channelId: "000000…" },
    ],
  },
  {
    line: "JUNGLE",
    icon: iconJungle,
    members: [
      { name: "갱맘", avatar: GangMam, channelId: "000000…" },
      { name: "소우릎", avatar: SouRuup, channelId: "000000…" },
      { name: "엠비션", avatar: Ambition, channelId: "000000…" },
      { name: "인섹", avatar: Insec, channelId: "000000…" },
      { name: "큐베", avatar: CuVee, channelId: "000000…" },
      { name: "플레임", avatar: Flame, channelId: "000000…" },
    ],
  },
  {
    line: "MID",
    icon: iconMid,
    members: [
      { name: "노페", avatar: NoFe, channelId: "000000…" },
      { name: "네클릿", avatar: Necklet, channelId: "000000…" },
      { name: "인간젤리", avatar: InganJelly, channelId: "000000…" },
      { name: "트롤야", avatar: TrollYa, channelId: "000000…" },
      { name: "피닉스박", avatar: PhoenixPark, channelId: "000000…" },
      { name: "헤징", avatar: Hejing, channelId: "000000…" },
    ],
  },
  {
    line: "AD",
    icon: iconAd,
    members: [
      { name: "강퀴", avatar: KangQui, channelId: "000000…" },
      { name: "눈꽃", avatar: NoonKkot, channelId: "000000…" },
      { name: "따효니", avatar: DdaHyoni, channelId: "000000…" },
      { name: "러너", avatar: Runner, channelId: "000000…" },
      { name: "마소킴", avatar: MasoKim, channelId: "000000…" },
      { name: "플러리", avatar: Flurry, channelId: "000000…" },
    ],
  },
  {
    line: "SUPPORT",
    icon: iconSupport,
    members: [
      { name: "고수달", avatar: GoSuDal, channelId: "000000…" },
      { name: "라콩", avatar: Racong, channelId: "000000…" },
      { name: "매드라이프", avatar: MadLife, channelId: "000000…" },
      { name: "이희태", avatar: HeeTae, channelId: "000000…" },
      { name: "캡틴잭", avatar: CaptainJack, channelId: "000000…" },
      { name: "크캣", avatar: CrazyCat, channelId: "000000…" },
    ],
  },
];
