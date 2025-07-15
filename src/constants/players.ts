import { LolLine, Player, Slot, Team } from "@/types/draft";
import { StreamerInfos } from "./streamers";

export const LOL_LINES: LolLine[] = ["TOP", "JG", "MID", "AD", "SUP"];

// 선수 풀
export const PLAYERS: Player[] = StreamerInfos.flatMap(({ line, members }) =>
  members.map((m) => ({
    id: m.channelId,
    name: m.name,
    avatar: m.avatar,
    line,
    cost: line === "JG" ? 0 : 100,
  })),
);

// 초기 팀 6개
const empty = (line: LolLine): Slot => ({ line });

const makeTeam = (id: string, junglerName: string, budget: number): Team => {
  const jungler = PLAYERS.find((p) => p.name === junglerName)!;
  return {
    id,
    name: `${junglerName} 팀`,
    budget,
    points: jungler.cost,
    slots: {
      TOP: empty("TOP"),
      JG: { line: "JG", player: jungler },
      MID: empty("MID"),
      AD: empty("AD"),
      SUP: empty("SUP"),
    },
  };
};

export const INITIAL_TEAMS: Team[] = [
  makeTeam("team-gangmam", "갱맘", 600),
  makeTeam("team-souruup", "소우릎", 800),
  makeTeam("team-ambition", "엠비션", 600),
  makeTeam("team-insec", "인섹", 700),
  makeTeam("team-cuvee", "큐베", 800),
  makeTeam("team-flame", "플레임", 1000),
];

/**
 * Google-Sheet 에서 내려오는 playerId → playerName
 */
export const PLAYER_NAME_BY_ID: Record<string, string> = {
  "토니토니 던파": "던",
  룩우스: "룩삼",
  맛수령: "맛수령",
  모든챔프의신: "승우아빠",
  DTX치킨쿤보해: "치킨쿤",
  "구멍 메꾼 푸린": "푸린",
  "연어먹는 미어캣": "갱맘",
  gompangping: "소우릎",
  폭삭늙음: "엠비션",
  inSec: "인섹",
  "큐 베": "큐베",
  Goldtec: "플레임",
  코리아: "노페",
  네클릿: "네클릿",
  젤상혁: "인간젤리",
  "이 얍": "트롤야",
  피닉스박: "피닉스박",
  산업스파이의배신: "헤징",
  "중년 컴플렉스": "강퀴",
  "구멍 메꾼 눈꽃": "눈꽃",
  따효니: "따효니",
  "러너가 이길게": "러너",
  마소킴: "마소킴",
  겨라도스: "플러리",
  "수달 잘쏜데이": "고수달",
  개쩌는서포터: "라콩",
  에겐남: "매드라이프",
  이희태: "이희태",
  "I have a candy": "캡틴잭",
  CrazyCat: "크캣",
};
