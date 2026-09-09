"use client";

/**
 * Option B: one long scroll, sections addressed by id, header chips that
 * smooth-scroll + re-colour from scroll position, and a treatment detail
 * that's a component-state push view (not a route) mirrored into
 * ?oblast=<slug> so the state survives a refresh/share.
 */

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { useDictionary } from "@/lib/i18n";
import {
  Kicker,
  StatRow,
  TeamCard,
  RoomsStrip,
  PriceCard,
  ReviewsRow,
  FaqAccordion,
  SageCard,
} from "@/components/farmadent/sections";
import { TreatmentListRow, TreatmentDetail } from "@/components/farmadent/treatments";
import Photo from "@/components/farmadent/Photo";
import { practice, openingHours } from "@/content/config";
import type { Dictionary } from "@/content/types";

const SECTIONS = [
  "ordinacija",
  "oblasti",
  "tim",
  "prostor",
  "cene",
  "iskustva",
  "prvi-dolazak",
  "kontakt",
] as const;
type SectionId = (typeof SECTIONS)[number];

function sectionLabel(dict: Dictionary, id: SectionId) {
  switch (id) {
    case "ordinacija":
      return dict.nav.home;
    case "oblasti":
      return dict.nav.oblasti;
    case "tim":
      return dict.nav.tim;
    case "prostor":
      return dict.nav.prostor;
    case "cene":
      return dict.nav.cene;
    case "iskustva":
      return dict.nav.iskustva;
    case "prvi-dolazak":
      return dict.nav.prviDolazak;
    case "kontakt":
      return dict.nav.kontakt;
  }
}

// useSearchParams (for the ?oblast= mirror) requires a Suspense boundary
// around whatever reads it, so the route can still be prerendered.
export default function JednaStranaPage() {
  return (
    <Suspense fallback={null}>
      <JednaStranaContent />
    </Suspense>
  );
}

