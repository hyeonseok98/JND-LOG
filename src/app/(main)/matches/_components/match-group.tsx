"use client";

import { Accordion } from "@/components/ui/accordion";
import { MatchRow } from "@/types/lol/matches";
import dayjs from "dayjs";
import MatchAccordion from "./match-accordion";

interface Props {
  date: string;
  matches: MatchRow[];
}

export default function MatchGroup({ date, matches }: Props) {
  return (
    <section>
      <h2 className="mb-1 text-lg font-semibold">{dayjs(date).format("M월 D일 ddd")}</h2>

      <Accordion type="multiple" className="space-y-2">
        {matches.map((m) => (
          <MatchAccordion key={m.matchId} match={m} />
        ))}
      </Accordion>
    </section>
  );
}
