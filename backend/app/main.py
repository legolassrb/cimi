from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from redis.asyncio import Redis

from app.core.config import settings

app = FastAPI(title="Dentist Office API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_engine = create_async_engine(settings.database_url)
_redis = Redis.from_url(settings.redis_url)


@app.get("/health")
async def health():
    """Liveness check — does the API process respond at all."""
    return {"status": "ok"}


@app.get("/api/v1/hello")
async def hello():
    """The 'hello world' endpoint used to verify frontend <-> backend wiring."""
    return {"message": "Hello World from FastAPI"}


@app.get("/api/v1/status")
async def status():
    """Readiness check — confirms the API can actually reach Postgres and Redis,
    i.e. that the full docker-compose pipeline (not just the API process) is up."""
    checks = {"database": "unreachable", "redis": "unreachable"}

    try:
        async with _engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        checks["database"] = "ok"
    except Exception as exc:
        checks["database"] = f"error: {exc}"

    try:
        await _redis.ping()
        checks["redis"] = "ok"
    except Exception as exc:
        checks["redis"] = f"error: {exc}"

    return checks
