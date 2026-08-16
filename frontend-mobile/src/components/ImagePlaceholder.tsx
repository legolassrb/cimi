import { ImagePlaceholderIcon } from "./icons";

/**
 * Stand-in for a real photo. Drop the actual file into `public/` (same
 * place as `cimika.png`) at the path shown, then swap this out for a
 * `next/image` pointed at it — see frontend-mobile/src/app/page.tsx.
 */
export default function ImagePlaceholder({
  label,
  expectedPath,
  className,
}: {
  label: string;
  expectedPath: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 border-2 border-dashed border-neutral-300 bg-neutral-100 text-neutral-400 ${className ?? ""}`}
    >
      <ImagePlaceholderIcon className="h-6 w-6" />
      <span className="text-xs">{label}</span>
      <span className="font-mono text-[10px]">{expectedPath}</span>
    </div>
  );
}
