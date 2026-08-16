#!/usr/bin/env bash
# Starts the FastAPI dev server locally (no Docker).
# Assumes utils/setup-backend-env.sh has already been run.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="$ROOT_DIR/backend/.venv"

cd "$ROOT_DIR/backend"

if [[ "${CIMI_ENV_TOOL:-}" == "conda" ]] || { [[ -z "${CIMI_ENV_TOOL:-}" ]] && command -v conda >/dev/null 2>&1 && conda env list | grep -qE "^\s*cimi-backend\s"; }; then
  echo "==> Starting backend via conda env 'cimi-backend'"
  exec conda run -n cimi-backend --no-capture-output uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
elif [[ -x "$VENV_DIR/bin/uvicorn" ]]; then
  echo "==> Starting backend via backend/.venv"
  exec "$VENV_DIR/bin/uvicorn" app.main:app --host 0.0.0.0 --port 8000 --reload
else
  echo "No environment found. Run ./utils/setup-backend-env.sh first." >&2
  exit 1
fi
