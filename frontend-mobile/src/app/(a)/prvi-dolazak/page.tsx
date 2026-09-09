"use client";

import { useDictionary } from "@/lib/i18n";
import { Kicker, FaqAccordion, SageCard } from "@/components/farmadent/sections";

export default function PrviDolazakPage() {
  const dict = useDictionary();

  return (
    <div className="px-5 pt-4">
      <Kicker>{dict.firstVisit.kicker}</Kicker>
      <h1 className="mt-1 text-[28px] leading-[1.05] text-text">{dict.firstVisit.title}</h1>

      <div className="mt-4">
        <FaqAccordion items={dict.firstVisit.faq} />
      </div>

      <div className="mt-6">
        <SageCard title={dict.firstVisit.fearCard.title}>{dict.firstVisit.fearCard.text}</SageCard>
      </div>
    </div>
  );
}
