# cimi — Dentist Office Web App

Initial project scaffold: a FastAPI backend and two Next.js frontends — a
desktop web app and a separate mobile-first web app — wired together, with
empty placeholder pages for every route in the MVP site map. See
[mvp.md](mvp.md) for the full product plan this is based on.

Both frontends are plain responsive web apps reached through a browser (no
app-store installs). The mobile one is patient-facing only (no `/admin`) and
uses a bottom tab bar + iOS safe-area handling instead of the desktop's top
nav.

No CI/CD deploy pipeline yet — [.github/workflows/validate.yml](.github/workflows/validate.yml)
only runs lint/type-check/config-validity checks. This README covers the
local pipeline (backend + frontends + Postgres + Redis) and a "hello world"
to prove the pieces talk to each other.

## Quick start

The bare minimum to get it running in a terminal. See further down for
what each step does, prerequisites, and troubleshooting. Every path below
lets you bring up the desktop frontend only, the mobile frontend only, or
both.

**With Docker:**

```bash
cp .env.example .env
docker compose --profile desktop up --build   # desktop only  → http://localhost:3000
docker compose --profile mobile up --build    # mobile only   → http://localhost:3001
docker compose --profile desktop --profile mobile up --build   # both
```

**Without Docker (macOS/Linux):**

```bash
cp .env.example .env
./utils/setup-backend-env.sh
./utils/setup-frontend-env.sh desktop   # or: mobile | both
./utils/start-all.sh desktop            # or: mobile | both
```

**Without Docker (Windows PowerShell):**

```powershell
Copy-Item .env.example .env
.\utils\setup-backend-env.ps1
.\utils\setup-frontend-env.ps1 desktop   # or: mobile | both
.\utils\start-all.ps1 desktop            # or: mobile | both
```

`Ctrl+C` stops everything either way. If Windows blocks the `.ps1` scripts
from running, see Troubleshooting below.

## Project structure

```
cimi/
├── backend/              FastAPI app
│   ├── app/
│   │   ├── main.py        # routes: /health, /api/v1/hello, /api/v1/status
│   │   └── core/config.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/              Desktop web app (App Router, TypeScript, Tailwind)
│   └── src/
│       ├── app/
│       │   ├── (public)/    # Home, Services, Team, Gallery, About, Book, Login, Account
│       │   └── admin/       # Dashboard, Appointments, Doctors, Services, Availability, Gallery, Audit Log
│       ├── components/
│       └── lib/api.ts       # backend fetch helper (used by the home page)
├── frontend-mobile/       Mobile web app — same backend, patient-facing only
│   └── src/
│       ├── app/            # Home, Services, Team, Gallery, About, Book, Login, Account
│       ├── components/     # TopBar, BottomNav (mobile-first shell)
│       └── lib/api.ts
├── utils/                 Scripts for setting up + starting everything locally, without Docker
│   ├── requirements.txt
│   ├── setup-backend-env.sh    # creates a venv or conda env, installs backend deps
│   ├── setup-frontend-env.sh   # npm install — desktop | mobile | both
│   ├── start-backend.sh
│   ├── start-frontend.sh       # desktop | mobile
│   ├── start-all.sh            # desktop | mobile | both (default)
│   └── *.ps1                   # PowerShell twin of every .sh script above, same names/args, for Windows
├── docker-compose.yml     # backend + postgres + redis + both frontends (profile-gated)
├── .env.example
└── mvp.md
```

## Prerequisites

