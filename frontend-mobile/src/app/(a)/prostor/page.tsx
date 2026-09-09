"use client";

import { useDictionary } from "@/lib/i18n";
import { Kicker, RoomsStrip } from "@/components/farmadent/sections";
import Photo from "@/components/farmadent/Photo";

export default function ProstorPage() {
  const dict = useDictionary();

  return (
    <div className="pt-4">
      <div className="px-5">
        <Kicker>{dict.rooms.kicker}</Kicker>
        <h1 className="mt-1 text-[28px] leading-[1.05] text-text">{dict.rooms.title}</h1>
      </div>

      {/* The design's second (and last) bleed photograph — see Photo.tsx. */}
      <figure className="-mr-5 mt-5">
        <Photo
          bleed
          alt={dict.rooms.title}
          width={960}
          height={640}
          label="Ordinacija — širi kadar"
          expectedPath="public/prostor.jpg"
        />
      </figure>

      <div className="mt-6 px-5">
        <RoomsStrip tags={dict.rooms.tags} />
      </div>
    </div>
  );
}
