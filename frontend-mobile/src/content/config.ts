/**
 * Practice facts — the one place to edit the phone number, address, doctor
 * names and opening hours. Every component pulls from here instead of
 * hardcoding any of it. See README.md → "Changing copy, phone number and
 * photographs" for the non-technical version of this note.
 */

export const practice = {
  name: "Farmadent",
  addressLine: "Ulica i broj, 31300 Prijepolje",
  // Digits only, international format, no spaces — used to build tel:/wa.me links.
  phoneDisplay: "033 710 000",
  phoneIntl: "+381337100 00".replace(/\s/g, ""),
  whatsappIntl: "38133710000",
  mapsQuery: "Farmadent, Ulica i broj, 31300 Prijepolje",
};

export const phoneHref = `tel:${practice.phoneIntl}`;
export const whatsappHref = `https://wa.me/${practice.whatsappIntl}`;

/** Two generations of the same practice — used by the team page and by
 * treatment detail's "who performs" tag (resolved from a role key so the
 * dictionaries never hardcode a name). */
export const doctors = {
  founder: { name: "Dr. Ime Prezime" },
  associate: { name: "Dr. Ime Prezime" },
  assistant: { name: "Ime Prezime" },
} as const;

export type DoctorKey = keyof typeof doctors;

/** Raw rows for the opening-hours table (contact page) and the short
 * one-line summary (footer/contact kicker). Keep in sync by hand — small
 * enough not to need a formatter. */
export const openingHours = {
  sr: [
    { days: "Ponedeljak – Petak", time: "09:00 – 19:00" },
    { days: "Subota", time: "09:00 – 14:00" },
    { days: "Nedelja", time: "samo hitni slučajevi" },
  ],
  en: [
    { days: "Monday – Friday", time: "09:00 – 19:00" },
    { days: "Saturday", time: "09:00 – 14:00" },
    { days: "Sunday", time: "emergencies only" },
  ],
  short: {
    sr: "Pon–Pet 09:00–19:00 · Sub 09:00–14:00 · Ned samo hitni slučajevi.",
    en: "Mon–Fri 09:00–19:00 · Sat 09:00–14:00 · Sun emergencies only.",
  },
};
