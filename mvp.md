# Dentist Office Web App — MVP Planning Document

## 1. Overview & Purpose

A standalone, responsive web application for a modern dentist office. The app gives prospective and existing patients an easy way to learn about the practice's services and team, view a photo gallery of the office/work, see relevant statistics, and book appointments online — reducing phone-based scheduling overhead for staff.

## 2. Goals & Success Criteria

- Patients can book an appointment online without calling the office
- Practice can showcase its team, services, and results to build trust
- Office staff/admin can manage appointments, availability, and content without developer involvement
- App works equally well on mobile (primary channel for most patients) and desktop
- Reduce no-shows via automated reminders

## 3. Target Users

| User Type | Needs |
|---|---|
| Prospective patient | Learn about services, see doctors' credentials, browse gallery, decide to book |
| Existing patient | Quickly book/reschedule/cancel appointments, see reminders |
| Admin / Office staff | Manage appointments, availability, doctor profiles, gallery content, view statistics |

## 4. MVP Feature Scope

### 4.1 Public / Regular User Mode
- **Services overview** — list of treatments/procedures performed, grouped by category (e.g., general, cosmetic, orthodontics, surgery)
- **Doctors team overview** — profile per doctor (photo, name, specialty, bio, credentials)
- **Statistics** — public-facing, marketing-oriented rough numbers only (e.g., number of teeth-bleaching procedures done, number of satisfied customers, years in operation). Not real-time/precise — curated/rounded figures intended to build trust, not an analytics dashboard
- **Appointment booking** — select service → select doctor (optional) → select available slot → confirm → receive confirmation
- **Photo gallery** — office photos, before/after (with consent), team photos, categorized/filterable
- **User account** — view own upcoming/past appointments, reschedule/cancel within policy

### 4.2 Admin Mode
- Manage doctors (add/edit/remove profiles)
- Manage services/treatments list
- Manage availability/working hours per doctor
- View and manage all appointments (confirm, cancel, mark completed, add notes)
- Manage gallery content (upload/remove/categorize photos)
- View internal statistics dashboard (bookings over time, cancellation rate, popular services)
- **View full appointment details** — including which patient booked and the reason/service (cause) for the visit. Regular users only ever see that a given time slot is unavailable — never who booked it or why (see Section 11)
- **Site traffic & engagement analytics** — acquisition source (Instagram, Google search, Bing search, direct URL entry, other referrers), average session duration, most-visited/preferred pages
- Audit log of admin actions

## 5. Information Architecture (Site Map)

```
Public
├── Home (intro, highlights, CTA to book)
├── Services (list → detail per service)
├── Our Team (list → detail per doctor)
├── Gallery (filterable grid)
├── Statistics / About (trust numbers)
├── Book Appointment (multi-step flow)
├── Login / Register
└── My Account (patient dashboard: my appointments)

Admin (separate authenticated area)
├── Dashboard (overview stats)
├── Appointments (list, calendar view, manage)
├── Doctors (CRUD)
├── Services (CRUD)
├── Availability (per doctor schedule rules)
├── Gallery (CRUD)
└── Audit Log
```

## 6. Data Model (High-Level)

- **User** — id, name, email, phone, password_hash/auth_provider, role (`patient`/`admin`), created_at
- **Doctor** — id, name, specialty, bio, photo_url, active
- **Service** — id, name, category, description, duration_minutes, active
- **Availability** — doctor_id, day_of_week/date rules, start_time, end_time, exceptions (holidays/leave)
- **Appointment** — id, patient_id, doctor_id, service_id, start_time, end_time, status (`pending`/`confirmed`/`cancelled`/`completed`), notes, created_at
- **GalleryItem** — id, image_url, category, caption, uploaded_by, created_at
- **StatisticSnapshot** — id, label (e.g., "teeth bleachings done"), value, updated_at — curated marketing numbers, manually or periodically updated, not derived live from Appointment table
- **AuditLog** — id, admin_id, action, target_entity, timestamp
- **PageView / Session** *(if self-hosted analytics; not needed if using a third-party tool — see Open Points)* — id, session_id, referrer_source, landing_page, pages_visited, duration_seconds, timestamp

