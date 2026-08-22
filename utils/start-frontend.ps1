<#
.SYNOPSIS
Starts one Next.js dev server locally (no Docker).
Assumes utils\setup-frontend-env.ps1 has already been run for the same target.

.EXAMPLE
.\utils\start-frontend.ps1 desktop   # http://localhost:3000
.\utils\start-frontend.ps1 mobile    # http://localhost:3001

PowerShell twin of start-frontend.sh; keep both in sync if you change one.
#>

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("desktop", "mobile")]
    [string]$Target
)

$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $PSScriptRoot

switch ($Target) {
    "desktop" { $Dir = "frontend"; $Port = 3000 }
    "mobile"  { $Dir = "frontend-mobile"; $Port = 3001 }
}

Set-Location (Join-Path $RootDir $Dir)

if (-not (Test-Path "node_modules")) {
    Write-Error "$Dir\node_modules not found. Run .\utils\setup-frontend-env.ps1 $Target first."
    exit 1
}

Write-Host "==> Starting $Target frontend on http://localhost:$Port"
npm run dev -- --port $Port
