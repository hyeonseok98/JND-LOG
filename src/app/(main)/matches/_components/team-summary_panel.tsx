"use client";

import Skeleton from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeamSummaryAll } from "@/hooks/use-team";
import cn from "@/lib";

const COLUMNS = [
  { w: "w-40", label: "팀", align: "text-left" },
  { w: "w-24", label: "경기", align: "text-right" },
  { w: "w-24", label: "승", align: "text-right" },
  { w: "w-24", label: "승률", align: "text-right" },
] as const;

export default function TeamSummaryPanel() {
  const { data, isLoading } = useTeamSummaryAll();
  if (isLoading) return <Skeleton rows={2} />;

  return (
    <Tabs defaultValue="공식스크림" className="w-full">
      <TabsList className="mb-4 bg-muted/20">
        <TabsTrigger value="공식스크림" className="cursor-pointer">
          공식 스크림
        </TabsTrigger>
        <TabsTrigger value="비공식스크림" className="cursor-pointer">
          비공식 스크림
        </TabsTrigger>
      </TabsList>

      {(["공식스크림", "비공식스크림"] as const).map((type) => (
        <TabsContent key={type} value={type}>
          <div className="grid grid-flow-col gap-x-4 border-b border-muted/30 pb-1 text-sm text-gray-300">
            {COLUMNS.map((c) => (
              <span key={c.label} className={cn(c.w, c.align)}>
                {c.label}
              </span>
            ))}
          </div>

          <div className="divide-y divide-muted/20 pt-2">
            {data!
              .filter((r) => r.type === type)
              .map((r) => (
                <div key={r.team} className="grid grid-flow-col gap-x-4 py-1 text-sm text-gray-200">
                  <span className={cn(COLUMNS[0].w)}>{r.team}</span>
                  <span className={cn(COLUMNS[1].w, "text-right")}>{r.games}</span>
                  <span className={cn(COLUMNS[2].w, "text-right")}>{r.wins}</span>
                  <span className={cn(COLUMNS[3].w, "text-right")}>{r.winRate.toFixed(1)}%</span>
                </div>
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
