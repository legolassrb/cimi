import Link from "next/link";

// Routes that don't earn a spot in the 5-item bottom tab bar but still need
// to be reachable somewhere.
const secondaryLinks = [
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Login" },
];

export default function TopBar() {
  return (
    <header className="safe-top border-b border-neutral-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Dentist Office</span>
        <div className="flex gap-3 text-xs text-neutral-500">
          {secondaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="active:text-neutral-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
