"use client";

import { usePlayers } from "@/hooks/use-players";
import { PlayerRow } from "@/types/lol/players";
import { formatNumber } from "@/util/number";

export default function PlayersTable() {
  const { data: players = [], isLoading } = usePlayers();

  if (isLoading) return <p className="p-4">로딩 중…</p>;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Players Stats</h1>

      <div className="overflow-x-auto rounded-md border text-white">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {["playerName", "KDA", "KP(%)", "DPM", "DMG%(%)", "GPM", "GOLD%(%)", "type"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {players.map((p: PlayerRow) => (
              <tr key={`${p.playerId}-${p.matchId}`} className="border-b last:border-b-0">
                <td>{p.playerName}</td>
                <td>{formatNumber(p.KDA, 2)}</td>
                <td>{formatNumber(p.KP, 1)}%</td>
                <td>{formatNumber(p.DPM)}</td>
                <td>{formatNumber(p.DMGpct, 1)}%</td>
                <td>{formatNumber(p.GPM)}</td>
                <td>{formatNumber(p.GOLDpct, 1)}%</td>
                <td>{p.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
