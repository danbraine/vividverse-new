# Deploy VividVerse to the Web

## Option 1: View Code on GitHub/GitLab

### Push to GitHub

1. **Create a GitHub account** (if you don't have one): https://github.com

2. **Create a new repository**:
   - Go to https://github.com/new
   - Name: `vividverse` (or any name)
   - Choose Public or Private
   - Don't initialize with README (you already have files)
   - Click "Create repository"

3. **Push your code**:
```powershell
# Initialize git (if not already done)
cd vividverse
git init
git add .
git commit -m "Initial commit - VividVerse Node.js rebuild"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vividverse.git

# Push to GitHub
git branch -M main
git push -u origin main
```

4. **View online**: Your code will be at `https://github.com/YOUR_USERNAME/vividverse`

---

## Option 2: Deploy Application to Web

### Frontend Deployment (Vercel - Free & Easy)

1. **Install Vercel CLI**:
```powershell
npm install -g vercel
```

2. **Deploy**:
```powershell
cd src/coverce_frontend
vercel
```

3. **Follow prompts** - Vercel will give you a URL like `https://vividverse.vercel.app`

### Backend Deployment (Railway - Free Tier)

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select your repo**
5. **Add PostgreSQL** (Railway provides free PostgreSQL)
6. **Set environment variables** from `backend/.env`
7. **Deploy** - Railway gives you a URL

### Full Stack Deployment (Render - Free Tier)

1. **Go to**: https://render.com
2. **Sign up**
3. **New Web Service** → Connect GitHub repo
4. **Build Command**: `cd backend && npm install`
5. **Start Command**: `cd backend && npm start`
6. **Add PostgreSQL** (Render provides free PostgreSQL)
7. **Set environment variables**
8. **Deploy**

---

## Option 3: Quick Local Web View

### Using ngrok (Tunnel localhost to web)

1. **Install ngrok**: https://ngrok.com/download

2. **Start your app locally**:
```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd src/coverce_frontend
npm run dev
```

3. **Create tunnel**:
```powershell
ngrok http 5173
```

4. **Share the ngrok URL** (e.g., `https://abc123.ngrok.io`)

---

## Recommended: GitHub + Vercel + Railway

**Best free setup:**
- **GitHub**: Host your code
- **Vercel**: Deploy frontend (automatic from GitHub)
- **Railway**: Deploy backend + PostgreSQL

### Quick Setup:

1. **Push to GitHub** (see Option 1 above)

2. **Deploy Frontend to Vercel**:
   - Go to https://vercel.com
   - Import your GitHub repo
   - Root Directory: `src/coverce_frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variable: `VITE_API_URL` = your backend URL

3. **Deploy Backend to Railway**:
   - Connect GitHub repo
   - Root Directory: `backend`
   - Add PostgreSQL service
   - Set environment variables
   - Deploy

---

## Environment Variables for Production

### Frontend (.env.production):
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

### Backend (set in hosting platform):
```
DB_HOST=your-railway-postgres-host
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=railway-password
JWT_SECRET=your-production-secret
NODE_ENV=production
PORT=3001
```

---

## Cost Estimate

- **GitHub**: Free (public repos) or $4/month (private)
- **Vercel**: Free tier (generous)
- **Railway**: Free tier (500 hours/month)
- **Total**: $0/month for small projects!

---

## Need Help?

- **GitHub Docs**: https://docs.github.com
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app

