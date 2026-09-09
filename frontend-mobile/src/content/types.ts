import type { DoctorKey } from "./config";

export type Lang = "sr" | "en";

export type TreatmentStep = { title: string; text: string };

export type Treatment = {
  slug: string;
  number: string; // "01".."08"
  title: string;
  subtitle: string;
  kicker: string;
  lead: string;
  tags: { duration: string; visits: string; whoKey: DoctorKey | "team" };
  stepsTitle: string;
  steps: TreatmentStep[]; // exactly 3
  goodToKnowTitle: string;
  goodToKnow: string;
  askLabel: string; // "Pitaj za implantologiju" etc.
};

export type TeamMember = {
  nameKey: DoctorKey;
  role: string;
  bio: string;
};

export type Review = { quote: string; author: string; source: string };
export type FaqItem = { q: string; a: string };

export type Dictionary = {
  lang: Lang;
  meta: { title: string; description: string };

  nav: {
    home: string;
    oblasti: string;
    tim: string;
    prostor: string;
    cene: string;
    iskustva: string;
    prviDolazak: string;
    kontakt: string;
  };

  roleLabels: { founder: string; associate: string; assistant: string; team: string };

  common: {
    call: string;
    whatsapp: string;
    back: string;
    otherTreatments: string;
    langSwitch: string;
  };

  home: {
    kicker: string;
    h1Lines: [string, string, string, string];
    lead: string;
    stats: { value: string; label: string }[];
    canyonCaption: string;
    treatmentsKicker: string;
    treatmentsCta: string;
  };

  treatments: Treatment[];

  team: {
    kicker: string;
    title: string;
    members: TeamMember[];
  };

  rooms: {
    kicker: string;
    title: string;
    tags: string[];
  };

  prices: {
    kicker: string;
    title: string;
    lead: string;
    card1: { title: string; items: string[] };
    card2: { title: string; items: string[] };
  };

  reviews: {
    kicker: string;
    rating: string;
    count: string;
    items: Review[];
  };

  firstVisit: {
    kicker: string;
    title: string;
    faq: FaqItem[];
    fearCard: { title: string; text: string };
  };

  contact: {
    kicker: string;
    title: string;
    busNote: string;
    hoursTitle: string;
    mapPlaceholder: string;
  };
};
