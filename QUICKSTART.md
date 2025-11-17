# Quick Start Guide

Get Coverce.ai MVP running in 10 minutes.

## Prerequisites

- Node.js 18+ installed
- DFX SDK installed ([Install Guide](https://internetcomputer.org/docs/current/developer-docs/setup/install/))

## Step 1: Clone and Install

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd src/coverce_frontend
npm install
cd ../..
```

## Step 2: Start Local ICP Network

```bash
dfx start
```

Keep this terminal open. The local network runs on `http://localhost:8000`.

## Step 3: Deploy Canisters

In a new terminal:

```bash
# Generate TypeScript bindings
dfx generate

# Deploy canisters
dfx deploy
```

This will:
- Deploy the Motoko backend canister
- Deploy the frontend asset canister
- Generate TypeScript types for frontend

## Step 4: Start Frontend

```bash
cd src/coverce_frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Step 5: Test the Application

1. **Open** `http://localhost:3000` in your browser
2. **Login** with Internet Identity (creates a local identity)
3. **Submit a Script**:
   - Click "Submit Script"
   - Enter title and upload a file
   - Submit
4. **Become a Validator**:
   - Click "Validate" in navbar
   - Register as validator
   - Score the script
5. **View Scripts**:
   - Click "Scripts" to see all submissions
   - View scores and status

## Testing AI Generation (Optional)

To test the AI orchestrator:

1. **Install FFmpeg**:
   ```bash
   # macOS
   brew install ffmpeg
   
   # Linux
   sudo apt-get install ffmpeg
   ```

2. **Configure API Keys**:
   ```bash
   cd src/ai_orchestrator
   cp ../../env.example .env
   # Edit .env with your API keys
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Orchestrator**:
   ```bash
   node index.js <scriptId> <path/to/script.txt>
   ```

## Troubleshooting

### "dfx: command not found"
Install DFX SDK: https://internetcomputer.org/docs/current/developer-docs/setup/install/

### "Cannot connect to local network"
Make sure `dfx start` is running in another terminal.

### Frontend can't connect to backend
- Check canister IDs in `src/coverce_frontend/src/services/coverceService.ts`
- Run `dfx generate` to update bindings
- Restart frontend dev server

### Internet Identity not working locally
For local development, Internet Identity uses a local canister. Make sure it's deployed:
```bash
dfx deploy internet_identity
```

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Customize AI providers in `src/ai_orchestrator/index.js`
- Add your own validation logic in `src/coverce_backend/main.mo`

## Getting Help

- Check [README.md](./README.md) for overview
- Review code comments in source files
- ICP Docs: https://internetcomputer.org/docs/
- Motoko Docs: https://internetcomputer.org/docs/current/motoko/main/motoko



