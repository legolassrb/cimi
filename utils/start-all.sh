#!/usr/bin/env bash
# Starts backend + one or both frontends together, locally (no Docker).
# Requires the matching environments to already be set up:
#   ./utils/setup-backend-env.sh
#   ./utils/setup-frontend-env.sh [desktop|mobile|both]
#
# Usage:
#   ./utils/start-all.sh            # backend + both frontends (default)
#   ./utils/start-all.sh desktop    # backend + desktop frontend only
#   ./utils/start-all.sh mobile     # backend + mobile frontend only
#   ./utils/start-all.sh both
#
# For the Docker Compose based "everything in containers" path instead, see
# the README — that uses `docker compose --profile ... up` and doesn't use
# this script.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${1:-both}"

case "$TARGET" in
  desktop|mobile|both) ;;
  *)
    echo "Unknown target '$TARGET' (expected: desktop | mobile | both)" >&2
    exit 1
    ;;
esac

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

# give the backend a moment's head start before any frontend boots
sleep 2

if [[ "$TARGET" == "desktop" || "$TARGET" == "both" ]]; then
  "$ROOT_DIR/utils/start-frontend.sh" desktop &
  pids+=("$!")
  echo "==> Desktop frontend: http://localhost:3000"
fi

if [[ "$TARGET" == "mobile" || "$TARGET" == "both" ]]; then
  "$ROOT_DIR/utils/start-frontend.sh" mobile &
  pids+=("$!")
  echo "==> Mobile frontend:  http://localhost:3001"
fi

echo "==> Backend:          http://localhost:8000"
echo "==> Press Ctrl+C to stop everything."

wait
