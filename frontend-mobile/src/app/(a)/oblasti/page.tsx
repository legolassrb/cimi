"use client";

import { useDictionary } from "@/lib/i18n";
import { Kicker } from "@/components/farmadent/sections";
import { TreatmentListRow } from "@/components/farmadent/treatments";

export default function OblastiPage() {
  const dict = useDictionary();

  return (
    <div className="px-5 pt-4">
      <Kicker>{dict.nav.oblasti}</Kicker>
      <h1 className="mt-1 text-[28px] leading-[1.05] text-text">{dict.home.treatmentsKicker}</h1>
      <div className="mt-4 divide-y divide-divider">
        {dict.treatments.map((treatment) => (
          <TreatmentListRow key={treatment.slug} treatment={treatment} to={`/oblasti/${treatment.slug}`} />
        ))}
      </div>
    </div>
  );
}
