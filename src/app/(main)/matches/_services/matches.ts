import { getMatches, getPlayersRaw } from "@/apis/matches";
import type { MatchRow } from "@/types/lol/matches";
import { groupBy } from "@/util/group-by";
import dayjs from "dayjs";

export type MatchWithPlayers = MatchRow & {
  bluePlayers: string;
  redPlayers: string;

  // 내전이면 “BLUE” | "RED", 스크림이면 팀명
  headerBlue: string;
  headerRed: string;
};

/* ───────── 시트-serial → 날짜 문자열 ─────────
   구글시트 기준 0 일자는 1899-12-30 */
function serialToDateString(serial: number) {
  return dayjs("1899-12-30").add(serial, "day").format("YYYY-MM-DD");
}

export async function fetchMatchesByDate(): Promise<[string, MatchWithPlayers[]][]> {
  const [matches, players] = await Promise.all([getMatches(), getPlayersRaw()]);

  /* matchId → 선수[] */
  const playerMap = groupBy(players, (p) => p.matchId);

  const extended: MatchWithPlayers[] = matches.map((m) => {
    /* 날짜 보정: number ⇒ serial, string ⇒ 그대로 */
    const dateStr = typeof m.date === "number" ? serialToDateString(m.date) : (m.date as string | undefined) ?? ""; // 빈칸이면 뒤에서 필터링

    const roster = playerMap[m.matchId] ?? [];

    const bluePlayers = roster
      .filter((p) => p.side === "BLUE")
      .map((p) => p.playerName)
      .join(", ");

    const redPlayers = roster
      .filter((p) => p.side === "RED")
      .map((p) => p.playerName)
      .join(", ");

    const isScrim = m.type !== "내전";
    const headerBlue = isScrim ? m.blueTeam : "BLUE";
    const headerRed = isScrim ? m.redTeam : "RED";

    return {
      ...m,
      date: dateStr,
      bluePlayers,
      redPlayers,
      headerBlue,
      headerRed,
    };
  });

  /**
   * 날짜 없는 행 제거 → 그룹핑 → 최신일자로 정렬
   */
  return Object.entries(
    groupBy(
      extended.filter((m) => m.date !== ""), // ← 빈 날짜 제거
      (m) => m.date as string,
    ),
  )
    .sort(([d1], [d2]) => dayjs(d2).valueOf() - dayjs(d1).valueOf()) // 그룹 정렬
    .map<[string, MatchWithPlayers[]]>(([date, list]) => [
      date,
      list.sort(
        (
          a,
          b, // 같은 날 안에서 최신순
        ) => dayjs(b.date + " " + b.matchId).valueOf() - dayjs(a.date + " " + a.matchId).valueOf(),
      ),
    ]);
}
