# Fix Backend Git Push Issue
# This script helps you update the backend remote URL with authentication

Write-Host "=== Backend Git Push Fix ===" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "backend\.git")) {
    Write-Host "Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "Current backend remote URL:" -ForegroundColor Yellow
Set-Location backend
git remote -v
Set-Location ..
Write-Host ""

Write-Host "To fix the push issue, you need to add authentication to the remote URL." -ForegroundColor Green
Write-Host ""
Write-Host "Option 1: Use Personal Access Token (Recommended)" -ForegroundColor Cyan
Write-Host "  1. Go to: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "  2. Click 'Generate new token (classic)'" -ForegroundColor White
Write-Host "  3. Select scope: 'repo' (full control)" -ForegroundColor White
Write-Host "  4. Generate and copy the token" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Do you have a GitHub Personal Access Token? (y/n)"

if ($choice -eq "y" -or $choice -eq "Y") {
    Write-Host ""
    $token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
    $tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
    )
    
    if ($tokenPlain) {
        Write-Host ""
        Write-Host "Updating backend remote URL..." -ForegroundColor Yellow
        Set-Location backend
        git remote set-url origin "https://$tokenPlain@github.com/websupport-ttp/ttp-saas-backend.git"
        
        Write-Host ""
        Write-Host "New remote URL set (token hidden for security)" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "Attempting to push..." -ForegroundColor Yellow
        git push origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "✗ Push failed. Please check the error above." -ForegroundColor Red
            Write-Host "Make sure your token has the correct permissions." -ForegroundColor Yellow
        }
        
        Set-Location ..
    } else {
        Write-Host "No token provided. Exiting." -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "Please generate a Personal Access Token first:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Click 'Generate new token (classic)'" -ForegroundColor White
    Write-Host "3. Give it a name: 'Railway Backend Deployment'" -ForegroundColor White
    Write-Host "4. Select scope: 'repo' (full control of private repositories)" -ForegroundColor White
    Write-Host "5. Click 'Generate token' and copy it" -ForegroundColor White
    Write-Host "6. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Alternative: You can manually update the remote URL:" -ForegroundColor Cyan
    Write-Host "  cd backend" -ForegroundColor White
    Write-Host "  git remote set-url origin https://YOUR_TOKEN@github.com/websupport-ttp/ttp-saas-backend.git" -ForegroundColor White
    Write-Host "  git push origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "For more details, see: RAILWAY_VERCEL_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
