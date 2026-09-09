"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { practice } from "@/content/config";
import { useDictionary, useLanguage } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";

export function LangSwitch() {
  const { toggle } = useLanguage();
  const dict = useDictionary();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dict.common.langSwitch === "EN" ? "Switch to English" : "Prebaci na srpski"}
      className="flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-divider px-3 text-[13px] font-semibold text-text transition-colors hover:bg-surface"
    >
      <Languages strokeWidth={2.75} className="h-4 w-4" aria-hidden="true" />
      {dict.common.langSwitch}
    </button>
  );
}

/** Logo + language switch — present at the top of every page. */
export function TopHeader() {
  return (
    <header className="safe-top flex items-center justify-between px-5 py-4">
      <Link href="/" className="leading-tight">
        <div className="text-lg font-semibold text-text" style={{ fontFamily: "var(--font-heading)" }}>
          {practice.name}
        </div>
        <div className="text-[11px] uppercase tracking-[0.08em] text-text opacity-50">Prijepolje</div>
      </Link>
      <LangSwitch />
    </header>
  );
}

/** Option A: a horizontally scrolling row of route links, active route
 * filled in the accent colour. 44px+ tall targets even though the chips
 * read visually compact, per the a11y touch-target requirement. */
export function RouteChips({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const items: { href: string; label: string }[] = [
    { href: "/", label: dict.nav.home },
    { href: "/oblasti", label: dict.nav.oblasti },
    { href: "/tim", label: dict.nav.tim },
    { href: "/prostor", label: dict.nav.prostor },
    { href: "/cene", label: dict.nav.cene },
    { href: "/iskustva", label: dict.nav.iskustva },
    { href: "/prvi-dolazak", label: dict.nav.prviDolazak },
    { href: "/kontakt", label: dict.nav.kontakt },
  ];

  return (
    <nav
      aria-label={dict.lang === "sr" ? "Glavna navigacija" : "Main navigation"}
      className="scrollbar-none flex gap-2 overflow-x-auto px-5 pb-3 [-webkit-overflow-scrolling:touch]"
    >
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex h-11 shrink-0 items-center rounded-full px-4 text-[13px] font-semibold transition-colors ${
              active ? "bg-accent text-bg" : "border border-divider text-text opacity-70 hover:opacity-100"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
