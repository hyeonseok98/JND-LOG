"use client";

import { DataTable } from "@/components/data-table";
import { useMatches } from "@/hooks/use-matches";
import { MatchRow } from "@/types/lol/matches";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

interface Props {
  initialData: MatchRow[];
}

export default function MatchTable({ initialData }: Props) {
  const { data, isFetching } = useMatches(initialData);
  const rows = data ?? [];

  /* --- 컬럼 정의 --- */
  const columns: ColumnDef<MatchRow>[] = useMemo(
    () => [
      { header: "날짜", accessorKey: "date" },
      { header: "Match ID", accessorKey: "matchId" },
      { header: "BLUE", accessorKey: "blueTeam" },
      { header: "RED", accessorKey: "redTeam" },
      { header: "승리", accessorKey: "winner" },
      {
        header: "길이(분)",
        accessorFn: (r) => (r.durationSec / 60).toFixed(1),
      },
      { header: "분류", accessorKey: "type" },
    ],
    [],
  );

  return (
    <section className="rounded-md border p-4">
      {isFetching && <p className="mb-2 text-sm">🔄 새로고침 중…</p>}
      <DataTable data={rows} columns={columns} />
    </section>
  );
}
