# Coverce.ai Quick Install Script for Windows
# This script installs all npm dependencies for the project

Write-Host "🎬 Coverce.ai Dependency Installer" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Then restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}
$nodeVersion = node --version
Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm not found!" -ForegroundColor Red
    Write-Host "npm should come with Node.js. Please reinstall Node.js." -ForegroundColor Yellow
    exit 1
}
$npmVersion = npm --version
Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green

# Check DFX (optional check, won't fail if not found)
Write-Host "Checking DFX SDK..." -ForegroundColor Yellow
if (!(Get-Command dfx -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  DFX SDK not found (optional for dependency install)" -ForegroundColor Yellow
    Write-Host "   Install from: https://internetcomputer.org/docs/current/developer-docs/setup/install/" -ForegroundColor Gray
} else {
    $dfxVersion = dfx --version
    Write-Host "✅ DFX SDK found: $dfxVersion" -ForegroundColor Green
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Install root dependencies
Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
try {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install root dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Root dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Error installing root dependencies: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
try {
    Set-Location src\coverce_frontend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        Set-Location $scriptDir
        exit 1
    }
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
    Set-Location $scriptDir
} catch {
    Write-Host "❌ Error installing frontend dependencies: $_" -ForegroundColor Red
    Set-Location $scriptDir
    exit 1
}

Write-Host ""

# Install AI orchestrator dependencies
Write-Host "📦 Installing AI orchestrator dependencies..." -ForegroundColor Yellow
try {
    Set-Location src\ai_orchestrator
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install AI orchestrator dependencies" -ForegroundColor Red
        Set-Location $scriptDir
        exit 1
    }
    Write-Host "✅ AI orchestrator dependencies installed" -ForegroundColor Green
    Set-Location $scriptDir
} catch {
    Write-Host "❌ Error installing AI orchestrator dependencies: $_" -ForegroundColor Red
    Set-Location $scriptDir
    exit 1
}

Write-Host ""

# Create directories
Write-Host "📁 Creating output directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "src\ai_orchestrator\output" | Out-Null
New-Item -ItemType Directory -Force -Path "src\ai_orchestrator\temp" | Out-Null
Write-Host "✅ Directories created" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install DFX SDK if not already installed" -ForegroundColor White
Write-Host "2. Read HOW_TO_RUN.md to learn how to start the project" -ForegroundColor White
Write-Host "3. Follow QUICK_PREVIEW.md to test the application" -ForegroundColor White
Write-Host ""



