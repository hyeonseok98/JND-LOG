"use client";

import { TARGET_TIME } from "@/constants/countdown";
import { getTimeLeft, TimeLeft } from "@/util/countdown";
import { useEffect, useState } from "react";

export default function Countdown() {
  // 서버와 클라 모두 동일한 값(0)으로 시작 → 문자열 불일치 방지
  const [left, setLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 마운트 후에만 실제 남은 시간 계산
  useEffect(() => {
    const update = () => setLeft(getTimeLeft(TARGET_TIME));
    update(); // 첫 값 즉시 채우기
    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-white select-none">
      <div className="flex gap-8 px-8 py-8 rounded border border-white/10 bg-black/10 backdrop-blur-sm">
        <Block label="DAYS" value={pad(left.days)} />
        <Divider />
        <Block label="HOURS" value={pad(left.hours)} />
        <Divider />
        <Block label="MINUTES" value={pad(left.minutes)} />
        <Divider />
        <Block label="SECONDS" value={pad(left.seconds)} />
      </div>

      <p className="mt-2 text-sm text-gray-300 tracking-wide">
        3팀 2조 풀리그(예선)&nbsp;:&nbsp;2025-07-16(수)&nbsp;18:00
      </p>
    </div>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-6xl font-semibold tabular-nums">{value}</span>
      <span className="mt-1 text-xs tracking-widest text-gray-300">{label}</span>
    </div>
  );
}

const Divider = () => <span className="h-14 w-px bg-white/20" />;