## 7. Architecture Overview

```
[Client: React/Vue SPA, responsive] <--REST API--> [Backend: Python API] <--> [PostgreSQL]
                                                          |
                                                   [Background jobs: reminders]
                                                          |
                                                  [Object storage: gallery/photos]
```

Decoupled frontend/backend; frontend deployed as static build to CDN, backend containerized.

## 8. Frontend Plan

- Framework: React (with Next.js) or Vue (Nuxt) — mobile-first responsive design
- Two layout shells: **public/patient shell** and **admin shell** (different nav, density, and permissions)
- Component library / Tailwind CSS for consistent, fast responsive styling
- Key components: service list/cards, doctor profile cards, gallery grid with lightbox, multi-step booking wizard, calendar/slot picker (desktop: grid view; mobile: day-list view), patient dashboard, admin data tables and forms
- PWA manifest for "add to home screen" installability

## 9. Backend Plan

- Framework: **FastAPI** (Python) — async, auto-generated OpenAPI docs
- Layers: routes/controllers, services (business logic), models (SQLAlchemy), middleware (auth, logging, rate limiting)
- API namespaces: `/api/v1/...` (public/patient) and `/api/v1/admin/...` (admin only, role-enforced server-side)
- Auth: JWT (access + refresh tokens) or session cookies; optional OAuth login (Google) for patient convenience
- Validation: Pydantic schemas
- File uploads (gallery, doctor photos) → S3-compatible object storage, not local disk
- **Site analytics integration** (acquisition source, session duration, popular pages) — recommend a third-party privacy-respecting analytics tool (e.g., Plausible, Fathom, or Google Analytics/GA4) embedded on the public frontend and surfaced to admin either via an embedded dashboard/iframe or pulled through that tool's API into the admin portal, rather than building a custom tracking pipeline from scratch for MVP — *see Open Points*

## 10. Appointment Booking Detail

**Flow:**
1. Patient selects service (and optionally preferred doctor)
2. System shows available slots for date range (generated from doctor availability rules minus existing bookings)
3. Patient selects slot → temporary hold created (short TTL) to prevent double-booking
4. Patient confirms (logged in or guest + contact info)
5. Booking confirmed → confirmation email/SMS sent
6. Reminder sent automatically (e.g., 24h prior) via background job
7. Patient or admin can cancel/reschedule per policy (e.g., min. 12h notice)

**Key concerns:**
- Conflict prevention via DB constraint + application-level locking
- All times stored in UTC, displayed in patient's local time zone
- Configurable rules: min notice, max advance booking, buffer time between appointments per doctor
- **Slot visibility:** the public availability endpoint returns only a taken/available status per slot — patient identity and reason/service are never included in that response, even to a logged-in patient viewing someone else's slot. Full details (who booked, cause) are only returned by the admin endpoint

## 11. Roles & Access Control

- RBAC with two roles for MVP: `patient`, `admin`
- Enforced server-side on every admin route via middleware/decorator
- Frontend route guards for UX only (redirect if wrong role) — never the actual security boundary
- Admin actions logged to audit log (who did what, when)
- **Admin data visibility (confirmed):** admin can see full appointment records, including patient identity and reason/service ("cause") for each booking. Regular users can only see whether a slot is taken or free — never who booked it or why. This is enforced at the API response level, not just hidden in the UI
- Admin interface accessibility (UI/a11y): semantic HTML, ARIA roles for tables/modals, full keyboard navigation, sufficient contrast — *nice-to-have for MVP, see Open Points*

## 12. Deployment Plan

- Local dev: `docker-compose.yml` spinning up frontend, backend, Postgres, Redis (for jobs) — one-command setup
- `.env.example` committed; real secrets never in repo
- Backend: multi-stage Dockerfile, served via Gunicorn + Uvicorn workers
- Frontend: static build → CDN (Vercel/Netlify/Cloudflare Pages)
- Backend hosting: Render/Railway/Fly.io (MVP-friendly) or Cloud Run (scales to zero)
- Managed Postgres (Supabase/Neon/RDS)
- Object storage: S3 or S3-compatible (e.g., Cloudflare R2)

