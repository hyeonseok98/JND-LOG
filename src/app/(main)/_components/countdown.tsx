"use client";

import { getTimeLeft, TimeLeft } from "@/util/countdown";
import { useEffect, useState } from "react";

const TARGET = "2025-07-12T18:00:00+09:00";

export default function Countdown() {
  const [left, setLeft] = useState<TimeLeft>(() => getTimeLeft(TARGET));

  useEffect(() => {
    setLeft(getTimeLeft(TARGET));
    const id = setInterval(() => setLeft(getTimeLeft(TARGET)), 1000);
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
      <p className="mt-2 text-sm text-gray-300 tracking-wide">자낳대 경매일&nbsp;:&nbsp;2025-07-12(토)&nbsp;18:00</p>
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
