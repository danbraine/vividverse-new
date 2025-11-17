# Coverce.ai MVP Setup Script (PowerShell)
# This script sets up the development environment

Write-Host "🎬 Coverce.ai MVP Setup" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if dfx is installed
try {
    $dfxVersion = dfx --version
    Write-Host "✅ DFX SDK found: $dfxVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ DFX SDK is not installed. Please install from:" -ForegroundColor Red
    Write-Host "   https://internetcomputer.org/docs/current/developer-docs/setup/install/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Install root dependencies
Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
npm install

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location src/coverce_frontend
npm install
Set-Location ../..

# Install AI orchestrator dependencies
Write-Host "📦 Installing AI orchestrator dependencies..." -ForegroundColor Yellow
Set-Location src/ai_orchestrator
npm install
Set-Location ../..

# Create .env file if it doesn't exist
if (-not (Test-Path "src/ai_orchestrator/.env")) {
    Write-Host "📝 Creating .env file for AI orchestrator..." -ForegroundColor Yellow
    Copy-Item env.example src/ai_orchestrator/.env
    Write-Host "⚠️  Please edit src/ai_orchestrator/.env with your API keys" -ForegroundColor Yellow
}

# Create directories
Write-Host "📁 Creating output directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "src/ai_orchestrator/output" | Out-Null
New-Item -ItemType Directory -Force -Path "src/ai_orchestrator/temp" | Out-Null

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start local ICP network: dfx start"
Write-Host "2. Deploy canisters: dfx deploy"
Write-Host "3. Start frontend: cd src/coverce_frontend; npm run dev"
Write-Host "4. Configure API keys in src/ai_orchestrator/.env"
Write-Host ""
Write-Host "For more information, see QUICKSTART.md" -ForegroundColor Gray



