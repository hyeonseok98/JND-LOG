"use client";

import { useAuction } from "@/store/auction";
import { useEffect } from "react";

// 페이지 진입 시 경매 start
export default function StartAuction() {
  const start = useAuction((s) => s.start);
  useEffect(() => start(), [start]);
  return null;
}
