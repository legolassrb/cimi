"use client";

import { useState, type ReactNode } from "react";
import { Star, Plus, Minus } from "lucide-react";
import { doctors, type DoctorKey } from "@/content/config";
import type { Dictionary, TeamMember, Review, FaqItem } from "@/content/types";

export function Kicker({ children, emphasized = false }: { children: ReactNode; emphasized?: boolean }) {
  return (
    <h6
      className={`text-[13px] font-semibold uppercase tracking-[0.08em] ${
        emphasized ? "text-accent-700" : "text-text opacity-50"
      }`}
    >
      {children}
    </h6>
  );
}

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="mt-6 flex divide-x divide-divider">
      {stats.map((stat, i) => (
        <div key={stat.label} className={i === 0 ? "flex-1 pr-4" : "flex-1 px-4"}>
          <div className="text-[30px] leading-none text-accent-700">{stat.value}</div>
          <div className="mt-1.5 text-[12.5px] leading-snug opacity-65">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

/** The sage "second voice" card — used for "Dobro je znati" and the
 * fear/anxiety reassurance card. One of only two filled colours on the
 * page, per the visual spec. */
export function SageCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[24px] bg-accent-2-200 p-5 text-accent-2-900">
      <h3 className="text-[17px]">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed opacity-80">{children}</p>
    </div>
  );
}

export function TeamCard({ member, dict }: { member: TeamMember; dict: Dictionary }) {
  const name = doctors[member.nameKey].name;
  return (
    <div className="rounded-[24px] bg-surface p-5">
      <div className="h-20 w-20 rounded-full border-2 border-dashed border-neutral-300 bg-neutral-100" aria-hidden="true" />
      <div className="mt-3 text-[17px] text-text">{name}</div>
      <div className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.04em] text-accent-700">
        {member.role}
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed opacity-70">{member.bio}</p>
      <span className="sr-only">{dict.team.kicker}</span>
    </div>
  );
}

export function RoomsStrip({ tags }: { tags: string[] }) {
  return (
    <div>
      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex h-[132px] w-[132px] shrink-0 flex-col items-center justify-center gap-1 rounded-[24px] border-2 border-dashed border-neutral-300 bg-neutral-100 p-3 text-center"
          >
            <span className="text-[12px] font-medium leading-snug text-text opacity-70">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PriceCard({ title, items, sage = false }: { title: string; items: string[]; sage?: boolean }) {
  return (
    <div
      className={`rounded-[24px] p-5 ${sage ? "bg-accent-2-200 text-accent-2-900" : "bg-surface text-text"}`}
    >
      <h3 className="text-[17px]">{title}</h3>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13.5px] leading-relaxed opacity-80">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewsRow({ dict }: { dict: Dictionary }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Star strokeWidth={2.75} className="h-4 w-4 fill-accent-700 text-accent-700" aria-hidden="true" />
        <span className="text-[15px] font-semibold text-text">{dict.reviews.rating}</span>
        <span className="text-[13px] opacity-65">· {dict.reviews.count}</span>
      </div>
      <div className="scrollbar-none mt-4 flex gap-3 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {dict.reviews.items.map((review) => (
          <ReviewCard key={review.author} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="w-[250px] shrink-0 rounded-[24px] bg-surface p-5">
      <blockquote className="text-[13.5px] leading-relaxed text-text opacity-80">“{review.quote}”</blockquote>
      <figcaption className="mt-3 text-[12.5px] font-semibold text-text opacity-60">
        {review.author} · {review.source}
      </figcaption>
    </figure>
  );
}

/** One-open-at-a-time accordion for the first-visit FAQ. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-divider">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        return (
          <div key={item.q} className="py-4">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full min-h-11 items-center justify-between gap-4 text-left"
            >
              <span className="text-[15px] font-semibold text-text">{item.q}</span>
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                {open ? (
                  <Minus strokeWidth={2.75} className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Plus strokeWidth={2.75} className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </span>
            </button>
            {open && (
              <p id={panelId} className="animate-accordion-in mt-2 text-[13.5px] leading-relaxed opacity-70">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function doctorName(key: DoctorKey) {
  return doctors[key].name;
}
