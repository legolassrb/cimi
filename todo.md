# Coverage vs. mvp.md — TODO

Status of the implementation against [mvp.md](mvp.md), as of commits
`7f66b3e` (initial scaffold) and `f69bc83` (mobile frontend).

**Legend:** 🟢 done/matches the doc · 🟡 partially covered — scaffolded but not built out · 🔴 not started

## ⚠️ Known gaps in what's actually committed

- **`docker-compose.yml`'s mobile wiring isn't committed.** The `frontend-mobile` service, its `profiles`, and the widened `CORS_ORIGINS` only exist in the working tree (`git status` shows the file modified, unstaged). On a fresh clone of `f69bc83`, `docker compose --profile mobile up` fails — the service doesn't exist yet.
- **`.env.example` has never been committed**, in either commit. On a fresh clone, step 1 of the README (`cp .env.example .env`) fails.
- Fix: `git add docker-compose.yml .env.example` (and `.gitignore`, if the `.DS_Store` fix from earlier isn't in yet either) and commit.

## §4.1 Public pages — 🟡 routed, not built

Every route exists on both frontend and frontend-mobile (`/services`, `/team`,
`/gallery`, `/about`, `/book`, `/login`, `/account`) but each is an empty
`PageStub` — no real content, no data fetching beyond the home page's
hello-world check. Concretely missing:
- Services list/detail — no `Service` data, no category grouping
- Doctor profile cards — no `Doctor` data, no bios/credentials
- Statistics/trust numbers — no `StatisticSnapshot` data
- Booking wizard — no service→doctor→slot→confirm flow at all
- Gallery grid — no images, no lightbox, no filtering
- Patient account — no upcoming/past appointments view, no reschedule/cancel

## §4.2 Admin mode — 🟡 routed (desktop only), not built

Admin page stubs exist under `frontend/src/app/admin/*` (Dashboard,
Appointments, Doctors, Services, Availability, Gallery, Audit Log) but none
have CRUD logic, real appointment data, internal stats, or the site-traffic
analytics view described in the doc. By design, `frontend-mobile` has **no**
admin section at all (office staff are assumed desktop users).

## §5 Site map — 🟢 matches closely

The best-covered section so far. Desktop's routes are essentially a 1:1
match to the doc's public + admin tree ([mvp.md §5](mvp.md#5-information-architecture-site-map)).
Mobile deliberately covers only the public/patient subset.

## §6 Data model — 🔴 not started

No `User`, `Doctor`, `Service`, `Availability`, `Appointment`,
`GalleryItem`, `StatisticSnapshot`, `AuditLog`, or `PageView`/`Session`
tables. No SQLAlchemy models, no Alembic migrations, no database schema at
all beyond an empty Postgres container. This is Milestone 1 in
[mvp.md §15](mvp.md#15-build-order--milestones) and hasn't been started,
even though later-milestone frontend/infra work has.

## §7 Architecture overview — 🟡 skeleton only

Container topology matches the doc's diagram (client ↔ API ↔ Postgres, plus
Redis) and is health-checked end to end via `/api/v1/status`. Missing:
- No real REST endpoints beyond `/health`, `/api/v1/hello`, `/api/v1/status`
- No background jobs (Redis is present but nothing uses it yet — no reminder jobs, no slot-hold TTLs)
- No object storage wiring (S3/R2) for gallery/doctor photos

## §8 Frontend plan — 🟡 partial

- Framework choice (Next.js + Tailwind) ✅
- Two layout shells (public/patient vs. admin) ✅ on desktop
- PWA manifest ✅ on mobile only (`frontend-mobile/src/app/manifest.ts` + apple-web-app meta tags) — desktop has no PWA manifest at all, and mobile's icons are still a TODO (referenced inline in that file)
- "Key components" from the doc — service/doctor cards, gallery lightbox, booking wizard, slot picker, admin data tables — **none built**, just page-level stubs

## §9 Backend plan — 🔴 mostly not started

FastAPI is set up, and `pydantic-settings` is used for config — that's it.
Missing everything else the doc specifies:
- No layered structure (routes/services/models split) — everything's in one `main.py`
- No SQLAlchemy domain models (the engine only runs a `SELECT 1` health check)
- No `/api/v1/admin/...` namespace or role-enforced middleware
- No auth (JWT/session/OAuth) — there is no `User` concept yet at all
- No Pydantic request/response schemas (nothing to validate yet — no domain entities)
- No file upload handling, no site-analytics integration

## §10 Appointment booking detail — 🔴 not started

No slot generation, no hold/TTL mechanism, no conflict-prevention DB
constraint, no timezone handling. The `/book` route is a stub with no logic
behind it.

## §11 Roles & access control — 🔴 not started

No RBAC, no auth middleware, no audit logging. **Note:** because there's no
auth layer yet, the admin route stubs are currently reachable by anyone —
not a live risk today (no real data behind them), but this needs to land
before any real admin functionality does, per the doc's own emphasis that
enforcement must be server-side, not just hidden in the UI ([mvp.md §11](mvp.md#11-roles--access-control)).

## §12 Deployment plan — 🟡 partial (see gaps above)

- `docker-compose.yml` one-command local setup is real in spirit, but see
  the "known gaps" section above — the mobile half of it isn't committed yet
- Backend Dockerfile is single-stage and runs `uvicorn --reload` directly —
  fine for dev, not the multi-stage/Gunicorn+Uvicorn setup the doc describes for production
- Frontend Dockerfiles run `next dev`, not a production build
- No cloud provisioning yet (hosting, managed Postgres, object storage) — expected at this stage, out of scope for a local scaffold

## §13 CI/CD pipeline — 🟡 partial, intentionally

`.github/workflows/validate.yml` covers only the "Lint" bullet of the doc's
"On pull request" list (backend: ruff + compileall; frontend: eslint + tsc,
across both apps; plus a `docker compose config` validity check). No unit
tests (deliberately, per your request), no build-image step, and nothing
from "On merge to main" or "On release tag" — no staging deploy, no
production deploy, no migrations, no rollback.

## §14 Non-functional requirements — 🔴 not started

No accessibility pass, no rate limiting, no double-booking constraint
(there's nothing to double-book yet). Expected — downstream of real feature
work landing first.

## §15 Build order — where things actually stand

The doc orders work as: data model → backend CRUD → public shell → booking
engine → booking UI → admin shell → notifications → stats → polish → CI/CD.
What's actually happened is roughly the *opposite* of that ordering so far
— frontend/infra shape landed first, before Milestone 1 (data model):

1. Data model + API contract — 🔴
2. Backend auth + Doctor/Service CRUD — 🔴
3. Frontend public shell (Home/Services/Team/Gallery) — 🟡 shell exists, no real content
4. Availability engine + booking endpoints — 🔴
5. Booking wizard wired end-to-end — 🔴
6. Admin shell + CRUD — 🟡 shell exists (desktop only), no CRUD
7. Notifications — 🔴
8. Statistics dashboard — 🔴
9. Polish (loading/error states, PWA, accessibility) — 🟡 partial (basic reachability error state on home pages; PWA on mobile only; no accessibility pass)
10. CI/CD + staging/production deploy — 🟡 lint-only, no deploy

**Suggested next step, if following the doc's own ordering:** start on
§6's data model (SQLAlchemy models + Alembic) and §9's layered backend
structure — that's the one piece every later milestone (booking, admin
CRUD, stats) actually depends on.

## §16 Open points — 🔴 untouched

None of these require code — they're still your product decisions to make:
analytics tool choice, referrer granularity, statistic-figure update
mechanism, guest booking, before/after photo consent process, notification
channels (email vs. SMS), doctor-specific booking, cancellation/reschedule
policy, payment integration, compliance (GDPR/health-data), multi-location
support, localization, and any existing system to integrate with. See
[mvp.md §16](mvp.md#16-open-points) for the full list.
