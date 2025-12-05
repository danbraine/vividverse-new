# 🚀 Quick Start - VividVerse Node.js

## Current Status

✅ **Dependencies Installed** - All npm packages are ready  
✅ **Environment Files Created** - `.env` files are set up  
⚠️ **PostgreSQL Required** - Database needs to be set up

## Next Steps

### 1. Install PostgreSQL (Choose One Option)

**Option A: Install PostgreSQL Locally (Recommended)**
1. Download: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for `postgres` user
4. Update `backend/.env` if your password is different

**Option B: Use Docker**
```powershell
docker run --name vividverse-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vividverse -p 5432:5432 -d postgres:15
```

**Option C: Use Cloud Database**
- Supabase (free): https://supabase.com
- Neon (free): https://neon.tech
- Update `backend/.env` with connection details

### 2. Create Database

After PostgreSQL is installed:

**Using pgAdmin (GUI):**
- Open pgAdmin 4
- Connect to server
- Right-click "Databases" → Create → Database
- Name: `vividverse`

**Using Command Line:**
```powershell
# If PostgreSQL is in PATH:
createdb -U postgres vividverse

# Or use full path:
# "C:\Program Files\PostgreSQL\15\bin\createdb.exe" -U postgres vividverse
```

### 3. Run Database Migrations

```powershell
cd vividverse/backend
npm run migrate
```

You should see: `✅ Migrations completed successfully!`

### 4. Start Backend Server

**Terminal 1:**
```powershell
cd vividverse/backend
npm run dev
```

Wait for: `🚀 VividVerse Backend Server running on http://localhost:3001`

### 5. Start Frontend Server

**Terminal 2 (New Terminal):**
```powershell
cd vividverse/src/coverce_frontend
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### 6. Open in Browser

Navigate to: **http://localhost:5173**

## First Time Usage

1. **Register**: Click "Login" → Switch to "Register" → Create account
2. **Submit Script**: Go to "Submit Script" → Upload a file
3. **Become Validator**: Go to "Validate" → "Register as Validator"
4. **Score Scripts**: Use the validator dashboard

## Troubleshooting

**Backend won't start:**
- Check PostgreSQL is running
- Verify database exists: `psql -U postgres -l | grep vividverse`
- Check `backend/.env` credentials

**Frontend can't connect:**
- Make sure backend is running first
- Check `VITE_API_URL` in `frontend/.env`

**Database connection errors:**
- Verify PostgreSQL service is running
- Check password in `backend/.env` matches your PostgreSQL password
- Ensure database `vividverse` exists

## Need Help?

- See `SETUP_POSTGRES.md` for detailed PostgreSQL setup
- See `README_NODEJS.md` for full documentation
- See `QUICKSTART_NODEJS.md` for step-by-step guide

