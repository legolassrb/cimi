# Staff/Patient app — full spec (deferred)

Received 2026-08-22. This is the complete, as-given spec for a much larger
feature: role-based auth, a full clinical domain model (surgery notes, lab
case tracking, aligner courses, imaging, post-op sheets), a staff/patient
dual-shell frontend, and the visual system below.

**Status: only the visual system has been applied so far** (see the commit(s)
that follow this one) — to the existing `frontend/` and `frontend-mobile/`
apps, with no new pages, routes, backend endpoints, domain models, or
migrations. The rest of this spec (roles/authorization, the domain model,
all listed endpoints, both shells, and every screen beyond what already
exists) is **not implemented** and needs a separate decision to pick back
up, since it goes well beyond `mvp.md`'s current scope and conflicts with
decisions already made this session (frontend-mobile is patient-only; there
is no data model or auth in the backend yet).

**Decision made if/when this resumes:** the Staff experience goes into the
existing desktop app (`frontend/`, which already has an `admin/` route
tree), not a new shell merged into `frontend-mobile` and not a third app.
`frontend-mobile` stays patient-only, per the earlier decision.

---

## Original prompt

You are working in a web app with a **Python backend (FastAPI/Django + SQLAlchemy/ORM)** and a **TypeScript frontend (React)**. I have an approved design for a dental-practice mobile app with two distinct experiences. Implement it faithfully to the spec below. Read the existing code first and match its conventions — do not introduce a new state library, styling approach, or folder structure.

## Product shape

Two audiences, one codebase:

1. **Staff app** (role `staff` / `owner`) — full clinical + practice functionality.
2. **Patient app** (role `patient`) — READ-ONLY. **No scheduling, no calendar, no booking, no rescheduling anywhere in the patient experience.** Appointments are made by phone or at the desk.

## Backend work (Python)

1. **Roles & authorization**
   - Add a role enum: `patient | assistant | dentist | owner`.
   - A single dependency/guard, e.g. `require_role(*roles)`, applied to every router.
   - Patient-facing endpoints must be strictly read-only: no `POST`/`PUT`/`PATCH`/`DELETE` reachable by role `patient` except the existing auth endpoints and `POST /api/patient/questions` (a plain text question to the practice).
   - Remove or 403 any existing patient-reachable scheduling endpoints (`/appointments` create/update/cancel, availability/slots lookups). Slot availability must not be exposed to `patient` at all — not even read.

2. **Domain models** (create/extend, with Alembic migration)
   - `Patient` — demographics, `since` (first visit year), flags (`allergies`, `anticoagulants`), `family_group_id`.
   - `Appointment` — `patient_id`, `chair` (1|2), `clinician_id`, `starts_at`, `duration_min`, `procedure`, `specialty` enum `prosthetics|surgery|orthodontics`, `status`.
   - `ClinicalNote` — `patient_id`, `type` (`surgery`|`ortho`|`prosthetic`), `teeth` (array of FDI codes as strings), `structured` JSON (e.g. `{approach, anaesthesia, closure}`), `rendered_text`, `signed_at`, `signed_by`.
   - `LabCase` — `patient_id`, `case_ref`, `lab` (`in_house`|`external`), `work_description`, `shade`, `promised_date`, `stage` enum `impression|design|fabrication|try_in|fit`, and `LabCaseEvent` rows (`stage`, `occurred_at`, `note`) for the step history. Derive `is_late = promised_date < today AND stage != 'fit'`.
   - `TryInOutcome` — `lab_case_id`, tags from a fixed set (`seats_fully`, `high_contact`, `shade_off`, `remake`), `recorded_at`.
   - `AlignerCourse` — `patient_id`, `total_stages`, `current_stage`, `started_on`, `wear_hours_per_day`, `next_review_on`, plus `AlignerEvent` log rows.
   - `ImagingStudy` — `patient_id`, `modality` (`panoramic`|`periapical`|`bitewing`), `tooth`, `taken_on`, `file_ref`.
   - `PostOpSheet` — `patient_id`, `blocks` (array of block keys from a server-side catalogue), `sent_at`, `channels` (`app`, `sms`).
   - `PostOpBlock` catalogue — `key`, `title`, `body` (plain-language patient text). The staff app only ever picks keys; free text is not accepted.
   - `Specialty` content — `slug`, `title`, `intro`, `procedures[] {label, sub, visits}`, `who`, `note` — so the patient landing page is editable without a deploy.
   - `PracticeInfo` — name, `established`, address, opening hours, phone, accessibility note, headline stats.

