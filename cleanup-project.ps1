# Project Cleanup Script
# This script organizes the project structure and removes unnecessary files

Write-Host "Starting project cleanup..." -ForegroundColor Green

# Create directories if they don't exist
$dirs = @("docs", "scripts")
foreach ($dir in $dirs) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Host "Created $dir directory" -ForegroundColor Yellow
    }
}

# Move documentation files to docs/
Write-Host "`nMoving documentation files..." -ForegroundColor Cyan
Get-ChildItem -Path . -Filter "*.md" -File | Where-Object { $_.Name -ne "README.md" -and $_.Name -ne "GIT_SETUP_GUIDE.md" -and $_.Name -ne "SECURITY_WARNING.md" } | ForEach-Object {
    Move-Item -Path $_.FullName -Destination "docs\" -Force -ErrorAction SilentlyContinue
    Write-Host "  Moved $($_.Name)" -ForegroundColor Gray
}

# Move test and debug scripts to scripts/
Write-Host "`nMoving test and debug scripts..." -ForegroundColor Cyan
$scriptPatterns = @("test-*", "debug-*", "fix-*", "*.bat", "*.html", "check-*.js", "final-*.js", "verify-*.js")
foreach ($pattern in $scriptPatterns) {
    Get-ChildItem -Path . -Filter $pattern -File | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "scripts\" -Force -ErrorAction SilentlyContinue
        Write-Host "  Moved $($_.Name)" -ForegroundColor Gray
    }
}

# Move query file if exists
if (Test-Path "query") {
    Move-Item -Path "query" -Destination "scripts\" -Force -ErrorAction SilentlyContinue
    Write-Host "  Moved query" -ForegroundColor Gray
}

# Clean up backend
Write-Host "`nCleaning backend..." -ForegroundColor Cyan
if (Test-Path "backend") {
    # Remove test coverage
    if (Test-Path "backend/coverage") {
        Remove-Item -Path "backend/coverage" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed coverage directory" -ForegroundColor Gray
    }
    
    # Remove .kiro and .snapshots
    if (Test-Path "backend/.kiro") {
        Remove-Item -Path "backend/.kiro" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed .kiro directory" -ForegroundColor Gray
    }
    if (Test-Path "backend/.snapshots") {
        Remove-Item -Path "backend/.snapshots" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed .snapshots directory" -ForegroundColor Gray
    }
}

# Clean up frontend
Write-Host "`nCleaning frontend..." -ForegroundColor Cyan
if (Test-Path "frontend/web-app") {
    # Remove .next build
    if (Test-Path "frontend/web-app/.next") {
        Remove-Item -Path "frontend/web-app/.next" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed .next directory" -ForegroundColor Gray
    }
    
    # Remove .kiro and .snapshots
    if (Test-Path "frontend/web-app/.kiro") {
        Remove-Item -Path "frontend/web-app/.kiro" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed .kiro directory" -ForegroundColor Gray
    }
    if (Test-Path "frontend/web-app/.snapshots") {
        Remove-Item -Path "frontend/web-app/.snapshots" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed .snapshots directory" -ForegroundColor Gray
    }
}

# Remove root .kiro and .snapshots
Write-Host "`nCleaning root directories..." -ForegroundColor Cyan
if (Test-Path ".kiro") {
    Remove-Item -Path ".kiro" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  Removed .kiro directory" -ForegroundColor Gray
}
if (Test-Path ".snapshots") {
    Remove-Item -Path ".snapshots" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  Removed .snapshots directory" -ForegroundColor Gray
}

# Create README in docs folder
Write-Host "`nCreating docs README..." -ForegroundColor Cyan
$docsReadme = @"
# Documentation

This folder contains all project documentation.

## Contents

- Implementation guides
- API documentation
- Integration guides
- Troubleshooting guides
- Status reports
- Feature documentation

## Organization

- `*_GUIDE.md` - Step-by-step guides
- `*_STATUS.md` - Status reports
- `*_SUMMARY.md` - Summary documents
- `*_FIX.md` - Bug fix documentation
- `*_IMPLEMENTATION.md` - Feature implementation docs

## Main Documentation

See the root `README.md` for quick start and overview.
"@
Set-Content -Path "docs/README.md" -Value $docsReadme

# Create README in scripts folder
Write-Host "Creating scripts README..." -ForegroundColor Cyan
$scriptsReadme = @"
# Scripts

This folder contains utility scripts for testing and debugging.

## Contents

- Test scripts (`test-*.js`, `test-*.cjs`)
- Debug scripts (`debug-*.js`, `debug-*.cjs`)
- Fix scripts (`fix-*.bat`, `fix-*.ps1`)
- Utility scripts

## Usage

These scripts are for development and testing purposes only.
They should not be included in production deployments.

## Note

Most of these scripts require the backend server to be running.
Configure your environment variables before running tests.
"@
Set-Content -Path "scripts/README.md" -Value $scriptsReadme

Write-Host "`n✅ Cleanup complete!" -ForegroundColor Green
Write-Host "`nProject structure:" -ForegroundColor Yellow
Write-Host "  ├── backend/          (Backend API)" -ForegroundColor Gray
Write-Host "  ├── frontend/web-app/ (Frontend app)" -ForegroundColor Gray
Write-Host "  ├── docs/             (Documentation)" -ForegroundColor Gray
Write-Host "  ├── scripts/          (Utility scripts)" -ForegroundColor Gray
Write-Host "  ├── README.md         (Main readme)" -ForegroundColor Gray
Write-Host "  └── .gitignore        (Git ignore rules)" -ForegroundColor Gray

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Review SECURITY_WARNING.md" -ForegroundColor White
Write-Host "  2. Follow GIT_SETUP_GUIDE.md" -ForegroundColor White
Write-Host "  3. Verify .gitignore files" -ForegroundColor White
Write-Host "  4. Commit to GitHub" -ForegroundColor White
