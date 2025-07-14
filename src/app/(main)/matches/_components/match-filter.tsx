"use client";

import { useMatchStore } from "@/store/match";

const MATCH_TYPES = ["전체", "내전", "공식스크림", "비공식스크림"] as const;

export default function MatchFilter() {
  const { type, setType } = useMatchStore();

  return (
    <div className="flex flex-wrap gap-2">
      {MATCH_TYPES.map((t) => (
        <button
          key={t}
          onClick={() => setType(t)}
          className={`rounded-md px-3 py-1.5 text-sm
            ${type === t ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
