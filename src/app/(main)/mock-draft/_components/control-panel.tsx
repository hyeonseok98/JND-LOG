"use client";

import { TEAM_COLORS } from "@/constants/palette";
import cn from "@/lib";
import { useAuction } from "@/store/auction";
import { useMockDraft } from "@/store/mock-draft";
import { useEffect, useState } from "react";

export default function ControlPanel() {
  const auction = useAuction();
  const teams = useMockDraft((s) => s.teams);

  const [teamId, setTeamId] = useState(auction.selectedTeamId);
  const [amt, setAmt] = useState(0);

  useEffect(() => setAmt(0), [auction.current?.id]);
  useEffect(() => setTeamId(auction.selectedTeamId), [auction.selectedTeamId]);

  const plus = (v: number) => setAmt((a) => Math.max(0, a + v - ((a + v) % 5)));

  const Act = ({ onClick, children, color }: { onClick: () => void; children: string; color: string }) => (
    <button onClick={onClick} className={`py-2 rounded text-sm cursor-pointer ${color}`}>
      {children}
    </button>
  );

  return (
    <div className="p-4 space-y-3 border-t border-zinc-700">
      <div className="flex flex-wrap justify-center gap-2">
        {teams.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setTeamId(t.id)}
            className={cn(
              "px-3 py-1.5 rounded text-xs font-semibold cursor-pointer",
              teamId === t.id ? "ring-2 ring-amber-400" : "bg-zinc-700 hover:bg-zinc-600",
            )}
            style={{ color: TEAM_COLORS[idx % TEAM_COLORS.length] }}
          >
            {t.name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* 금액 입력 */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        <input
          type="number"
          value={amt}
          min={0}
          step={5}
          onChange={(e) => setAmt(parseInt(e.target.value))}
          className="w-24 bg-zinc-800 rounded px-2 py-1 text-right"
        />
        {[5, 10, 50, 100].map((n) => (
          <button key={n} onClick={() => plus(n)} className="px-2 py-1 bg-zinc-700 rounded text-xs cursor-pointer">
            +{n}
          </button>
        ))}
        <button
          onClick={() => auction.placeBid(teamId, amt)}
          className="px-4 py-1 rounded bg-sky-600 hover:bg-sky-500 cursor-pointer"
        >
          입찰
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Act onClick={auction.shuffleLeft} color="bg-zinc-700 hover:bg-zinc-600">
          순서 섞기
        </Act>
        <Act onClick={auction.resetAll} color="bg-zinc-700 hover:bg-zinc-600">
          경매리셋
        </Act>
        <Act onClick={auction.award} color="bg-emerald-600 hover:bg-emerald-500">
          낙찰
        </Act>
        <Act onClick={auction.pass} color="bg-red-600 hover:bg-red-500">
          유찰
        </Act>
      </div>
    </div>
  );
}
