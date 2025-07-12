import dayjs from "@/lib/dayjs";
import durationPlugin from "dayjs/plugin/duration";

dayjs.extend(durationPlugin);

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * targetDate 까지 남은 시간을 {일/시/분/초}로 반환
 * @param targetDate 예시: "2025-07-12T18:00:00+09:00"
 */
export function getTimeLeft(targetDate: string): TimeLeft {
  const now = dayjs();
  const target = dayjs(targetDate);
  const diffMs = target.diff(now);
  const d = dayjs.duration(Math.max(diffMs, 0));

  return {
    days: d.days(),
    hours: d.hours(),
    minutes: d.minutes(),
    seconds: d.seconds(),
  };
}

/**
 * D-Day 텍스트를 반환.
 * 당일(오늘)이면 "D-DAY", 이후면 "D-3" 형태.

 */
export function getDDay(targetDate: string): string {
  const ZONE = "Asia/Seoul";

  const today = dayjs().tz(ZONE).startOf("day");
  const target = dayjs(targetDate).tz(ZONE).startOf("day");

  const diff = target.diff(today, "day");
  return diff <= 0 ? "D-DAY" : `D-${diff}`;
}
