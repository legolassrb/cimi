/** Small hand-drawn line icons — used only where there's no matching asset
 * in public/icons/ (real dental-service icons from frontend/photos/icons/,
 * used directly via next/image wherever one fits). All accept a
 * `className` so color comes from Tailwind's `text-*` (via `currentColor`)
 * and size from `h-*`/`w-*`.
 *
 * Sizing is uniform on purpose — real icons and these SVG fallbacks share
 * one size per context, so nothing looks mismatched sitting next to a
 * real icon:
 *   - CONTENT_ICON_SIZE: feature row + services grid
 *   - NAV_ICON_SIZE: bottom tab bar */
export const CONTENT_ICON_SIZE = "h-7 w-7";
export const NAV_ICON_SIZE = "h-3 w-3";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BellIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3a5 5 0 0 0-5 5v3.1c0 .5-.2 1-.5 1.4L5 15h14l-1.5-2.5c-.3-.4-.5-.9-.5-1.4V8a5 5 0 0 0-5-5z" />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 20.5c-4.5-3-9-6.7-9-11A5 5 0 0 1 12 6a5 5 0 0 1 9 3.5c0 4.3-4.5 8-9 11z" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

export function GalleryIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="M3 16l5-4 4 3 3-2 6 5" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-4 4.5-6 7-6s5.5 2 7 6" />
    </svg>
  );
}

export function ImagePlaceholderIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="9" r="1.5" />
      <path d="M4 17l5-5 4 4 3-3 4 4" />
    </svg>
  );
}
