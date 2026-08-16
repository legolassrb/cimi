#!/usr/bin/env bash
# Starts backend + frontend together, locally (no Docker), for whoever doesn't
# want to run docker compose. Requires both environments to already be set up:
#   ./utils/setup-backend-env.sh
#   ./utils/setup-frontend-env.sh
#
# For the Docker Compose based "everything in containers" path instead, see
# the README — that's just `docker compose up` and doesn't use this script.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

pids=()
cleanup() {
  echo
  echo "==> Shutting down..."
  for pid in "${pids[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT INT TERM

"$ROOT_DIR/utils/start-backend.sh" &
pids+=("$!")

# give the backend a moment's head start before the frontend boots
sleep 2

"$ROOT_DIR/utils/start-frontend.sh" &
pids+=("$!")

echo "==> Backend:  http://localhost:8000"
echo "==> Frontend: http://localhost:3000"
echo "==> Press Ctrl+C to stop both."

wait
