#!/usr/bin/env bash
# Installs frontend (Next.js) dependencies locally via npm.
# Nothing runs automatically — you run this yourself when you're ready to install.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed / not on PATH. Install Node.js (>=20) first." >&2
  exit 1
fi

echo "==> Installing frontend dependencies (frontend/node_modules)"
cd "$ROOT_DIR/frontend"
npm install

echo
echo "Done."
