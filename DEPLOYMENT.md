# Deployment Guide

This guide walks you through deploying Coverce.ai MVP to ICP.

## Prerequisites

1. **DFX SDK** - Install from [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
2. **Node.js 18+** - For frontend development
3. **Internet Identity** - Set up for authentication
4. **API Keys** - For AI services (OpenAI, ElevenLabs, Luma, etc.)

## Local Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd src/coverce_frontend
npm install

# Install AI orchestrator dependencies
cd ../../src/ai_orchestrator
npm install
```

### 2. Start Local ICP Network

```bash
dfx start
```

This starts a local ICP replica on `http://localhost:8000`.

### 3. Deploy Canisters Locally

```bash
# Generate TypeScript bindings
dfx generate

# Deploy canisters
dfx deploy
```

### 4. Start Frontend Development Server

```bash
cd src/coverce_frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Deploying to ICP Mainnet

### 1. Get ICP Cycles

You'll need cycles to deploy canisters. Get them from:
- [Cycles Faucet](https://faucet.dfinity.org/) (for testing)
- [NNS Dapp](https://nns.ic0.app/) (convert ICP to cycles)

### 2. Create Identity

```bash
dfx identity new production
dfx identity use production
```

### 3. Deploy to Mainnet

```bash
# Deploy backend canister
dfx deploy --network ic coverce_backend

# Deploy frontend canister
dfx deploy --network ic coverce_frontend
```

### 4. Update Frontend Configuration

After deployment, update the canister IDs in:
- `src/coverce_frontend/src/services/coverceService.ts`
- Environment variables

## Setting Up AI Orchestrator

### 1. Configure Environment Variables

Copy `env.example` to `.env` and fill in your API keys:

```bash
cp env.example .env
```

### 2. Install FFmpeg

- **macOS**: `brew install ffmpeg`
- **Linux**: `sudo apt-get install ffmpeg`
- **Windows**: Download from [ffmpeg.org](https://ffmpeg.org/download.html)

### 3. Run Orchestrator

The orchestrator can run as:
- **Standalone service**: `node src/ai_orchestrator/index.js <scriptId> <scriptPath>`
- **Scheduled job**: Set up cron job or systemd service
- **API endpoint**: Wrap in Express/Fastify server

## Environment Variables

### Frontend (.env in coverce_frontend/)

```env
CANISTER_ID_COVERCE_BACKEND=your_canister_id
DFX_NETWORK=ic
```

### AI Orchestrator (.env in ai_orchestrator/)

See `env.example` for all required variables.

## Troubleshooting

### Canister Deployment Fails

- Check you have enough cycles: `dfx wallet balance`
- Verify identity: `dfx identity whoami`
- Check network: `dfx ping --network ic`

### Frontend Can't Connect to Backend

- Verify canister IDs match in `coverceService.ts`
- Check CORS settings if using custom domain
- Ensure backend canister is deployed

### AI Generation Fails

- Verify API keys are correct
- Check API rate limits
- Ensure FFmpeg is installed and in PATH
- Check temp/output directories have write permissions

## Production Checklist

- [ ] Deploy canisters to ICP mainnet
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring/logging
- [ ] Configure API rate limiting
- [ ] Set up backup for script storage
- [ ] Configure CDN for movie delivery
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure SSL certificates
- [ ] Set up CI/CD pipeline
- [ ] Load testing

## Next Steps

After MVP deployment:
1. Add Bittensor subnet integration
2. Implement TAO rewards
3. Add validator staking
4. Scale AI generation infrastructure
5. Add analytics and monitoring



