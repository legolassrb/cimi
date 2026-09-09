import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder";

/**
 * Every photograph in the app goes through this — either a real image
 * (once the practice supplies one, wired via `src`) always wrapped in the
 * required `.washed` treatment, or a labelled placeholder block. Never a
 * stock photo. See mvp brief §1 "Images".
 */
export default function Photo({
  src,
  alt,
  width,
  height,
  label,
  expectedPath,
  className = "",
  bleed = false,
  priority = false,
}: {
  src?: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  expectedPath: string;
  className?: string;
  /** The hero/"Prostor" signature treatment: bleeds off the right edge. */
  bleed?: boolean;
  priority?: boolean;
}) {
  // Signature asymmetry (mvp brief §2): flush square corner on the left,
  // where the photo meets the flush-left text column, rounded corners on
  // the right, where it bleeds into the whitespace and stops 34px short
  // of the true edge. Callers must wrap this in a `-mr-5` element to
  // cancel the page's own px-5 padding so "stops 34px short" is measured
  // from the real viewport edge, not the content column.
  const shape = bleed ? "rounded-r-[28px] mr-[34px]" : "rounded-[24px]";

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`washed ${shape} ${className}`}
      />
    );
  }

  return (
    <ImagePlaceholder
      label={label}
      expectedPath={expectedPath}
      className={`${shape} w-full ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}
