# How to Run Your VividVerse Project

## Quick Start (3 Steps)

### Step 1: Install PostgreSQL ⚠️ REQUIRED

**Option A: Download & Install (Recommended)**
1. Download: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for `postgres` user
4. Create database using pgAdmin:
   - Open pgAdmin 4
   - Right-click "Databases" → Create → Database
   - Name: `vividverse`
   - Click Save

**Option B: Docker (If you have Docker Desktop)**
```powershell
docker run --name vividverse-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vividverse -p 5432:5432 -d postgres:15
```

**Option C: Cloud Database (Free)**
- Supabase: https://supabase.com
- Update `backend/.env` with connection details

### Step 2: Run Database Migrations

```powershell
cd vividverse/backend
npm run migrate
```

You should see: `✅ Migrations completed successfully!`

### Step 3: Start the Servers

**Terminal 1 - Backend:**
```powershell
cd vividverse/backend
npm run dev
```

Wait for: `🚀 VividVerse Backend Server running on http://localhost:3001`

**Terminal 2 - Frontend (New Terminal):**
```powershell
cd vividverse/src/coverce_frontend
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Step 4: Open in Browser

Navigate to: **http://localhost:5173**

---

## Detailed Step-by-Step

### 1. Check Prerequisites

**PostgreSQL:**
```powershell
# Check if PostgreSQL service is running
Get-Service -Name "*postgres*"
```

**Dependencies:**
```powershell
# If not installed, run:
cd vividverse/backend
npm install

cd ../src/coverce_frontend
npm install
```

### 2. Configure Database

**Update `backend/.env` if needed:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vividverse
DB_USER=postgres
DB_PASSWORD=postgres  # Change if you set a different password
JWT_SECRET=your-secret-key
PORT=3001
```

### 3. Create Database

**Using pgAdmin (Easiest):**
1. Open pgAdmin 4
2. Connect to PostgreSQL server
3. Right-click "Databases" → Create → Database
4. Name: `vividverse`
5. Click Save

**Using Command Line:**
```powershell
# If PostgreSQL is in PATH:
createdb -U postgres vividverse

# Or use full path:
"C:\Program Files\PostgreSQL\15\bin\createdb.exe" -U postgres vividverse
```

### 4. Run Migrations

```powershell
cd vividverse/backend
npm run migrate
```

This creates all the database tables.

### 5. Start Backend Server

**Open Terminal 1:**
```powershell
cd vividverse/backend
npm run dev
```

**Expected Output:**
```
🚀 VividVerse Backend Server running on http://localhost:3001
📁 Uploads directory: ...
🎬 Movies directory: ...
```

**If you see database errors:**
- Check PostgreSQL is running
- Verify database `vividverse` exists
- Check credentials in `backend/.env`

### 6. Start Frontend Server

**Open Terminal 2 (New Terminal Window):**
```powershell
cd vividverse/src/coverce_frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 7. Access the Application

Open your browser and go to: **http://localhost:5173**

You should see the VividVerse homepage!

---

## First Time Usage

1. **Register Account:**
   - Click "Login" in navbar
   - Switch to "Register" tab
   - Enter email, password, username
   - Click "Register"

2. **Submit a Script:**
   - Go to "Submit Script"
   - Fill in title, select format
   - Upload a file (.fountain, .pdf, or .txt)
   - Click "Submit Script"

3. **Become a Validator:**
   - Go to "Validate"
   - Click "Register as Validator"
   - Now you can score scripts!

4. **View Scripts:**
   - Go to "Scripts" to see all submissions
   - View scores and status

---

## Troubleshooting

### Backend Won't Start

**Error: "Cannot connect to database"**
- ✅ Check PostgreSQL is running: `Get-Service "*postgres*"`
- ✅ Verify database exists: `psql -U postgres -l | grep vividverse`
- ✅ Check `backend/.env` credentials match your PostgreSQL setup

**Error: "Port 3001 already in use"**
- Change `PORT=3001` to another port in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` to match

### Frontend Won't Start

**Error: "Port 5173 already in use"**
- Vite will automatically use the next available port
- Check the terminal output for the actual URL

**Error: "Cannot connect to backend"**
- Make sure backend is running first
- Check `VITE_API_URL` in `frontend/.env` matches backend URL
- Verify CORS is enabled in backend (it is by default)

### Database Errors

**"relation does not exist"**
- Run migrations: `cd backend && npm run migrate`

**"password authentication failed"**
- Check password in `backend/.env` matches your PostgreSQL password
- Default user is `postgres`

---

## Stopping the Servers

Press `Ctrl+C` in each terminal to stop the servers.

---

## Quick Reference

```powershell
# Terminal 1 - Backend
cd vividverse/backend
npm run dev

# Terminal 2 - Frontend  
cd vividverse/src/coverce_frontend
npm run dev

# Browser
http://localhost:5173
```

---

## Need Help?

- **PostgreSQL Setup**: See `INSTALL_POSTGRES_NOW.md`
- **Deployment**: See `DEPLOY_TO_WEB.md`
- **Full Documentation**: See `README_NODEJS.md`
