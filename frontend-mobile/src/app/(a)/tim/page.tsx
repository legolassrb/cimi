"use client";

import { useDictionary } from "@/lib/i18n";
import { Kicker, TeamCard } from "@/components/farmadent/sections";

export default function TimPage() {
  const dict = useDictionary();

  return (
    <div className="px-5 pt-4">
      <Kicker>{dict.team.kicker}</Kicker>
      <h1 className="mt-1 text-[28px] leading-[1.05] text-text">{dict.team.title}</h1>
      <div className="mt-5 flex flex-col gap-3">
        {dict.team.members.map((member) => (
          <TeamCard key={member.nameKey} member={member} dict={dict} />
        ))}
      </div>
    </div>
  );
}
