# VividVerse Node.js - Quick Run Script
# This script helps you start the application

Write-Host ""
Write-Host "VividVerse Node.js Quick Start" -ForegroundColor Cyan
Write-Host ""

# Check if .env files exist
$backendEnv = "backend\.env"
$frontendEnv = "src\coverce_frontend\.env"

if (-not (Test-Path $backendEnv)) {
    Write-Host "Backend .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating backend/.env with default values..." -ForegroundColor Yellow
    
    @"
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vividverse
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Secret (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=3001

# Node Environment
NODE_ENV=development
"@ | Out-File -FilePath $backendEnv -Encoding utf8
    
    Write-Host "Created backend/.env" -ForegroundColor Green
}

if (-not (Test-Path $frontendEnv)) {
    Write-Host "Frontend .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating frontend/.env..." -ForegroundColor Yellow
    
    @"
VITE_API_URL=http://localhost:3001/api
"@ | Out-File -FilePath $frontendEnv -Encoding utf8
    
    Write-Host "Created frontend/.env" -ForegroundColor Green
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Make sure PostgreSQL is installed and running" -ForegroundColor White
Write-Host "2. Create database: createdb vividverse (or use psql)" -ForegroundColor White
Write-Host "3. Run migrations: cd backend; npm run migrate" -ForegroundColor White
Write-Host "4. Start backend: cd backend; npm run dev" -ForegroundColor White
Write-Host "5. Start frontend: cd src/coverce_frontend; npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Or use the commands below:" -ForegroundColor Cyan
Write-Host ""

Write-Host "Terminal 1 - Backend:" -ForegroundColor Yellow
Write-Host "cd backend" -ForegroundColor Gray
Write-Host "npm run dev" -ForegroundColor Gray
Write-Host ""

Write-Host "Terminal 2 - Frontend:" -ForegroundColor Yellow
Write-Host "cd src/coverce_frontend" -ForegroundColor Gray
Write-Host "npm run dev" -ForegroundColor Gray
Write-Host ""

Write-Host "Then open http://localhost:5173 in your browser" -ForegroundColor Green
Write-Host ""
