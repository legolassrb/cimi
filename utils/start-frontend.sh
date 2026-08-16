#!/usr/bin/env bash
# Starts one Next.js dev server locally (no Docker).
# Assumes utils/setup-frontend-env.sh has already been run for the same target.
#
# Usage:
#   ./utils/start-frontend.sh desktop   # http://localhost:3000
#   ./utils/start-frontend.sh mobile    # http://localhost:3001

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${1:?Usage: start-frontend.sh <desktop|mobile>}"

case "$TARGET" in
  desktop) DIR="frontend"; PORT=3000 ;;
  mobile)  DIR="frontend-mobile"; PORT=3001 ;;
  *)
    echo "Unknown target '$TARGET' (expected: desktop | mobile)" >&2
    exit 1
    ;;
esac

cd "$ROOT_DIR/$DIR"

if [[ ! -d node_modules ]]; then
  echo "$DIR/node_modules not found. Run ./utils/setup-frontend-env.sh $TARGET first." >&2
  exit 1
fi

echo "==> Starting $TARGET frontend on http://localhost:$PORT"
exec npm run dev -- --port "$PORT"
