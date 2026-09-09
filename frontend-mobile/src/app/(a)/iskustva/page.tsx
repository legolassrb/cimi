"use client";

import { useDictionary } from "@/lib/i18n";
import { Kicker, ReviewsRow } from "@/components/farmadent/sections";

export default function IskustvaPage() {
  const dict = useDictionary();

  return (
    <div className="px-5 pt-4">
      <Kicker>{dict.reviews.kicker}</Kicker>
      <h1 className="mt-1 text-[28px] leading-[1.05] text-text">{dict.nav.iskustva}</h1>
      <div className="mt-5">
        <ReviewsRow dict={dict} />
      </div>
    </div>
  );
}
