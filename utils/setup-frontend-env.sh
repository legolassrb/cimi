#!/usr/bin/env bash
# Installs frontend (Next.js) dependencies locally via npm.
# Nothing runs automatically — you run this yourself when you're ready to install.
#
# Usage:
#   ./utils/setup-frontend-env.sh            # installs both (default)
#   ./utils/setup-frontend-env.sh desktop
#   ./utils/setup-frontend-env.sh mobile
#   ./utils/setup-frontend-env.sh both

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${1:-both}"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed / not on PATH. Install Node.js (>=20) first." >&2
  exit 1
fi

install_one() {
  local dir="$1"
  echo "==> Installing dependencies in $dir"
  cd "$ROOT_DIR/$dir"
  npm install
}

case "$TARGET" in
  desktop) install_one frontend ;;
  mobile)  install_one frontend-mobile ;;
  both)    install_one frontend; install_one frontend-mobile ;;
  *)
    echo "Unknown target '$TARGET' (expected: desktop | mobile | both)" >&2
    exit 1
    ;;
esac

echo
echo "Done."
