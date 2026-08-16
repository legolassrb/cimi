# cimi — Dentist Office Web App

Initial project scaffold: a FastAPI backend and a Next.js frontend, wired
together, with empty placeholder pages for every route in the MVP site map.
See [mvp.md](mvp.md) for the full product plan this is based on.

No CI/CD yet — this is just the local pipeline (backend + frontend +
Postgres + Redis) and a "hello world" to prove the pieces talk to each
other.

## Quick start

The bare minimum to get it running in a terminal. See further down for
what each step does, prerequisites, and troubleshooting.

**With Docker (full pipeline — backend, frontend, Postgres, Redis):**

```bash
cp .env.example .env
docker compose up --build
```

Then open http://localhost:3000.

**Without Docker (backend + frontend only, run directly on your machine):**

```bash
cp .env.example .env
./utils/setup-backend-env.sh
./utils/setup-frontend-env.sh
./utils/start-all.sh
```

Then open http://localhost:3000. `Ctrl+C` stops both servers.

## Project structure

```
cimi/
├── backend/            FastAPI app
│   ├── app/
│   │   ├── main.py      # routes: /health, /api/v1/hello, /api/v1/status
│   │   └── core/config.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/            Next.js app (App Router, TypeScript, Tailwind)
│   └── src/
│       ├── app/
│       │   ├── (public)/    # Home, Services, Team, Gallery, About, Book, Login, Account
│       │   └── admin/       # Dashboard, Appointments, Doctors, Services, Availability, Gallery, Audit Log
│       ├── components/
│       └── lib/api.ts       # backend fetch helper (used by the home page)
├── utils/               Scripts for setting up + starting everything locally, without Docker
│   ├── requirements.txt
│   ├── setup-backend-env.sh   # creates a venv or conda env, installs backend deps
│   ├── setup-frontend-env.sh  # npm install
│   ├── start-backend.sh
│   ├── start-frontend.sh
│   └── start-all.sh
├── docker-compose.yml   # backend + frontend + postgres + redis, one command
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

### Option A: Docker Compose (the full pipeline: backend + frontend + Postgres + Redis)

```bash
docker compose up --build
```

This builds both images and starts all four services. First run installs
everything inside the containers (nothing on your host machine). Leave it
running in the terminal; `Ctrl+C` stops it.

### Option B: Locally, no Docker

Install dependencies (you run these — they don't run automatically):

```bash
./utils/setup-backend-env.sh    # creates backend/.venv (or a conda env, if you have conda)
./utils/setup-frontend-env.sh   # npm install in frontend/
```

`setup-backend-env.sh` picks conda automatically if it's on your `PATH`,
otherwise falls back to `venv`. Force one explicitly:

```bash
CIMI_ENV_TOOL=conda ./utils/setup-backend-env.sh
CIMI_ENV_TOOL=venv  ./utils/setup-backend-env.sh
```

Then start both dev servers together:

```bash
./utils/start-all.sh
```

...or in separate terminals if you want independent logs:

```bash
./utils/start-backend.sh    # http://localhost:8000
./utils/start-frontend.sh   # http://localhost:3000
```

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

Open http://localhost:3000 — the home page fetches `/api/v1/hello` from the
backend on the server side and renders it in a box labeled "Backend says:".
Green border + `Hello World from FastAPI` means the full chain
(browser → Next.js server → FastAPI) is wired correctly. A red box means the
frontend couldn't reach the backend — check that the backend is actually
running and that `API_URL` in `.env` (or the container env, if using Docker)
points at it.

Every other route in the nav (`/services`, `/team`, `/gallery`, `/about`,
`/book`, `/login`, `/account`, and everything under `/admin`) is an
intentionally empty placeholder — click around to confirm routing and the
two layout shells (public nav vs. admin sidebar) both render.

## Troubleshooting

- **`docker compose up` fails with "no configuration file"** — run it from the repo root (where `docker-compose.yml` lives).
- **Frontend home page shows the red "could not reach backend" box under Docker** — confirm the `backend` service is healthy (`docker compose ps`); the frontend container reaches it via `http://backend:8000`, not `localhost`.
- **`./utils/start-backend.sh` says "No environment found"** — run `./utils/setup-backend-env.sh` first.
- **`./utils/start-frontend.sh` says "node_modules not found"** — run `./utils/setup-frontend-env.sh` first.
- **Port already in use (5432/6379/8000/3000)** — something else on your machine is bound to it; stop that process or change the port mapping in `docker-compose.yml`.

## What's intentionally not here yet

CI/CD, database migrations (Alembic), real data models, auth, and the
booking engine — see [mvp.md §15](mvp.md#15-build-order--milestones) for the
intended build order from here.
