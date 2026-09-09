"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDictionary } from "@/lib/i18n";
import { Kicker, StatRow } from "@/components/farmadent/sections";
import { TreatmentListRow } from "@/components/farmadent/treatments";
import Photo from "@/components/farmadent/Photo";

export default function HomePage() {
  const dict = useDictionary();
  const preview = dict.treatments.slice(0, 4);

  return (
    <div className="px-5 pt-2">
      <Kicker>{dict.home.kicker}</Kicker>
      <h1 className="mt-2 text-[44px] leading-[0.98] text-text">
        {dict.home.h1Lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-4 max-w-[38ch] text-[14.5px] leading-relaxed opacity-75">{dict.home.lead}</p>

      <StatRow stats={dict.home.stats} />

      {/* -mr-5 cancels the page's own right padding so the photo can bleed
          to the true edge, per the signature asymmetry — see Photo.tsx. */}
      <figure className="-mr-5 mt-8">
        <Photo
          bleed
          priority
          alt={dict.home.canyonCaption}
          width={960}
          height={720}
          label="Kanjon reke Mileševke"
          expectedPath="public/canyon.jpg"
        />
        <figcaption className="mr-[34px] mt-3">
          <span className="block h-[1px] w-4 bg-accent" aria-hidden="true" />
          <span className="mt-2 block text-[11.5px] opacity-65">{dict.home.canyonCaption}</span>
        </figcaption>
      </figure>

      <section className="mt-10" aria-labelledby="home-treatments">
        <div className="flex items-center justify-between">
          <h2 id="home-treatments" className="text-[20px] text-text">
            {dict.home.treatmentsKicker}
          </h2>
          <Link href="/oblasti" className="flex min-h-11 items-center gap-1 text-[13px] font-semibold text-accent-700">
            {dict.home.treatmentsCta}
            <ArrowRight strokeWidth={2.75} className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-2 divide-y divide-divider">
          {preview.map((treatment) => (
            <TreatmentListRow key={treatment.slug} treatment={treatment} to={`/oblasti/${treatment.slug}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
