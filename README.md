# Coverce.ai MVP

The minimum viable product for Coverce.ai - a decentralized platform where writers submit scripts, validators judge them, and AI generates movies from winning submissions.

## Architecture

**Frontend (ICP-hosted React app)**
- Miner Submission Portal - Writers upload scripts
- Validator Dashboard - Judges score scripts
- Movie Viewer - Users watch generated films

**Backend (ICP Motoko canisters)**
- Script storage and management
- Validation scoring system
- AI orchestration for film generation

**AI Layer (External APIs)**
- Video generation (Luma, Runway, Pika, Kling)
- Image generation (DALL·E, Stability, Flux)
- Audio generation (ElevenLabs, OpenAI)
- Video editing (FFmpeg, Remotion)

## Quick Start

### Prerequisites
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) installed
- Node.js 18+ installed

**📦 Need to install dependencies?**
- **Linux users:** See [INSTALL_LINUX.md](./INSTALL_LINUX.md) or run `./setup-linux.sh`
- **Windows users:** See [INSTALL.md](./INSTALL.md) or [INSTALL_DFX_SIMPLE.md](./INSTALL_DFX_SIMPLE.md)

### Local Development

1. Install project dependencies:
```bash
npm install
cd src/coverce_frontend && npm install && cd ../..
cd src/ai_orchestrator && npm install && cd ../..
```

2. Start local ICP network:
```bash
dfx start
```

3. Deploy canisters (in a new terminal):
```bash
dfx generate
dfx deploy
```

4. Start frontend dev server (in a new terminal):
```bash
cd src/coverce_frontend && npm run dev
```

5. Open `http://localhost:3000` in your browser

**📖 For detailed preview/testing instructions, see [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md)**

### Deploy to ICP Mainnet

```bash
dfx deploy --network ic
```

## Project Structure

```
coverce.ai/
├── src/
│   ├── coverce_backend/        # Motoko backend canister
│   │   ├── main.mo             # Main canister logic
│   │   └── Types.mo            # Type definitions
│   └── coverce_frontend/       # React frontend
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── pages/          # Page components
│       │   ├── services/       # ICP agent services
│       │   └── utils/          # Utilities
│       └── package.json
├── dfx.json                    # ICP project config
└── README.md
```

## Features

### ✅ MVP Features
- [x] Internet Identity authentication
- [x] Script upload (PDF, Fountain format)
- [x] Script storage on ICP
- [x] Validation dashboard
- [x] Scoring rubric system
- [x] AI film generation orchestrator
- [x] Movie storage and playback

### 🚀 Future Features (V2/V3)
- Bittensor subnet integration
- TAO rewards for submissions
- Validator staking
- Decentralized scoring network

## Development Roadmap

- **Week 1-2**: Core infrastructure (auth, storage, basic UI)
- **Week 3-4**: Validation system and scoring
- **Week 5-6**: AI integration and film generation
- **Week 7-8**: Polish, testing, and deployment

## License

MIT

