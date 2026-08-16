#!/usr/bin/env bash
# Creates an isolated local Python environment for the backend (no Docker involved)
# and installs the packages listed in utils/requirements.txt into it.
#
# Auto-detects which tool to use:
#   - if `conda` is on PATH, creates/reuses a conda env named `cimi-backend`
#   - otherwise falls back to a plain venv at backend/.venv
#
# Force one or the other:
#   CIMI_ENV_TOOL=conda ./utils/setup-backend-env.sh
#   CIMI_ENV_TOOL=venv  ./utils/setup-backend-env.sh
#
# Nothing here runs automatically — you run this script yourself when you're
# ready to install.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REQUIREMENTS_FILE="$ROOT_DIR/utils/requirements.txt"
CONDA_ENV_NAME="cimi-backend"
VENV_DIR="$ROOT_DIR/backend/.venv"

TOOL="${CIMI_ENV_TOOL:-}"

if [[ -z "$TOOL" ]]; then
  if command -v conda >/dev/null 2>&1; then
    TOOL="conda"
  else
    TOOL="venv"
  fi
fi

echo "==> Using: $TOOL"

if [[ "$TOOL" == "conda" ]]; then
  if ! command -v conda >/dev/null 2>&1; then
    echo "conda was requested but is not installed / not on PATH." >&2
    exit 1
  fi

  if conda env list | grep -qE "^\s*${CONDA_ENV_NAME}\s"; then
    echo "==> Reusing existing conda env '$CONDA_ENV_NAME'"
  else
    echo "==> Creating conda env '$CONDA_ENV_NAME' (python 3.12)"
    conda create -y -n "$CONDA_ENV_NAME" python=3.12
  fi

  echo "==> Installing requirements into '$CONDA_ENV_NAME'"
  conda run -n "$CONDA_ENV_NAME" pip install -r "$REQUIREMENTS_FILE"

  echo
  echo "Done. Activate with:"
  echo "  conda activate $CONDA_ENV_NAME"

elif [[ "$TOOL" == "venv" ]]; then
  if [[ ! -d "$VENV_DIR" ]]; then
    echo "==> Creating venv at backend/.venv"
    python3 -m venv "$VENV_DIR"
  else
    echo "==> Reusing existing venv at backend/.venv"
  fi

  echo "==> Installing requirements"
  "$VENV_DIR/bin/pip" install -r "$REQUIREMENTS_FILE"

  echo
  echo "Done. Activate with:"
  echo "  source backend/.venv/bin/activate"

else
  echo "Unknown CIMI_ENV_TOOL='$TOOL' (expected 'conda' or 'venv')" >&2
  exit 1
fi