## 13. CI/CD Pipeline

**On pull request:**
- Lint (Ruff/Black for backend, ESLint/Prettier for frontend)
- Unit tests (backend + frontend)
- Build check (frontend build, backend Docker image build)

**On merge to main:**
- Full test suite
- Build & push Docker image (tagged by commit SHA)
- Run DB migrations (Alembic) against staging
- Auto-deploy to staging
- Smoke/E2E tests (Playwright) against staging

**On release tag:**
- Manual approval gate
- Deploy to production
- Migration with backup + rollback plan
- Post-deploy health check with auto-rollback on failure
- Slack notification on deploy result

## 14. Non-Functional Requirements

- **Accessibility:** WCAG-AA baseline across public site; enhanced admin accessibility (see Open Points)
- **Performance:** booking flow should be usable on 3G/mid-tier mobile devices; images optimized/lazy-loaded in gallery
- **Security:** HTTPS everywhere, input validation, rate limiting on booking endpoint (prevent slot-spamming), patient data handled per applicable privacy regulations (see Open Points on compliance)
- **Reliability:** booking conflict prevention is a hard requirement (no double-booking)

## 15. Build Order / Milestones

1. Data model + API contract finalized
2. Backend: auth + Doctor/Service CRUD + basic public read endpoints
3. Frontend: public shell — Home, Services, Team, Gallery (static content first)
4. Backend: Availability engine + Appointment booking endpoints (conflict-safe)
5. Frontend: booking wizard wired end-to-end
6. Admin shell: appointment management, doctor/service/gallery CRUD
7. Notifications: confirmation + reminder emails/SMS via background jobs
8. Statistics dashboard (admin) + public trust stats
9. Polish: loading/error/empty states, PWA manifest, accessibility pass
10. CI/CD pipeline + staging deploy, then production

## 16. Open Points

**Resolved:**
- ~~Statistics feature scope~~ → Confirmed: public-facing, marketing-only rough numbers (procedures done, satisfied customers), not a live analytics dashboard
- ~~"Increased accessibility for admin"~~ → Confirmed: means admin sees full appointment details (who booked, reason); regular users only see taken/free status. Plus a new admin site-analytics view (traffic sources, session duration, popular pages)

**Still open:**
- [ ] **Analytics tool choice** — build a lightweight self-hosted tracker (more control, more work) vs. integrate a third-party tool like Plausible, Fathom, or GA4 (faster, but check data-privacy/cookie-consent implications for the practice's jurisdiction)
- [ ] **Referrer granularity** — is broad source categorization enough (social/search/direct/other), or does the practice want per-platform breakdown (Instagram vs. Facebook vs. TikTok, Google vs. Bing) from day one?
- [ ] **Statistic figures — update mechanism** — are these numbers entered manually by admin periodically, or semi-automated (e.g., admin clicks "recalculate from appointment records" but the public number stays rounded/approximate)?
- [ ] **Guest booking vs. account required** — can patients book without creating an account?
- [ ] **Before/after gallery photos** — consent/legal process for using patient images needs to be defined
- [ ] **Notification channels** — email only for MVP, or SMS too (adds Twilio cost/integration)?
- [ ] **Doctor-specific booking** — can patients pick a specific doctor, or just a service and get auto-assigned?
- [ ] **Cancellation/reschedule policy** — exact notice period and rules need to be defined by the practice
- [ ] **Payment integration** — is payment/deposit collected at booking time, or handled in-office only? (Out of scope for MVP unless specified)
- [ ] **Compliance** — depending on jurisdiction, patient health data (including appointment "cause") may fall under regulations (e.g., GDPR, or health-data-specific rules) — needs legal input, especially given admin now stores visit reasons
- [ ] **Multi-location support** — single office or multiple branches? Affects data model (Doctor/Availability would need location scoping)
- [ ] **Localization** — single language for MVP, or multi-language from the start?
- [ ] **Existing systems** — does the office already use a scheduling/EHR system this needs to integrate with or migrate away from?