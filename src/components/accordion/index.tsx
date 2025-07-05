"use client";

import cn from "@/lib/tailwind-cn";
import { PropsWithChildren, ReactNode, useState } from "react";

interface AccordionProps extends PropsWithChildren {
  title: ReactNode;
  isOpened?: boolean;
}

export default function Accordion({ title, isOpened = true, children }: AccordionProps) {
  const [open, setOpen] = useState(isOpened);

  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-2 hover:bg-white/5">
        {title}
        <span className="text-xs">{open ? "▼" : "▶"}</span>
      </button>

      <div className={cn("transition-all", open ? "max-h-96" : "max-h-0 overflow-hidden")}>
        {open && <div className="py-1">{children}</div>}
      </div>
    </div>
  );
}
