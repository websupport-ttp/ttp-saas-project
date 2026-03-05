#!/usr/bin/env pwsh
# Push Frontend Submodule Changes

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Push Frontend Submodule to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "frontend/web-app"

Write-Host "Checking frontend status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Attempting to push to GitHub..." -ForegroundColor Yellow
Write-Host "Note: Browser authentication may be required" -ForegroundColor Gray
Write-Host ""

git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Frontend pushed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vercel will automatically deploy the changes." -ForegroundColor Green
    Write-Host "Check deployment at: https://vercel.com/websupport-ttp" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "✗ Push failed or requires authentication" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please complete authentication in your browser and try again." -ForegroundColor Yellow
    Write-Host "Or use GitHub Desktop / VS Code to push the changes." -ForegroundColor Yellow
}

Write-Host ""
Set-Location "../.."
