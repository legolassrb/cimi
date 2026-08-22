<#
.SYNOPSIS
Starts the FastAPI dev server locally (no Docker).
Assumes utils\setup-backend-env.ps1 has already been run.

PowerShell twin of start-backend.sh; keep both in sync if you change one.
#>

$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $PSScriptRoot
$VenvDir = Join-Path $RootDir "backend\.venv"
$UvicornExe = Join-Path $VenvDir "Scripts\uvicorn.exe"

Set-Location (Join-Path $RootDir "backend")

$useConda = $false
if ($env:CIMI_ENV_TOOL -eq "conda") {
    $useConda = $true
} elseif ([string]::IsNullOrEmpty($env:CIMI_ENV_TOOL) -and (Get-Command conda -ErrorAction SilentlyContinue)) {
    $existingEnvs = conda env list
    if ($existingEnvs -match "^\s*cimi-backend\s") {
        $useConda = $true
    }
}

if ($useConda) {
    Write-Host "==> Starting backend via conda env 'cimi-backend'"
    conda run -n cimi-backend --no-capture-output uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
} elseif (Test-Path $UvicornExe) {
    Write-Host "==> Starting backend via backend\.venv"
    & $UvicornExe app.main:app --host 0.0.0.0 --port 8000 --reload
} else {
    Write-Error "No environment found. Run .\utils\setup-backend-env.ps1 first."
    exit 1
}
