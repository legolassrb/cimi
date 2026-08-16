import Image from "next/image";
import Link from "next/link";
import { BellIcon } from "./icons";

// Note: /team, /about, /login (still real routes) don't have a slot in
// this header design — the mock only shows logo + notification bell.
// They're reachable by direct URL for now; give them a home (e.g. inside
// the account page, or a future "more" menu) before this ships for real.
export default function TopBar() {
  return (
    <header className="safe-top flex items-center justify-between border-b border-neutral-100 px-4 py-3">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/tooth-icon.png" alt="" width={228} height={244} className="h-8 w-8 object-contain" />
        <div className="leading-tight">
          <div className="text-sm font-extrabold tracking-wide text-navy">BRIGHT SMILE</div>
          <div className="text-[10px] font-semibold tracking-widest text-neutral-400">
            СТОМАТОЛОШКА КЛИНИКА
          </div>
        </div>
      </Link>

      {/* Placeholder — no notifications system yet. No real asset for this
          one, so it stays a hand-drawn icon (see icons.tsx). */}
      <span className="text-navy">
        <BellIcon className="h-6 w-6" />
      </span>
    </header>
  );
}
