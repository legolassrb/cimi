import Link from "next/link";

// Five items max — a bottom tab bar that grows past ~5 stops being thumbable.
// Everything else (About, Login) is reachable from Home for now.
const tabs = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book" },
  { href: "/gallery", label: "Gallery" },
  { href: "/account", label: "Account" },
];

export default function BottomNav() {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 border-t border-neutral-200 bg-white">
      <div className="flex">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 py-3 text-center text-xs text-neutral-600 active:text-neutral-900"
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
