# Installation Guide - Node.js/React Version

This guide will help you install all dependencies for the VividVerse Node.js rebuild.

## Prerequisites

### 1. Node.js (18+)
- Download from https://nodejs.org/
- Verify: `node --version`

### 2. PostgreSQL (12+)

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Or use Docker: `docker run --name vividverse-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vividverse -p 5432:5432 -d postgres:15`

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 3. FFmpeg (for AI video processing)

**Windows:**
- Download from https://ffmpeg.org/download.html
- Or: `choco install ffmpeg`
- Verify: `ffmpeg -version`

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

## Installation Steps

### Step 1: Install Backend Dependencies

```bash
cd vividverse/backend
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd ../src/coverce_frontend
npm install
```

### Step 3: Install AI Orchestrator Dependencies

```bash
cd ../ai_orchestrator
npm install
```

## Quick Install Script (PowerShell)

Create and run `install-dependencies.ps1`:

```powershell
Write-Host "Installing Backend Dependencies..." -ForegroundColor Green
cd vividverse/backend
npm install

Write-Host "`nInstalling Frontend Dependencies..." -ForegroundColor Green
cd ../src/coverce_frontend
npm install

Write-Host "`nInstalling AI Orchestrator Dependencies..." -ForegroundColor Green
cd ../ai_orchestrator
npm install

Write-Host "`n✅ All dependencies installed!" -ForegroundColor Green
```

## Database Setup

### Create Database

```bash
# Using psql
psql -U postgres -c "CREATE DATABASE vividverse;"

# Or using createdb
createdb vividverse
```

### Run Migrations

```bash
cd vividverse/backend
npm run migrate
```

## Environment Configuration

### Backend (.env)

Create `vividverse/backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vividverse
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
NODE_ENV=development
```

### Frontend (.env)

Create `vividverse/src/coverce_frontend/.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

## Verification

After installation, verify everything works:

```bash
# Check backend
cd vividverse/backend
npm list --depth=0

# Check frontend
cd ../src/coverce_frontend
npm list --depth=0

# Check orchestrator
cd ../ai_orchestrator
npm list --depth=0
```

## Next Steps

1. Start PostgreSQL (if not running)
2. Run database migrations
3. Start backend: `cd backend && npm run dev`
4. Start frontend: `cd src/coverce_frontend && npm run dev`
5. Open http://localhost:5173 (or the port Vite assigns)

## Troubleshooting

### PostgreSQL Connection Issues
- Ensure PostgreSQL is running: `pg_isready`
- Check credentials in `.env`
- Verify database exists: `psql -U postgres -l | grep vividverse`

### Port Conflicts
- Change `PORT` in backend `.env`
- Update `VITE_API_URL` in frontend `.env` accordingly

### FFmpeg Not Found
- Add FFmpeg to your PATH
- Or specify full path in orchestrator config

