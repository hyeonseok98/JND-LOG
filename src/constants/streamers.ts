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
      { name: "던", avatar: Dun, channelId: "dc740d5bb5680666b6bf2ebc58a8203f" },
      { name: "룩삼", avatar: RookSam, channelId: "8803cee946a9e610a76fbdee98d98c61" },
      { name: "맛수령", avatar: MatSuryung, channelId: "1bbd60cab975eec08b698a47c0a13713" },
      { name: "승우아빠", avatar: SeungWooAppa, channelId: "4d39d99252f247f06de349ccc0d444a7" },
      { name: "치킨쿤", avatar: ChickenKun, channelId: "4b00ded9b083e31c29dc509d7e063c7a" },
      { name: "푸린", avatar: Purin, channelId: "75bd327f6ba6f57106c79fe3f2c3d19f" },
    ],
  },
  {
    line: "JUNGLE",
    icon: iconJungle,
    members: [
      { name: "갱맘", avatar: GangMam, channelId: "dbd6e0689ff9debf8bb00a415786654c" },
      { name: "소우릎", avatar: SouRuup, channelId: "fc00d47a77ed2d1156cd5997eba30310" },
      { name: "엠비션", avatar: Ambition, channelId: "8a59b34b46271960c1bf172bb0fac758" },
      { name: "인섹", avatar: Insec, channelId: "47c49bff55111a6cfd30bb299e9d2e5d" },
      { name: "큐베", avatar: CuVee, channelId: "26ae7850ad5b6b09ca864d482dc7fa50" },
      { name: "플레임", avatar: Flame, channelId: "8b3e8e3a13201cff0836c69cfab62f45" },
    ],
  },
  {
    line: "MID",
    icon: iconMid,
    members: [
      { name: "노페", avatar: NoFe, channelId: "f20881fce506174330ecb58342c4c70d" },
      { name: "네클릿", avatar: Necklet, channelId: "dff5fc9706f8260682ce6eb93acaad64" },
      { name: "인간젤리", avatar: InganJelly, channelId: "034449b176b163a705b9c0e81f7a51c2" },
      { name: "트롤야", avatar: TrollYa, channelId: "826f57d3283418e1fa39dfb23dc1dea8" },
      { name: "피닉스박", avatar: PhoenixPark, channelId: "c100f81959d1c17044be0541eed56f5b" },
      { name: "헤징", avatar: Hejing, channelId: "21a0de8b586c517181d76f183272de57" },
    ],
  },
  {
    line: "AD",
    icon: iconAd,
    members: [
      { name: "강퀴", avatar: KangQui, channelId: "1a1dd9ce56fb61a37ffb6f69f6d5b978" },
      { name: "눈꽃", avatar: NoonKkot, channelId: "343fc0e877aa8ca0cad5106b33d6fa95" },
      { name: "따효니", avatar: DdaHyoni, channelId: "0dad8baf12a436f722faa8e5001c5011" },
      { name: "러너", avatar: Runner, channelId: "19e3b97ca1bca954d1ac84cf6862e0dc" },
      { name: "마소킴", avatar: MasoKim, channelId: "9645f66e84d5ee4e5607d453996caf2f" },
      { name: "플러리", avatar: Flurry, channelId: "fe558c6d1b8ef3206ac0bc0419f3f564" },
    ],
  },
  {
    line: "SUPPORT",
    icon: iconSupport,
    members: [
      { name: "고수달", avatar: GoSuDal, channelId: "1343a0e30ff0acb09f2477a698d070a4" },
      { name: "라콩", avatar: Racong, channelId: "92a5abf107df36873121c9cf6561380f" },
      { name: "매드라이프", avatar: MadLife, channelId: "371f95608d4571bdac607270e8b955c3" },
      { name: "이희태", avatar: HeeTae, channelId: "6b1ff70103e31e1ac39bc9e0e4d6b576" },
      { name: "캡틴잭", avatar: CaptainJack, channelId: "74f9f433dd8866bf69f6c930a64d06a8" },
      { name: "크캣", avatar: CrazyCat, channelId: "b628d1039a84ecc703804e17acee2eb3" },
    ],
  },
];
