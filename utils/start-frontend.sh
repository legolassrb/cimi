#!/usr/bin/env bash
# Starts the Next.js dev server locally (no Docker).
# Assumes utils/setup-frontend-env.sh has already been run.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR/frontend"

if [[ ! -d node_modules ]]; then
  echo "frontend/node_modules not found. Run ./utils/setup-frontend-env.sh first." >&2
  exit 1
fi

echo "==> Starting frontend dev server on http://localhost:3000"
exec npm run dev
