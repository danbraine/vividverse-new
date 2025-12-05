# Quick Start Guide - Node.js Version

## Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js 18+ installed
- ✅ PostgreSQL installed and running
- ✅ Database created

## Step-by-Step Setup

### 1. Create PostgreSQL Database

**Option A: Using psql**
```bash
psql -U postgres
CREATE DATABASE vividverse;
\q
```

**Option B: Using createdb**
```bash
createdb vividverse
```

**Option C: Using Docker**
```bash
docker run --name vividverse-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vividverse -p 5432:5432 -d postgres:15
```

### 2. Run Database Migrations

```bash
cd vividverse/backend
npm run migrate
```

This will create all the necessary tables.

### 3. Start the Backend Server

**Terminal 1:**
```bash
cd vividverse/backend
npm run dev
```

You should see:
```
🚀 VividVerse Backend Server running on http://localhost:3001
```

### 4. Start the Frontend Server

**Terminal 2:**
```bash
cd vividverse/src/coverce_frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 5. Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:5173 (or the port Vite shows)
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## First Time Usage

1. **Register a new account**:
   - Click "Login" in the navbar
   - Switch to "Register" mode
   - Enter email, password, and optional username
   - Click "Register"

2. **Submit a script**:
   - Go to "Submit Script"
   - Fill in title, format, and upload a file
   - Click "Submit Script"

3. **Become a validator**:
   - Go to "Validate"
   - Click "Register as Validator"
   - Score pending scripts

4. **View scripts**:
   - Go to "Scripts" to see all submissions
   - View scores and status

## Troubleshooting

### Database Connection Error

If you see database connection errors:

1. Check PostgreSQL is running:
   ```bash
   # Windows
   Get-Service postgresql*
   
   # Linux/Mac
   sudo systemctl status postgresql
   ```

2. Verify database exists:
   ```bash
   psql -U postgres -l | grep vividverse
   ```

3. Check credentials in `backend/.env`

### Port Already in Use

If port 3001 is taken:
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` to match

### Frontend Can't Connect to Backend

- Make sure backend is running on port 3001
- Check `VITE_API_URL` in `frontend/.env` matches backend URL
- Check CORS settings in backend (should allow localhost)

## Stopping the Application

Press `Ctrl+C` in each terminal to stop the servers.

## Production Deployment

For production:
1. Set `NODE_ENV=production` in backend `.env`
2. Build frontend: `cd frontend && npm run build`
3. Use PM2 or similar for backend: `pm2 start src/server.js`
4. Serve frontend `dist/` folder with nginx or similar

