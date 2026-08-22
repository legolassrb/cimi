<#
.SYNOPSIS
Starts backend + one or both frontends together, locally (no Docker).
Requires the matching environments to already be set up:
  .\utils\setup-backend-env.ps1
  .\utils\setup-frontend-env.ps1 [desktop|mobile|both]

.EXAMPLE
.\utils\start-all.ps1            # backend + both frontends (default)
.\utils\start-all.ps1 desktop    # backend + desktop frontend only
.\utils\start-all.ps1 mobile     # backend + mobile frontend only
.\utils\start-all.ps1 both

For the Docker Compose based "everything in containers" path instead, see
the README — that uses `docker compose --profile ... up` and doesn't use
this script.

Unlike the bash version (backgrounded shell processes + trap), each service
here runs as a PowerShell background job in this same window; Ctrl+C stops
this script and the `finally` block tears every job down. PowerShell twin
of start-all.sh; keep both in sync if you change one.
#>

param(
    [ValidateSet("desktop", "mobile", "both")]
    [string]$Target = "both"
)

$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $PSScriptRoot
$Jobs = @()

try {
    $Jobs += Start-Job -Name "backend" -ScriptBlock {
        & "$using:RootDir\utils\start-backend.ps1"
    }

    # give the backend a moment's head start before any frontend boots
    Start-Sleep -Seconds 2

    if ($Target -eq "desktop" -or $Target -eq "both") {
        $Jobs += Start-Job -Name "frontend-desktop" -ScriptBlock {
            & "$using:RootDir\utils\start-frontend.ps1" desktop
        }
        Write-Host "==> Desktop frontend: http://localhost:3000"
    }

    if ($Target -eq "mobile" -or $Target -eq "both") {
        $Jobs += Start-Job -Name "frontend-mobile" -ScriptBlock {
            & "$using:RootDir\utils\start-frontend.ps1" mobile
        }
        Write-Host "==> Mobile frontend:  http://localhost:3001"
    }

    Write-Host "==> Backend:          http://localhost:8000"
    Write-Host "==> Press Ctrl+C to stop everything."

    while ($true) {
        Receive-Job -Job $Jobs
        Start-Sleep -Milliseconds 500
    }
}
finally {
    Write-Host ""
    Write-Host "==> Shutting down..."
    $Jobs | Stop-Job -PassThru | Remove-Job -Force
}
