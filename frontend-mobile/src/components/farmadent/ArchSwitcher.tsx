"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * TEMPORARY — lets you compare Option A (routed pages) against Option B
 * (single scrolling page) side by side while deciding which one to keep.
 * Remove this component and pick one architecture once that decision is
 * made; see README.md → "Choosing between Option A and Option B".
 */
export default function ArchSwitcher() {
  const pathname = usePathname();
  const isSinglePage = pathname.startsWith("/jedna-strana");

  return (
    <div
      role="group"
      aria-label="Privremeni izbor arhitekture — ukloniti pre lansiranja"
      className="fixed right-3 top-20 z-50 flex flex-col gap-1 rounded-full border border-divider bg-bg/90 p-1 text-[11px] font-semibold shadow-md backdrop-blur-sm"
    >
      <Link
        href="/"
        title="Opcija A — rute po sekciji"
        className={`rounded-full px-2.5 py-1.5 ${!isSinglePage ? "bg-accent text-bg" : "text-text opacity-60"}`}
      >
        A
      </Link>
      <Link
        href="/jedna-strana"
        title="Opcija B — jedna strana"
        className={`rounded-full px-2.5 py-1.5 ${isSinglePage ? "bg-accent text-bg" : "text-text opacity-60"}`}
      >
        B
      </Link>
    </div>
  );
}
