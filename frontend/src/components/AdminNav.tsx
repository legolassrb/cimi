import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/doctors", label: "Doctors" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/availability", label: "Availability" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/audit-log", label: "Audit Log" },
];

export default function AdminNav() {
  return (
    <aside className="w-56 shrink-0 border-r border-neutral-200 p-6">
      <div className="mb-6 font-semibold">Admin</div>
      <nav className="flex flex-col gap-2 text-sm text-neutral-600">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-neutral-900">
            {link.label}
          </Link>
        ))}
      </nav>
      <Link href="/" className="mt-8 block text-sm text-neutral-400 hover:text-neutral-900">
        ← Back to site
      </Link>
    </aside>
  );
}
