import type { CSSProperties } from "react";
import { ImagePlaceholderIcon } from "./icons";

/**
 * Stand-in for a real photo. Drop the actual file into `public/` at the
 * path shown, then swap the call site over to `next/image` (or the shared
 * `Photo` component in components/farmadent, which does this swap for you
 * once `src` is passed) — see components/farmadent/Photo.tsx.
 */
export default function ImagePlaceholder({
  label,
  expectedPath,
  className,
  style,
}: {
  label: string;
  expectedPath: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 border-2 border-dashed border-neutral-300 bg-neutral-100 text-neutral-400 ${className ?? ""}`}
      style={style}
    >
      <ImagePlaceholderIcon className="h-6 w-6" />
      <span className="text-xs">{label}</span>
      <span className="font-mono text-[10px]">{expectedPath}</span>
    </div>
  );
}
