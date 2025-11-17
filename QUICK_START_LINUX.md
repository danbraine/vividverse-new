# Quick Start - Linux

Fastest way to get Coverce.ai running on Linux.

## One-Command Setup

```bash
# Make setup script executable and run it
chmod +x setup-linux.sh
./setup-linux.sh
```

This installs everything automatically!

## Manual Setup (3 steps)

### 1. Install DFX SDK

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Close and reopen terminal, then verify:
```bash
dfx --version
```

### 2. Install Dependencies

```bash
cd ~/Desktop/coverce.ai  # or your project path
npm install
cd src/coverce_frontend && npm install && cd ../..
cd src/ai_orchestrator && npm install && cd ../..
```

### 3. Run the Project (3 terminals)

**Terminal 1:**
```bash
dfx start
```

**Terminal 2:**
```bash
cd ~/Desktop/coverce.ai
dfx generate && dfx deploy
```

**Terminal 3:**
```bash
cd ~/Desktop/coverce.ai/src/coverce_frontend
npm run dev
```

**Open browser:** http://localhost:3000

## That's it! 🎉

For detailed instructions, see [INSTALL_LINUX.md](./INSTALL_LINUX.md)