function JednaStranaContent() {
  const dict = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeId, setActiveId] = useState<SectionId>("ordinacija");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => searchParams.get("oblast"));
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});

  // Keep the URL in sync with the push view so it's shareable/refreshable,
  // without ever doing a real navigation.
  const openTreatment = useCallback(
    (slug: string) => {
      setSelectedSlug(slug);
      router.replace(`${pathname}?oblast=${slug}`, { scroll: false });
    },
    [pathname, router],
  );
  const closeTreatment = useCallback(() => {
    setSelectedSlug(null);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  // Scroll-spy: highlight whichever section chip corresponds to the
  // section currently under the sticky header (offset ~104px). Re-runs
  // whenever the sections (re)mount — i.e. whenever we're not showing the
  // treatment push view — since closing that view remounts fresh section
  // elements that a stale observer instance wouldn't be watching.
  useEffect(() => {
    if (treatment) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-104px 0px -70% 0px", threshold: 0 },
    );
    for (const id of SECTIONS) {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [treatment]);

  const treatment = useMemo(
    () => (selectedSlug ? dict.treatments.find((t) => t.slug === selectedSlug) : undefined),
    [dict.treatments, selectedSlug],
  );
  const otherTreatments = useMemo(
    () => (treatment ? dict.treatments.filter((t) => t.slug !== treatment.slug) : []),
    [dict.treatments, treatment],
  );

  const hours = openingHours[dict.lang];

  return (
    <div>
      {/* Section chips — same look as Option A's route chips, but anchor
          links + scroll-spy instead of routes. scroll-mt-[104px] on each
          section (below) is what gives the 104px offset on jump. */}
      <nav
        aria-label={dict.lang === "sr" ? "Glavna navigacija" : "Main navigation"}
        className="scrollbar-none flex gap-2 overflow-x-auto px-5 pb-3 [-webkit-overflow-scrolling:touch]"
      >
        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={activeId === id ? "true" : undefined}
            className={`flex h-11 shrink-0 items-center rounded-full px-4 text-[13px] font-semibold transition-colors ${
              activeId === id ? "bg-accent text-bg" : "border border-divider text-text opacity-70 hover:opacity-100"
            }`}
          >
            {sectionLabel(dict, id)}
          </a>
        ))}
      </nav>

      {treatment ? (
        <TreatmentDetail
          treatment={treatment}
          dict={dict}
          others={otherTreatments}
          backTo={closeTreatment}
          otherTo={(slug) => () => openTreatment(slug)}
        />
      ) : (
        <div className="flex flex-col gap-16">
          <section
            id="ordinacija"
            ref={(el) => {
              sectionRefs.current.ordinacija = el;
            }}
            aria-labelledby="ordinacija-heading"
            className="scroll-mt-[104px] px-5"
          >
            <Kicker>{dict.home.kicker}</Kicker>
            <h1 id="ordinacija-heading" className="mt-2 text-[44px] leading-[0.98] text-text">
              {dict.home.h1Lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-[38ch] text-[14.5px] leading-relaxed opacity-75">{dict.home.lead}</p>
            <StatRow stats={dict.home.stats} />
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
          </section>

          <section
            id="oblasti"
            ref={(el) => {
              sectionRefs.current.oblasti = el;
            }}
            aria-labelledby="oblasti-heading"
            className="scroll-mt-[104px] px-5"
          >
            <div className="flex items-center justify-between">
              <h2 id="oblasti-heading" className="text-[28px] leading-[1.05] text-text">
                {dict.home.treatmentsKicker}
              </h2>
            </div>
            <div className="mt-4 divide-y divide-divider">
              {dict.treatments.map((t) => (
                <TreatmentListRow key={t.slug} treatment={t} to={() => openTreatment(t.slug)} />
              ))}
            </div>
          </section>

          <section
            id="tim"
            ref={(el) => {
              sectionRefs.current.tim = el;
            }}
            aria-labelledby="tim-heading"
            className="scroll-mt-[104px] px-5"
          >
            <Kicker>{dict.team.kicker}</Kicker>
            <h2 id="tim-heading" className="mt-1 text-[28px] leading-[1.05] text-text">
              {dict.team.title}
            </h2>
            <div className="mt-5 flex flex-col gap-3">
              {dict.team.members.map((member) => (
                <TeamCard key={member.nameKey} member={member} dict={dict} />
              ))}
            </div>
          </section>

          <section
            id="prostor"
            ref={(el) => {
              sectionRefs.current.prostor = el;
            }}
            aria-labelledby="prostor-heading"
            className="scroll-mt-[104px]"
          >
            <div className="px-5">
              <Kicker>{dict.rooms.kicker}</Kicker>
              <h2 id="prostor-heading" className="mt-1 text-[28px] leading-[1.05] text-text">
                {dict.rooms.title}
              </h2>
            </div>
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
          </section>

          <section
            id="cene"
            ref={(el) => {
              sectionRefs.current.cene = el;
            }}
            aria-labelledby="cene-heading"
            className="scroll-mt-[104px] px-5"
          >
            <Kicker>{dict.prices.kicker}</Kicker>
            <h2 id="cene-heading" className="mt-1 text-[28px] leading-[1.05] text-text">
              {dict.prices.title}
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed opacity-75">{dict.prices.lead}</p>
            <div className="mt-6 flex flex-col gap-4">
              <PriceCard title={dict.prices.card1.title} items={dict.prices.card1.items} />
              <PriceCard title={dict.prices.card2.title} items={dict.prices.card2.items} sage />
            </div>
          </section>

          <section
            id="iskustva"
            ref={(el) => {
              sectionRefs.current.iskustva = el;
            }}
            aria-labelledby="iskustva-heading"
            className="scroll-mt-[104px] px-5"
          >
            <Kicker>{dict.reviews.kicker}</Kicker>
            <h2 id="iskustva-heading" className="mt-1 text-[28px] leading-[1.05] text-text">
              {dict.nav.iskustva}
            </h2>
            <div className="mt-5">
              <ReviewsRow dict={dict} />
            </div>
          </section>

          <section
            id="prvi-dolazak"
            ref={(el) => {
              sectionRefs.current["prvi-dolazak"] = el;
            }}
            aria-labelledby="prvi-dolazak-heading"
            className="scroll-mt-[104px] px-5"
          >
            <Kicker>{dict.firstVisit.kicker}</Kicker>
            <h2 id="prvi-dolazak-heading" className="mt-1 text-[28px] leading-[1.05] text-text">
              {dict.firstVisit.title}
            </h2>
            <div className="mt-4">
              <FaqAccordion items={dict.firstVisit.faq} />
            </div>
            <div className="mt-6">
              <SageCard title={dict.firstVisit.fearCard.title}>{dict.firstVisit.fearCard.text}</SageCard>
            </div>
          </section>

          <section
            id="kontakt"
            ref={(el) => {
              sectionRefs.current.kontakt = el;
            }}
            aria-labelledby="kontakt-heading"
            className="scroll-mt-[104px] px-5"
          >
            <Kicker>{dict.contact.kicker}</Kicker>
            <h2 id="kontakt-heading" className="mt-1 text-[28px] leading-[1.05] text-text">
              {dict.contact.title}
            </h2>
            <div
              role="img"
              aria-label={dict.contact.mapPlaceholder}
              className="mt-5 flex h-[150px] items-center justify-center rounded-[24px] bg-accent-200"
            >
              <MapPin strokeWidth={2.75} className="h-8 w-8 text-accent-700" aria-hidden="true" />
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-text">{practice.addressLine}</p>
            <p className="mt-1 text-[13px] leading-relaxed opacity-65">{dict.contact.busNote}</p>
            <h3 className="mt-8 text-[17px] text-text">{dict.contact.hoursTitle}</h3>
            <div className="mt-3 divide-y divide-divider rounded-[24px] bg-surface px-4">
              {hours.map((row) => (
                <div key={row.days} className="flex items-center justify-between py-3 text-[13.5px]">
                  <span className="text-text opacity-80">{row.days}</span>
                  <span className="font-semibold text-text">{row.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