3. **Endpoints**

   Staff:
   - `GET /api/staff/board?date=` — appointments grouped by chair + per-chair utilisation %.
   - `GET /api/staff/patients?filter=&q=` — filters: `today|prosthetics|ortho|surgery|recall_due`.
   - `GET /api/staff/patients/{id}` — header, tags, timeline (merged notes/lab/imaging events, newest first).
   - `POST /api/staff/notes` and `POST /api/staff/notes/{id}/sign` — accepts `teeth[]` + `structured{}`; the server renders `rendered_text` from a template, the client never sends prose.
   - `GET /api/staff/lab?stage=|late=true`, `GET /api/staff/lab/{ref}`, `POST /api/staff/lab/{ref}/try-in`, `POST /api/staff/lab/{ref}/notify-patient`.
   - `GET /api/staff/aligner/{course_id}`, `POST /api/staff/aligner/{course_id}/advance`.
   - `GET /api/staff/imaging/{patient_id}`, `GET /api/staff/imaging/study/{id}` (signed URL).
   - `POST /api/staff/post-op` — `{patient_id, block_keys[]}` → expands blocks, persists, sends app + SMS.
   - `GET /api/staff/pulse?month=` — chair utilisation, mean lab turnaround (days, in-house vs external), remakes, recall response rate, revenue split by specialty.

   Patient (all `GET` except the question endpoint):
   - `GET /api/patient/practice` — practice info, stats, specialty summaries.
   - `GET /api/patient/specialties/{slug}` — full specialty page content.
   - `GET /api/patient/me/plan` — agreed treatment steps with `done` flag, per-step cost, remaining balance, insurance note.
   - `GET /api/patient/me/next-visit` — date/time/clinician/duration as **display text only**, plus a "what to do beforehand" line. No slot data, no reschedule affordance.
   - `GET /api/patient/me/post-op` — the latest sent sheet, expanded to plain language.
   - `POST /api/patient/questions` — free-text question to the practice.

4. **Tests** — pytest: a `patient` token gets 403/404 on every staff route and on any scheduling route; lab `is_late` derivation; note rendering from structured input; post-op block expansion.

## Frontend work (TypeScript)

1. **Two shells, one router.** `StaffShell` with a five-item bottom tab bar — Today, Patients, Lab, Imaging, Pulse. `PatientShell` with four — Practice, What we do, My plan, Care. Tabs are text-only, uppercase, ~10px, with a 4px accent top-bar on the active tab. The route guard derives the shell from the role; a `patient` hitting a staff route is redirected, not just hidden.

2. **Staff screens** (build in this order)
   - *Chair board* — two-chair header with utilisation %, then a time-ordered appointment list (time + chair, name, procedure, specialty tag). The next patient's row is tinted. A dark "Waiting on us" panel at the bottom counts late lab cases and unsigned consents and links to the lab board.
   - *Patients* — filter chips, then rows with name, one-line status, specialty tag and "patient since" year.
   - *Patient record* — header with flags, a 2×2 grid of jumps (Surgery note, Aligner course, Lab case, Imaging), then the merged timeline.
   - *Surgery note* — an 8×4 FDI tooth grid (32 tap targets, ≥42px tall, selected = accent fill), then three single-select chip sets (Approach / Anaesthesia / Closure), a live rendered note preview, and two actions: "Post-op sheet" and "Sign & file note". **No text inputs on this screen at all.**
   - *Aligner course* — big current-stage number, a 34-bar stage strip (past = ink, current = accent, future = grey; bars grow slightly in height left→right; tapping a bar selects that stage), wear/next-review pair, event log.
   - *Lab board* — segmented filter (All / Impression / Design / Try-in / Late), then case rows: name, work, stage tag, a 5-segment progress strip, and a due line that turns accent-dark when late.
   - *Case detail* — step checklist with dates, a try-in outcome multi-select, and "Tell patient it is ready" (which flips to a confirmed state).
   - *Imaging* — black viewer area, a Compare toggle that splits it into two stacked panes, and a horizontal study thumbnail strip; the active thumbnail is accent-bordered. Images render greyscale, never tinted.
   - *Post-op sheet* — the block catalogue as tappable rows (selected = inverted ink row with an accent check box), then "Send N blocks to patient" which flips to a sent state.
   - *Practice pulse* — 2×2 KPI grid, a revenue-by-specialty bar list, and one dark "owner's read" callout.

