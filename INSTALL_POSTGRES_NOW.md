# Install PostgreSQL - Quick Guide

## Option 1: Download and Install (Recommended - 5 minutes)

### Step 1: Download
1. Go to: **https://www.postgresql.org/download/windows/**
2. Click **"Download the installer"**
3. Download **PostgreSQL 15.x or 16.x** (latest stable)

### Step 2: Install
1. Run the installer
2. **Installation Directory**: Keep default (usually `C:\Program Files\PostgreSQL\15`)
3. **Select Components**: Keep all checked (especially "Command Line Tools")
4. **Data Directory**: Keep default
5. **Password**: Set a password for the `postgres` user
   - **IMPORTANT**: Remember this password!
   - Or use: `postgres` (simple, but less secure)
6. **Port**: Keep default `5432`
7. **Advanced Options**: Keep defaults
8. **Pre Installation Summary**: Click Next
9. **Ready to Install**: Click Next
10. **Completing**: Uncheck "Stack Builder" (not needed), Click Finish

### Step 3: Verify Installation
After installation, PostgreSQL should be running automatically.

**Check if it's running:**
- Open Services: Press `Win + R`, type `services.msc`, press Enter
- Look for "postgresql-x64-15" (or similar)
- Status should be "Running"

### Step 4: Create Database
**Using pgAdmin (GUI - easiest):**
1. Open **pgAdmin 4** from Start Menu
2. Enter your password when prompted
3. Expand "Servers" → "PostgreSQL 15"
4. Right-click "Databases" → **Create** → **Database**
5. Name: `vividverse`
6. Click **Save**

**Or using Command Prompt:**
```powershell
# Open Command Prompt as Administrator
# Navigate to PostgreSQL bin:
cd "C:\Program Files\PostgreSQL\15\bin"

# Create database:
.\createdb.exe -U postgres vividverse
# Enter password when prompted
```

### Step 5: Update .env File
If you used a password other than `postgres`, update `vividverse/backend/.env`:
```
DB_PASSWORD=your_actual_password
```

---

## Option 2: Use Docker (If you have Docker Desktop)

```powershell
docker run --name vividverse-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vividverse -p 5432:5432 -d postgres:15
```

This creates a PostgreSQL container that's ready to use!

---

## Option 3: Use Cloud Database (Free)

### Supabase (Recommended - Free Tier)
1. Go to: https://supabase.com
2. Sign up (free)
3. Create a new project
4. Go to Settings → Database
5. Copy the connection string
6. Update `backend/.env`:
```
DB_HOST=your-project.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password
```

### Neon (Alternative - Free Tier)
1. Go to: https://neon.tech
2. Sign up (free)
3. Create a project
4. Copy connection string
5. Update `backend/.env` accordingly

---

## After Installation

### Run Migrations
```powershell
cd vividverse/backend
npm run migrate
```

You should see: `✅ Migrations completed successfully!`

### Start Backend
```powershell
cd vividverse/backend
npm run dev
```

---

## Troubleshooting

**"password authentication failed"**
- Check password in `backend/.env` matches your PostgreSQL password
- Default user is `postgres`

**"database does not exist"**
- Make sure you created the `vividverse` database
- Use pgAdmin or `createdb` command

**"connection refused"**
- Make sure PostgreSQL service is running
- Check in Services (`services.msc`)
- Restart the service if needed

**Can't find psql/createdb commands**
- Add PostgreSQL bin to PATH:
  - `C:\Program Files\PostgreSQL\15\bin`
- Or use full path: `"C:\Program Files\PostgreSQL\15\bin\psql.exe"`

