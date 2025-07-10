"use client";

import { useAuction } from "@/store/auction";
import { useEffect, useRef } from "react";

export default function AuctionLog({ className = "" }: { className?: string }) {
  const log = useAuction((s) => s.log);
  const box = useRef<HTMLDivElement>(null);

  /* 새 로그가 생기면 맨 아래로 */
  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [log]);

  return (
    <div ref={box} className={`p-4 space-y-1 text-xs ${className}`}>
      <h3 className="pb-2 text-sm font-semibold text-blue-200 border-b border-gray-500">경매 로그</h3>
      <hr className="border-gray-500" />

      {log.map((l, i) =>
        l.hr ? (
          <hr key={i} className="border-gray-500 my-2" />
        ) : (
          <p key={i} dangerouslySetInnerHTML={{ __html: l.text }} />
        ),
      )}
    </div>
  );
}