- **Docker + Docker Compose** — for the containerized path (recommended; matches the deployment plan in [mvp.md §12](mvp.md#12-deployment-plan))
- **or**, for the no-Docker path: Python 3.12+ and Node.js 20+ (`venv` or `conda` for the Python side — `utils/setup-backend-env.sh` auto-detects which you have)

Nothing installs itself — every install step below is a command you run
yourself.

## 1. Configure environment variables

```bash
cp .env.example .env
```

The defaults work out of the box for both paths below. See the comments in
[.env.example](.env.example) for what each variable does — the short version
is `docker-compose.yml` overrides `DATABASE_URL`/`REDIS_URL`/`API_URL` to
point at container hostnames (`postgres`, `redis`, `backend`) automatically;
you don't need to edit `.env` for that.

## 2. Run it — pick one

### Option A: Docker Compose

`frontend-desktop` and `frontend-mobile` are gated behind Compose
[profiles](https://docs.docker.com/compose/how-tos/profiles/) so you choose
which one(s) start — `backend`/`postgres`/`redis` always start regardless.

```bash
docker compose --profile desktop up --build                    # desktop only
docker compose --profile mobile up --build                     # mobile only
docker compose --profile desktop --profile mobile up --build   # both
```

First run installs everything inside the containers (nothing on your host
machine). Leave it running in the terminal; `Ctrl+C` stops it.

### Option B: Locally, no Docker

Install dependencies (you run these — they don't run automatically):

```bash
./utils/setup-backend-env.sh              # creates backend/.venv (or a conda env, if you have conda)
./utils/setup-frontend-env.sh desktop     # npm install in frontend/
./utils/setup-frontend-env.sh mobile      # npm install in frontend-mobile/
# or: ./utils/setup-frontend-env.sh both  # installs both in one go
```

`setup-backend-env.sh` picks conda automatically if it's on your `PATH`,
otherwise falls back to `venv`. Force one explicitly:

```bash
CIMI_ENV_TOOL=conda ./utils/setup-backend-env.sh
CIMI_ENV_TOOL=venv  ./utils/setup-backend-env.sh
```

Then start the backend plus whichever frontend(s) you want, together:

```bash
./utils/start-all.sh desktop   # backend + desktop frontend
./utils/start-all.sh mobile    # backend + mobile frontend
./utils/start-all.sh both      # backend + both frontends (also the default with no argument)
```

...or in separate terminals if you want independent logs:

```bash
./utils/start-backend.sh              # http://localhost:8000
./utils/start-frontend.sh desktop     # http://localhost:3000
./utils/start-frontend.sh mobile      # http://localhost:3001
```

**On Windows**, every script above has a `.ps1` twin with the same name and
arguments — run them from PowerShell (not `cmd.exe`) from the repo root:

```powershell
.\utils\setup-backend-env.ps1
.\utils\setup-frontend-env.ps1 desktop     # or: mobile | both

.\utils\start-all.ps1 desktop              # or: mobile | both
# ...or individually, in separate windows, for independent logs:
.\utils\start-backend.ps1                  # http://localhost:8000
.\utils\start-frontend.ps1 desktop         # http://localhost:3000
.\utils\start-frontend.ps1 mobile          # http://localhost:3001
```

`setup-backend-env.ps1` auto-detects conda the same way; force one with
`$env:CIMI_ENV_TOOL = "conda"` / `"venv"` before running it.
`start-all.ps1` runs the backend/frontend(s) as PowerShell background jobs
in the same window rather than backgrounded shell processes — functionally
equivalent, `Ctrl+C` still stops everything.

Note: without Docker there's no local Postgres/Redis running unless you
start your own — that's fine for the hello-world check below, since only
`/api/v1/status` touches those two.

## 3. Verify the hello-world pipeline

**Backend directly:**

```bash
curl http://localhost:8000/health          # {"status":"ok"}
curl http://localhost:8000/api/v1/hello    # {"message":"Hello World from FastAPI"}
curl http://localhost:8000/api/v1/status   # db/redis connectivity — "ok" once Postgres+Redis are up
```

Auto-generated API docs: http://localhost:8000/docs

**Frontend → backend, end to end:**

Open http://localhost:3000 (desktop) and/or http://localhost:3001 (mobile)
— whichever you started. Each home page fetches `/api/v1/hello` from the
backend on the server side and renders it in a box labeled "Backend says:".
Green border + `Hello World from FastAPI` means the full chain
(browser → Next.js server → FastAPI) is wired correctly for that frontend. A
red box means it couldn't reach the backend — check that the backend is
actually running and that `API_URL` in `.env` (or the container env, if
using Docker) points at it.

Every other route is an intentionally empty placeholder — click around to
confirm routing:
- Desktop (`/services`, `/team`, `/gallery`, `/about`, `/book`, `/login`, `/account`, and everything under `/admin`) — two layout shells (public nav vs. admin sidebar).
- Mobile (`/services`, `/team`, `/gallery`, `/about`, `/book`, `/login`, `/account`) — bottom tab bar + top bar shell, no admin section.

## Troubleshooting

- **`docker compose up` fails with "no configuration file"** — run it from the repo root (where `docker-compose.yml` lives).
- **`docker compose up` starts backend/db but no frontend** — you need at least one `--profile` flag (`desktop`, `mobile`, or both); frontends don't start without one.
- **Frontend home page shows the red "could not reach backend" box under Docker** — confirm the `backend` service is healthy (`docker compose ps`); the frontend containers reach it via `http://backend:8000`, not `localhost`.
- **`./utils/start-backend.sh` says "No environment found"** — run `./utils/setup-backend-env.sh` first.
- **`./utils/start-frontend.sh <target>` says "node_modules not found"** — run `./utils/setup-frontend-env.sh <target>` first.
- **Port already in use (5432/6379/8000/3000/3001)** — something else on your machine is bound to it; stop that process or change the port mapping in `docker-compose.yml` / the `--port` in `utils/start-frontend.sh` (or `.ps1` equivalent).
- **PowerShell refuses to run the `.ps1` scripts** ("running scripts is disabled on this system") — one-time fix, from an elevated or regular PowerShell prompt: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.

## What's intentionally not here yet

CI/CD deploy pipeline, database migrations (Alembic), real data models,
auth, the booking engine, and real PWA icons for the mobile app (see the
TODO in `frontend-mobile/src/app/manifest.ts`) — see
[mvp.md §15](mvp.md#15-build-order--milestones) for the intended build
order from here.
