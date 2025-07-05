"use client";

import { useSidebar } from "@/contexts";
import Link from "next/link";

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="flex items-center fixed top-0 left-0 right-0 h-[60px] px-4 bg-dark text-white z-header">
      <button className="mr-4 text-[22px] cursor-pointer" onClick={toggle}>
        ☰
      </button>
      <Link href="/" className="font-bold text-xl tracking-tight cursor-pointer">
        자낳대 LOG
      </Link>
    </header>
  );
}
