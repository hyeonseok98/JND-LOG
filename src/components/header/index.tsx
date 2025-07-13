"use client";

import { useSidebar } from "@/contexts";
import { useScrolled } from "@/hooks/use-scrolled";
import cn from "@/lib";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LISTS = [
  { href: "/", label: "홈" },
  { href: "/draft", label: "경매" },
  { href: "/mock-draft", label: "모의경매" },
  { href: "/matches", label: "경기기록" },
  { href: "/news", label: "소식" },
];

export default function Header() {
  const { toggle } = useSidebar();
  const pathname = usePathname();
  const scrolled = useScrolled(24);

  return (
    <header
      className={clsx(
        "flex items-center fixed inset-x-0 top-0 h-[64px] px-6 border-b z-header",
        "transition-[background-color,backdrop-filter] duration-200",

        scrolled ? "bg-white/10 backdrop-blur-md border-white/15" : "bg-dark text-white border-gray-500",
      )}
    >
      <button className={cn("mr-4 text-[22px] cursor-pointer", "hidden md:block")} onClick={toggle}>
        ☰
      </button>
      <Link href="/">
        <h1 className="font-bold text-xl tracking-tight cursor-pointe whitespace-nowrap">자낳대 LOG</h1>
      </Link>

      <nav className="ml-auto mr-20 flex gap-x-8 font-medium">
        {NAV_LISTS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "hover:underline transition whitespace-nowrap",
              pathname === href && "text-blue-300 font-bold",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
