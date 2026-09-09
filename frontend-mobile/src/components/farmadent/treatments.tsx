"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Kicker, SageCard, doctorName } from "./sections";
import { useSetStickyBarLabel } from "@/lib/sticky-bar";
import type { Dictionary, Treatment } from "@/content/types";

/** Renders as a route Link when `to` is a string, or a button when it's a
 * click handler — the one place that knows how to bridge Option A
 * (routing) and Option B (component-state push view) so the rest of this
 * file doesn't have to care which architecture it's rendering into. */
function NavAction({
  to,
  children,
  className,
  ariaLabel,
}: {
  to: string | (() => void);
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  if (typeof to === "string") {
    return (
      <Link href={to} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={to} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 items-center rounded-full bg-surface px-3 text-[12.5px] font-medium text-text opacity-80">
      {children}
    </span>
  );
}

/** Numbered treatment row for the /oblasti list (and the home preview).
 * Wrap a set of these in a `divide-y divide-divider` container for the
 * 1px rules between rows. */
export function TreatmentListRow({ treatment, to }: { treatment: Treatment; to: string | (() => void) }) {
  return (
    <NavAction
      to={to}
      className="flex min-h-11 w-full items-center gap-4 py-4 text-left"
      ariaLabel={`${treatment.title} — ${treatment.subtitle}`}
    >
      <span className="w-6 shrink-0 text-[13px] font-semibold text-accent-700 opacity-70">{treatment.number}</span>
      <span className="flex-1">
        <span className="block text-[22px] leading-tight text-text">{treatment.title}</span>
        <span className="mt-0.5 block text-[12.5px] opacity-65">{treatment.subtitle}</span>
      </span>
      <ChevronRight strokeWidth={2.75} className="h-5 w-5 shrink-0 opacity-40" aria-hidden="true" />
    </NavAction>
  );
}

/** Full treatment detail — shared by the /oblasti/[slug] route (Option A)
 * and the component-state push panel (Option B). Sets the sticky bar's
 * label to "Pitaj za …" for as long as it's mounted. */
export function TreatmentDetail({
  treatment,
  dict,
  others,
  backTo,
  otherTo,
}: {
  treatment: Treatment;
  dict: Dictionary;
  others: Treatment[];
  backTo: string | (() => void);
  otherTo: (slug: string) => string | (() => void);
}) {
  useSetStickyBarLabel(treatment.askLabel);
  const whoLabel =
    treatment.tags.whoKey === "team"
      ? dict.roleLabels.team
      : `${dict.roleLabels[treatment.tags.whoKey]} · ${doctorName(treatment.tags.whoKey)}`;

  return (
    <div className="animate-detail-in px-5 pb-10 pt-2">
      <NavAction
        to={backTo}
        ariaLabel={dict.common.back}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-divider text-text transition-colors hover:bg-surface"
      >
        <ArrowLeft strokeWidth={2.75} className="h-5 w-5" aria-hidden="true" />
      </NavAction>

      <div className="mt-4">
        <Kicker>{treatment.kicker}</Kicker>
        <h1 className="mt-1 text-[28px] leading-[1.05] text-text">{treatment.title}</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed opacity-75">{treatment.lead}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Tag>{treatment.tags.duration}</Tag>
        <Tag>{treatment.tags.visits}</Tag>
        <Tag>{whoLabel}</Tag>
      </div>

      <section className="mt-8" aria-labelledby={`steps-${treatment.slug}`}>
        <h2 id={`steps-${treatment.slug}`} className="text-[20px] text-text">
          {treatment.stepsTitle}
        </h2>
        <ol className="mt-4 flex flex-col gap-4">
          {treatment.steps.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-bg">
                {i + 1}
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-text">{step.title}</span>
                <span className="mt-0.5 block text-[13.5px] leading-relaxed opacity-70">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8">
        <SageCard title={treatment.goodToKnowTitle}>{treatment.goodToKnow}</SageCard>
      </div>

      {others.length > 0 && (
        <div className="mt-8">
          <Kicker>{dict.common.otherTreatments}</Kicker>
          <div className="mt-3 flex flex-wrap gap-2">
            {others.map((other) => (
              <NavAction
                key={other.slug}
                to={otherTo(other.slug)}
                className="flex h-11 items-center rounded-full border border-divider px-4 text-[13px] font-semibold text-text transition-colors hover:bg-surface"
              >
                {other.title}
              </NavAction>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
