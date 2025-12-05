# PostgreSQL Setup Guide for Windows

## Option 1: Install PostgreSQL (Recommended)

### Download and Install

1. **Download PostgreSQL**:
   - Go to https://www.postgresql.org/download/windows/
   - Download the installer (latest version, e.g., 15.x or 16.x)
   - Run the installer

2. **During Installation**:
   - Remember the password you set for the `postgres` user (default user)
   - Port: Keep default `5432`
   - Locale: Default is fine

3. **After Installation**:
   - PostgreSQL should be running as a Windows service
   - You can verify in Services: `services.msc` → Look for "postgresql"

### Create Database

**Using pgAdmin (GUI - comes with PostgreSQL):**
1. Open pgAdmin 4
2. Connect to server (use your postgres password)
3. Right-click "Databases" → Create → Database
4. Name: `vividverse`
5. Click Save

**Using Command Line:**
```powershell
# Add PostgreSQL bin to PATH first, or use full path:
# "C:\Program Files\PostgreSQL\15\bin\createdb.exe" -U postgres vividverse
```

**Using psql:**
```powershell
# "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
# Then run: CREATE DATABASE vividverse;
# Then: \q
```

## Option 2: Use Docker (If you have Docker Desktop)

```powershell
docker run --name vividverse-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vividverse -p 5432:5432 -d postgres:15
```

## Option 3: Use Cloud Database (Free Tier)

- **Supabase**: https://supabase.com (Free PostgreSQL)
- **Neon**: https://neon.tech (Free PostgreSQL)
- **Railway**: https://railway.app (Free tier available)

If using a cloud database, update `backend/.env` with the connection string.

## Verify Installation

After installing, test the connection:

```powershell
cd vividverse/backend
npm run migrate
```

If successful, you'll see: "✅ Migrations completed successfully!"

## Troubleshooting

**"password authentication failed"**
- Check the password in `backend/.env` matches your PostgreSQL password
- Default user is `postgres`

**"database does not exist"**
- Create it using one of the methods above

**"connection refused"**
- Make sure PostgreSQL service is running
- Check port 5432 is not blocked by firewall

