import Image from "next/image";
import Link from "next/link";
import { HomeIcon, CalendarIcon, GalleryIcon, UserIcon, NAV_ICON_SIZE } from "./icons";

// "Заказивање" (Book) stays permanently elevated/highlighted as the
// primary action, matching the design comp — this is a persistent
// booking shortcut, not a current-route indicator, so it doesn't need
// client-side route matching.
//
// Every tab carries both `Icon` and `image` (one of them null) so the
// array has one uniform shape — avoids TS narrowing a union type down to
// "whichever tab happened to define which field."  "Услуге" is the only
// tab with a matching real asset (public/icons/tooth-icon.png); the rest
// fall back to the hand-drawn icons, all rendered at the same
// NAV_ICON_SIZE so nothing looks mismatched.
const tabs = [
  { href: "/", label: "Почетна", Icon: HomeIcon, image: null, primary: false },
  { href: "/services", label: "Услуге", Icon: null, image: "/icons/tooth-icon.png", primary: false },
  { href: "/book", label: "Заказивање", Icon: CalendarIcon, image: null, primary: true },
  { href: "/gallery", label: "Галерија", Icon: GalleryIcon, image: null, primary: false },
  { href: "/account", label: "Профил", Icon: UserIcon, image: null, primary: false },
] as const;

function TabIcon({
  Icon,
  image,
  className,
}: {
  Icon: (props: { className?: string }) => React.JSX.Element;
  image: string | null;
  className: string;
}) {
  if (image) {
    return <Image src={image} alt="" width={64} height={64} className={`${className} object-contain`} />;
  }
  return <Icon className={className} />;
}

export default function BottomNav() {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 bg-brand">
      <div className="flex items-end justify-between px-1">
        {tabs.map(({ href, label, Icon, image, primary }) =>
          primary ? (
            <Link key={href} href={href} className="flex flex-1 flex-col items-center">
              <span className="-mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-brand">
                <TabIcon Icon={Icon ?? CalendarIcon} image={image} className={`${NAV_ICON_SIZE} text-brand`} />
              </span>
              <span className="mb-1.5 mt-1 text-[10px] font-medium text-white">{label}</span>
            </Link>
          ) : (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-1 pb-2 pt-2 text-white/80"
            >
              <TabIcon Icon={Icon ?? HomeIcon} image={image} className={NAV_ICON_SIZE} />
              <span className="text-[10px]">{label}</span>
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}
