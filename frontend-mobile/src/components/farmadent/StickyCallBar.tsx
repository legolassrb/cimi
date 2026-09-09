"use client";

import { Phone, MessageCircle } from "lucide-react";
import { practice, phoneHref, whatsappHref } from "@/content/config";
import { useDictionary } from "@/lib/i18n";
import { useStickyBarLabel } from "@/lib/sticky-bar";

/**
 * The only two actions on this site: call, or WhatsApp. Present on every
 * page (mounted once in the root layout), sits above `pb-*` spacers so it
 * never covers page content. Label reads "Pozovi <broj>" by default, or
 * "Pitaj za <tretman>" while a treatment detail view is on screen — see
 * lib/sticky-bar.tsx. The tel: link itself never changes.
 */
export default function StickyCallBar() {
  const dict = useDictionary();
  const overrideLabel = useStickyBarLabel();
  const label = overrideLabel ?? `${dict.common.call} ${practice.phoneDisplay}`;

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-divider bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[520px] items-center gap-3 px-4 py-3">
        <a
          href={phoneHref}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-semibold text-bg transition-colors hover:bg-accent-600 active:bg-accent-700"
        >
          <Phone strokeWidth={2.75} className="h-5 w-5" aria-hidden="true" />
          {label}
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.common.whatsapp}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-divider text-text transition-colors hover:bg-surface"
        >
          <MessageCircle strokeWidth={2.75} className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
