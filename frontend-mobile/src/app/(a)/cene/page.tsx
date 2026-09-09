"use client";

import { useDictionary } from "@/lib/i18n";
import { Kicker, PriceCard } from "@/components/farmadent/sections";

export default function CenePage() {
  const dict = useDictionary();

  return (
    <div className="px-5 pt-4">
      <Kicker>{dict.prices.kicker}</Kicker>
      <h1 className="mt-1 text-[28px] leading-[1.05] text-text">{dict.prices.title}</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed opacity-75">{dict.prices.lead}</p>

      <div className="mt-6 flex flex-col gap-4">
        <PriceCard title={dict.prices.card1.title} items={dict.prices.card1.items} />
        <PriceCard title={dict.prices.card2.title} items={dict.prices.card2.items} sage />
      </div>
    </div>
  );
}
