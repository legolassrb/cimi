<#
.SYNOPSIS
Creates an isolated local Python environment for the backend (no Docker involved)
and installs the packages listed in utils\requirements.txt into it.

Auto-detects which tool to use:
  - if `conda` is on PATH, creates/reuses a conda env named `cimi-backend`
  - otherwise falls back to a plain venv at backend\.venv

Force one or the other:
  $env:CIMI_ENV_TOOL = "conda"; .\utils\setup-backend-env.ps1
  $env:CIMI_ENV_TOOL = "venv";  .\utils\setup-backend-env.ps1

Nothing here runs automatically — you run this script yourself when you're
ready to install. This is the PowerShell twin of setup-backend-env.sh; keep
both in sync if you change one.
#>

$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $PSScriptRoot
$RequirementsFile = Join-Path $RootDir "utils\requirements.txt"
$CondaEnvName = "cimi-backend"
$VenvDir = Join-Path $RootDir "backend\.venv"

$Tool = $env:CIMI_ENV_TOOL
if ([string]::IsNullOrEmpty($Tool)) {
    if (Get-Command conda -ErrorAction SilentlyContinue) {
        $Tool = "conda"
    } else {
        $Tool = "venv"
    }
}

Write-Host "==> Using: $Tool"

if ($Tool -eq "conda") {
    if (-not (Get-Command conda -ErrorAction SilentlyContinue)) {
        Write-Error "conda was requested but is not installed / not on PATH."
        exit 1
    }

    $existingEnvs = conda env list
    if ($existingEnvs -match "^\s*$CondaEnvName\s") {
        Write-Host "==> Reusing existing conda env '$CondaEnvName'"
    } else {
        Write-Host "==> Creating conda env '$CondaEnvName' (python 3.12)"
        conda create -y -n $CondaEnvName python=3.12
    }

    Write-Host "==> Installing requirements into '$CondaEnvName'"
    conda run -n $CondaEnvName pip install -r $RequirementsFile

    Write-Host ""
    Write-Host "Done. Activate with:"
    Write-Host "  conda activate $CondaEnvName"

} elseif ($Tool -eq "venv") {
    if (-not (Test-Path $VenvDir)) {
        Write-Host "==> Creating venv at backend\.venv"
        $pythonCmd = Get-Command python -ErrorAction SilentlyContinue
        if (-not $pythonCmd) { $pythonCmd = Get-Command py -ErrorAction SilentlyContinue }
        if (-not $pythonCmd) {
            Write-Error "Python not found on PATH (tried 'python' and 'py'). Install Python 3.12+ first."
            exit 1
        }
        & $pythonCmd.Source -m venv $VenvDir
    } else {
        Write-Host "==> Reusing existing venv at backend\.venv"
    }

    Write-Host "==> Installing requirements"
    & "$VenvDir\Scripts\pip.exe" install -r $RequirementsFile

    Write-Host ""
    Write-Host "Done. Activate with:"
    Write-Host "  backend\.venv\Scripts\Activate.ps1"

} else {
    Write-Error "Unknown CIMI_ENV_TOOL='$Tool' (expected 'conda' or 'venv')"
    exit 1
}
