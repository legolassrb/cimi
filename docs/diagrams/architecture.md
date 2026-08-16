# Architecture — as of 2026-08-16

Partially built. The runtime shape (two frontends, one backend, Postgres, Redis, all wired through `docker-compose.yml`) is real and running — but the backend is currently just three infrastructure endpoints (`/health`, `/api/v1/hello`, `/api/v1/status`); no domain routes, no data model, no auth, no background jobs, and no object storage exist in code yet, despite all being planned in `mvp.md`. Nodes below marked **(planned)** are dashed and reflect `mvp.md`, not implemented code — see `todo.md` for the full built-vs-planned breakdown.

## System overview

```mermaid
flowchart LR
    subgraph client["Client (browser)"]
        desktop["Desktop web\nfrontend/ — Next.js\n:3000"]
        mobile["Mobile web\nfrontend-mobile/ — Next.js\n:3001"]
    end

    subgraph pipeline["docker-compose.yml (profiles: desktop, mobile)"]
        backend["Backend\nbackend/ — FastAPI\n:8000"]
        postgres[("Postgres 16")]
        redis[("Redis 7")]
    end

    subgraph future["Not yet built"]
        jobs["Background jobs\n(reminders, slot-hold TTL)"]:::planned
        storage["Object storage\n(S3/R2 — gallery, doctor photos)"]:::planned
    end

    desktop -- "SSR fetch GET /api/v1/hello" --> backend
    mobile -- "SSR fetch GET /api/v1/hello" --> backend
    backend -- "SELECT 1 (SQLAlchemy async engine)" --> postgres
    backend -- "PING (redis.asyncio)" --> redis
    backend -. "planned: enqueue reminder/hold jobs" .-> jobs
    backend -. "planned: presigned upload URLs" .-> storage

    classDef planned stroke-dasharray: 5 5,fill:#f5f5f5,color:#888
```

`/api/v1/status` is the only route that actually talks to Postgres/Redis today — it's a readiness probe, not a data endpoint. Desktop additionally has an `admin/` route tree (see `frontend/src/app/admin/`) with no backend counterpart yet — those pages are static stubs with no API calls.

## Data model

Not implemented in code — `backend/app/main.py` has no SQLAlchemy models, only a raw `create_async_engine` used for the `/api/v1/status` connectivity check. The diagram below is `mvp.md §6`'s planned schema, included per that confirmation, not because it exists yet.

```mermaid
erDiagram
    USER ||--o{ APPOINTMENT : books
    DOCTOR ||--o{ APPOINTMENT : assigned_to
    SERVICE ||--o{ APPOINTMENT : "booked for"
    DOCTOR ||--o{ AVAILABILITY : "has schedule rules"
    USER ||--o{ AUDIT_LOG : "performs (admin)"
    USER ||--o{ GALLERY_ITEM : uploaded_by

    USER {
        uuid id
        string role "patient | admin"
        string email
    }
    DOCTOR {
        uuid id
        string specialty
        bool active
    }
    SERVICE {
        uuid id
        string category
        int duration_minutes
    }
    AVAILABILITY {
        uuid doctor_id
        string day_of_week_or_date
        time start_time
        time end_time
    }
    APPOINTMENT {
        uuid id
        uuid patient_id
        uuid doctor_id
        uuid service_id
        datetime start_time
        string status "pending|confirmed|cancelled|completed"
    }
    GALLERY_ITEM {
        uuid id
        string category
        string image_url
    }
    STATISTIC_SNAPSHOT {
        uuid id
        string label
        string value
    }
    AUDIT_LOG {
        uuid id
        uuid admin_id
        string action
    }
```

---
Reflects commit: 7d5577dfa0d002b1bd5a52e441c82981d23e6557
