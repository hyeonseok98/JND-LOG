"use client";

import cn from "@/lib";

interface SkeletonProps {
  rows?: number;
  className?: string;
}

export default function Skeleton({ rows = 4, className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-2", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-[22px] rounded bg-muted/40" />
      ))}
    </div>
  );
}
