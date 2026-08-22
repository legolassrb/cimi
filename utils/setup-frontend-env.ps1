<#
.SYNOPSIS
Installs frontend (Next.js) dependencies locally via npm.
Nothing runs automatically — you run this yourself when you're ready to install.

.EXAMPLE
.\utils\setup-frontend-env.ps1            # installs both (default)
.\utils\setup-frontend-env.ps1 desktop
.\utils\setup-frontend-env.ps1 mobile
.\utils\setup-frontend-env.ps1 both

PowerShell twin of setup-frontend-env.sh; keep both in sync if you change one.
#>

param(
    [ValidateSet("desktop", "mobile", "both")]
    [string]$Target = "both"
)

$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $PSScriptRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm is not installed / not on PATH. Install Node.js (>=20) first."
    exit 1
}

function Install-One {
    param([string]$Dir)
    Write-Host "==> Installing dependencies in $Dir"
    Push-Location (Join-Path $RootDir $Dir)
    try {
        npm install
    } finally {
        Pop-Location
    }
}

switch ($Target) {
    "desktop" { Install-One "frontend" }
    "mobile"  { Install-One "frontend-mobile" }
    "both"    { Install-One "frontend"; Install-One "frontend-mobile" }
}

Write-Host ""
Write-Host "Done."
