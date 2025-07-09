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
    cost: 100,
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
  makeTeam("team-gangmam", "갱맘", 1000),
  makeTeam("team-souruup", "소우릎", 1000),
  makeTeam("team-ambition", "엠비션", 1000),
  makeTeam("team-insec", "인섹", 1000),
  makeTeam("team-cuvee", "큐베", 1000),
  makeTeam("team-flame", "플레임", 1000),
];
