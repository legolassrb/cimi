import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Statistics / About" },
  { href: "/book", label: "Book Appointment" },
  { href: "/login", label: "Login" },
  { href: "/account", label: "My Account" },
];

export default function PublicNav() {
  return (
    <nav className="border-b border-neutral-200 px-6 py-4">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2">
        <span className="font-semibold">Dentist Office</span>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-neutral-900">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/admin" className="ml-auto text-sm text-neutral-400 hover:text-neutral-900">
          Admin →
        </Link>
      </div>
    </nav>
  );
}
