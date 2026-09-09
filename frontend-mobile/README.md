# Farmadent — frontend-mobile

The patient-facing site for Farmadent, a family dental practice in
Prijepolje. Public information only — who we are, what we treat, how each
treatment goes, how to get here and how to reach us. **No online booking**;
the only actions are a phone call and WhatsApp. Bilingual (Serbian default,
English) via an SR/EN switch in the header.

This app is one piece of the wider [cimi](../README.md) repo. The original
[mvp.md](../mvp.md) plan (booking, patient accounts, admin) is not what's
built here for now — see the note at the top of that file. `frontend-mobile`
currently ships the simpler no-booking info site described in this README;
booking/accounts/admin remain future work if `cimi` picks that scope back up.

## Before you run anything

This app uses [lucide-react](https://lucide.dev) for icons, which isn't
installed yet. From `frontend-mobile/`, run:

```bash
npm install lucide-react
```

(Left for you to run deliberately rather than done automatically.) Then the
usual `npm run dev` / `npm run build` / `npm run lint` / `npm run type-check`
apply.

## Changing copy

**Every piece of text lives in `src/content/`** — nothing is hardcoded in a
component.

- `src/content/config.ts` — practice name, address, phone number, WhatsApp
  number, doctor names, opening hours. Edit this file to change any of
  those; every page reads from here.
- `src/content/sr.ts` / `src/content/en.ts` — the two dictionaries. Same
  shape (enforced by `src/content/types.ts`), one per language. Edit the
  strings directly; there's no build step needed to see the change.

## Changing the phone number / WhatsApp

Both live in `src/content/config.ts`:

```ts
export const practice = {
  phoneDisplay: "033 710 000", // what's shown on the call button
  phoneIntl: "...",             // digits only, used for the tel: link
  whatsappIntl: "...",          // digits only, used for the wa.me link
  ...
};
```

## Adding photographs

There are no real practice photographs yet, so every photo slot renders a
labelled placeholder block (via `src/components/farmadent/Photo.tsx`,
built on the shared `ImagePlaceholder` component) instead of a stock photo.
To swap one in:

1. Drop the image file into `public/`.
2. Find the `<Photo .../>` call for that slot (search the placeholder's
   `expectedPath`, e.g. `public/canyon.jpg`) and pass `src="/your-file.jpg"`.

`Photo` always applies the required `.washed` filter
(`saturate(.55) contrast(.9) brightness(1.06) opacity(.95)`, defined in
`globals.css`) — you never need to add that yourself. Pass `bleed` for the
two photos that bleed off the right edge (the hero/canyon shot and the
"Prostor" shot) — that's the design's signature asymmetry; every other
photo is a plain rounded card.

## Adding a new treatment

Treatments are entries in the `treatments` array in **both**
`src/content/sr.ts` and `src/content/en.ts` — add a matching object to
each (same `slug`, same `number`), following the `Treatment` shape in
`src/content/types.ts`:

```ts
{
  slug: "novi-tretman",       // used in the URL: /oblasti/novi-tretman
  number: "09",
  title: "...",
  subtitle: "...",
  kicker: "Oblast 09",
  lead: "...",
  tags: { duration: "...", visits: "...", whoKey: "founder" | "associate" | "team" },
  stepsTitle: "Kako terapija ide",
  steps: [ { title: "...", text: "..." }, /* exactly 3 */ ],
  goodToKnowTitle: "Dobro je znati",
  goodToKnow: "...",
  askLabel: "Pitaj za ...",
}
```

`whoKey` resolves to a doctor's name from `config.ts` at render time — it
doesn't need (and shouldn't) hardcode a name. Nothing else needs editing:
the `/oblasti` list, the home page preview, and the detail route all read
straight from this array.

## Two architectures, temporarily

The app currently ships **both** layouts from the original brief so they
can be compared before picking one:

- **Option A** — routed pages (`/`, `/oblasti`, `/oblasti/[slug]`, `/tim`,
  `/prostor`, `/cene`, `/iskustva`, `/prvi-dolazak`, `/kontakt`).
- **Option B** — a single scrolling page at `/jedna-strana`, with the
  treatment detail as a component-state push view instead of a route.

A small floating **A/B switcher** (`src/components/farmadent/ArchSwitcher.tsx`,
top-right corner, clearly commented as temporary) lets you flip between
them. Once you've picked one:

1. Delete `ArchSwitcher.tsx` and its `<ArchSwitcher />` call in
   `src/app/layout.tsx`.
2. If you kept Option A: delete `src/app/jedna-strana/`.
3. If you kept Option B: delete `src/app/(a)/`, then move
   `src/app/jedna-strana/page.tsx` to `src/app/page.tsx` (and update the
   internal anchor links/section ids if you want cleaner URLs).

Both share the same content (`src/content/`) and most components
(`src/components/farmadent/`), so nothing else needs to change.

## Unlinked stub routes

`src/app/book/`, `src/app/login/` and `src/app/account/` are booking/account
stub pages left over from `mvp.md`'s original scope. They're not linked
from anywhere in the Farmadent design (no online booking, no accounts) but
are kept in place in case that scope is picked back up later.
