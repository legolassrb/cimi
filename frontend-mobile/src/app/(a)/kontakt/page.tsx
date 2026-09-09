"use client";

import { MapPin } from "lucide-react";
import { useDictionary } from "@/lib/i18n";
import { Kicker } from "@/components/farmadent/sections";
import { practice, openingHours } from "@/content/config";

export default function KontaktPage() {
  const dict = useDictionary();
  const hours = openingHours[dict.lang];

  return (
    <div className="px-5 pt-4">
      <Kicker>{dict.contact.kicker}</Kicker>
      <h1 className="mt-1 text-[28px] leading-[1.05] text-text">{dict.contact.title}</h1>

      <div
        role="img"
        aria-label={dict.contact.mapPlaceholder}
        className="mt-5 flex h-[150px] items-center justify-center rounded-[24px] bg-accent-200"
      >
        <MapPin strokeWidth={2.75} className="h-8 w-8 text-accent-700" aria-hidden="true" />
      </div>

      <p className="mt-4 text-[14.5px] leading-relaxed text-text">{practice.addressLine}</p>
      <p className="mt-1 text-[13px] leading-relaxed opacity-65">{dict.contact.busNote}</p>

      <h2 className="mt-8 text-[17px] text-text">{dict.contact.hoursTitle}</h2>
      <div className="mt-3 divide-y divide-divider rounded-[24px] bg-surface px-4">
        {hours.map((row) => (
          <div key={row.days} className="flex items-center justify-between py-3 text-[13.5px]">
            <span className="text-text opacity-80">{row.days}</span>
            <span className="font-semibold text-text">{row.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
