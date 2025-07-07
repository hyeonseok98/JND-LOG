"use client";

import { useSidebar } from "@/contexts";
import { useScrolled } from "@/hooks/use-scrolled";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LISTS = [
  { href: "/", label: "홈" },
  { href: "/auction", label: "경매" },
  { href: "/matches", label: "경기기록" },
  { href: "/update", label: "업데이트" },
];

export default function Header() {
  const { toggle } = useSidebar();
  const pathname = usePathname();
  const scrolled = useScrolled(24);

  return (
    <header
      className={clsx(
        "flex items-center fixed inset-x-0 top-0 h-[60px] px-6 z-header",
        "transition-[background-color,backdrop-filter] duration-200",

        scrolled ? "bg-white/10 backdrop-blur-md border-b border-white/15" : "bg-dark text-white", // or bg-dark
      )}
    >
      <button className="mr-4 text-[22px] cursor-pointer" onClick={toggle}>
        ☰
      </button>
      <Link href="/" className="font-bold text-xl tracking-tight cursor-pointer">
        자낳대 LOG
      </Link>

      <nav className="ml-auto mr-12 flex gap-x-7 text-sm font-medium">
        {NAV_LISTS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx("hover:underline transition", pathname === href && "text-blue-300 font-bold")}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
