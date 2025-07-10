"use client";

interface ScheduleProps {
  date: string;
  title: string;
}

const SCHEDULES: ScheduleProps[] = [
  { date: "7/12", title: "경매" },
  { date: "7/13 ~ 7/15", title: "공개 스크림" },
  { date: "7/16", title: "조별리그" },
  { date: "7/17", title: "시드 결정전" },
  { date: "7/19", title: "플레이오프" },
];

export default function Timeline() {
  return (
    <div className="relative w-[800px] max-w-5xl mx-auto pt-8 ">
      <div className="absolute top-[40px] left-[2px] right-0 w-[780px] h-px bg-white" />

      <div className="flex justify-between w-full">
        {SCHEDULES.map(({ date, title }, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white z-5"></div>

            <div className="mt-2 font-tight text-xs text-white">{date}</div>
            <div className="mt-1 text-xs text-white leading-tight whitespace-nowrap">{title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