3. **Patient screens**
   - *Practice (landing)* — kicker "Est. 1993 · family practice", the practice name at display size, a short paragraph, a full-width greyscale photograph, a three-cell stat row, then the three specialty cards (96px greyscale thumbnail + title + tag + blurb, tappable), a bordered "Visiting us" info table (address, hours, phone, access) with the line that appointments are made by phone or at the desk, and a "Call the practice" primary action (a `tel:` link).
   - *What we do* — a three-tab switcher (Prosthetics / Oral surgery / Orthodontics), then intro, greyscale photo, a procedure list with visit counts, a dark "Who you will see" block with a portrait, and a closing note.
   - *My plan* — read-only step list with done marks and per-step cost, a remaining-balance panel with the insurance note, and an "Ask about my plan" action that posts a question.
   - *Care* — a dark "today only" instruction panel, then titled care blocks, a "Call the practice" action and a when-to-call-immediately warning.

4. **Deliberate omissions.** Do not build: a patient calendar, availability view, slot picker, reschedule/cancel flow, or self-service booking. If a `book`/`appointments` route or component exists in the patient bundle, delete it and remove its nav entry.

5. **Images.** Every content photograph is greyscale (`filter: grayscale(1)`) and object-fit cover in a fixed-height frame. Use the practice's own photography; ship the components with empty framed placeholders that keep layout height when no image is set.

## Visual system (apply exactly)

Flat, architectural, all Archivo, no rounded corners anywhere.

```
--bg #f3f2f2   --surface #eae9e9   --ink #201e1d
--accent #ec3013   --accent-hover #dd2b0f   --accent-deep #ae1800
--tint #fff2ef / #ffe0d9           --grey-200 #eae7e7  --grey-300 #d7d3d3
--grey-500 #9b9797  --grey-600 #7d7979  --grey-700 #605d5d
```

- Type: Archivo 400/600/700/800. Screen titles 26–30px/800, letter-spacing −0.03em. Section labels 10px/700 uppercase, letter-spacing 0.14em, grey-700. Body 12.5–14px.
- Rules: 2px solid ink between major sections; 1px `rgba(32,30,29,.2)` between list rows. Never a hairline, never whitespace instead of a rule.
- `border-radius: 0` everywhere. No shadows on in-app surfaces.
- Everything flush left — including labels inside full-width buttons (`text-align:left; padding-left:14px`).
- Accent is for the primary action, the "needs attention" state and small emphasis only. Ink-on-ground carries the rest. Red as a full field is reserved for one callout per screen at most.
- Touch targets ≥44px (52–56px for primary buttons). Tooth-grid cells may be 42px.
- Hover = `#eae7e7` tint on rows, `#dd2b0f` on accent buttons. Focus = `outline: 2px solid #ec3013; outline-offset: 2px`. Never leave browser default focus rings.
- Body text in the accent must use `#ae1800`, not `#ec3013` (contrast).

## Definition of done

- `patient` role cannot reach any staff route or any scheduling endpoint (test-proven).
- No free-text input exists anywhere in the staff clinical flows — notes, try-in outcomes and post-op sheets are entirely selections.
- Both shells render at 402×874 with no horizontal scroll and no content under the status bar or home indicator.
- Lint, typecheck and tests pass.

Work in small commits, one screen per commit, and show me a diff summary before you touch migrations.
