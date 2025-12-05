# VividVerse - Node.js/React Rebuild

This is the Node.js/React rebuild of VividVerse, migrated from ICP/Motoko to a more cost-effective stack using PostgreSQL and Express.js.

## 🏗️ Architecture

- **Backend**: Node.js + Express.js + PostgreSQL
- **Frontend**: React + TypeScript + Vite
- **AI Orchestrator**: Node.js (unchanged)
- **Authentication**: JWT (replaces Internet Identity)
- **Storage**: Local filesystem (can be upgraded to S3)

## 📋 Prerequisites

1. **Node.js** 18+ installed
2. **PostgreSQL** 12+ installed and running
3. **FFmpeg** installed (for AI video processing)

### Installing PostgreSQL

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
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Installing FFmpeg

**Windows:**
- Download from https://ffmpeg.org/download.html
- Or: `choco install ffmpeg`

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Backend
cd vividverse/backend
npm install

# Frontend
cd ../src/coverce_frontend
npm install

# AI Orchestrator
cd ../ai_orchestrator
npm install
```

### 2. Set Up Database

```bash
# Create database
createdb vividverse

# Or using psql
psql -U postgres -c "CREATE DATABASE vividverse;"

# Run migrations
cd vividverse/backend
npm run migrate
```

### 3. Configure Environment

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

Create `vividverse/src/coverce_frontend/.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd vividverse/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd vividverse/src/coverce_frontend
npm run dev
```

**Terminal 3 - AI Orchestrator (optional, for movie generation):**
```bash
cd vividverse/src/ai_orchestrator
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173 (or the port Vite assigns)
- Backend API: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

## 📁 Project Structure

```
vividverse/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── server.js        # Main server file
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/    # Auth middleware
│   │   ├── config/         # Database config
│   │   └── utils/          # Utilities (storage, etc.)
│   ├── migrations/         # Database migrations
│   └── package.json
│
├── src/
│   ├── coverce_frontend/   # React frontend
│   │   ├── src/
│   │   │   ├── pages/      # Page components
│   │   │   ├── services/   # API service (REST)
│   │   │   └── contexts/   # Auth context (JWT)
│   │   └── package.json
│   │
│   └── ai_orchestrator/    # AI movie generator
│       └── index.js
│
└── README_NODEJS.md        # This file
```

## 🔑 Key Changes from ICP Version

### Authentication
- **Before**: Internet Identity (passwordless, blockchain-based)
- **Now**: JWT with email/password registration and login

### Storage
- **Before**: ICP canisters (expensive)
- **Now**: PostgreSQL database + local filesystem (cheap)

### API
- **Before**: ICP canister calls (Candid interface)
- **Now**: REST API (standard HTTP/JSON)

### Frontend
- Removed: `@dfinity/*` packages
- Added: Standard REST API calls
- Updated: Auth context uses JWT instead of Principal

## 🧪 Testing

1. **Register a new user** at `/login`
2. **Submit a script** at `/submit`
3. **Register as validator** at `/validate`
4. **Score scripts** in the validator dashboard
5. **Generate movies** from top-scoring scripts

## 🔧 Development

### Database Migrations

```bash
cd backend
npm run migrate
```

### Backend Development

```bash
cd backend
npm run dev  # Auto-reloads on file changes
```

### Frontend Development

```bash
cd src/coverce_frontend
npm run dev  # Vite dev server with HMR
```

## 📦 Production Deployment

### Backend

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name vividverse-backend
   ```

### Frontend

```bash
cd src/coverce_frontend
npm run build
# Serve the dist/ folder with nginx or similar
```

### Database

- Use managed PostgreSQL (AWS RDS, Heroku Postgres, etc.)
- Or self-hosted PostgreSQL with backups

### File Storage

- For production, consider S3 or similar object storage
- Update `backend/src/utils/storage.js` to use S3 SDK

## 🐛 Troubleshooting

### Database Connection Issues

- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Check firewall/port 5432 is open

### Port Already in Use

- Change `PORT` in backend `.env`
- Update `VITE_API_URL` in frontend `.env`

### FFmpeg Not Found

- Ensure FFmpeg is in your PATH
- Test with: `ffmpeg -version`

## 📝 Notes

- The original ICP/Motoko code is preserved in `src/coverce_backend/`
- This rebuild maintains the same functionality with a cheaper stack
- All API endpoints match the original behavior for compatibility

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit PR

## 📄 License

MIT

