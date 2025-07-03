"use client";

import { useSidebar } from "@/contexts";

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="flex items-center fixed top-0 left-0 right-0 h-[60px] px-4 bg-[#111] text-white z-50">
      <button className="mr-4 text-2xl" onClick={toggle}>
        ☰
      </button>
      <span className="font-bold text-xl tracking-tight">자낳대 LOG</span>
    </header>
  );
}
