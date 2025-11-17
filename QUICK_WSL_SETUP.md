# Quick WSL Setup for Coverce.ai

Fastest way to get Linux running on Windows.

## One-Time Setup (5 minutes)

### 1. Install WSL

Open **PowerShell as Administrator**:

```powershell
wsl --install
```

**Restart your computer** when prompted.

### 2. Open Ubuntu

After restart, Ubuntu will open automatically. Create a username and password.

### 3. Install Everything

In Ubuntu terminal, run:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install DFX
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install FFmpeg
sudo apt update
sudo apt install -y ffmpeg

# Copy project to Linux
cp -r /mnt/c/Users/bspam/Desktop/coverce.ai ~/coverce.ai
cd ~/coverce.ai

# Install dependencies
npm install
cd src/coverce_frontend && npm install && cd ../..
cd src/ai_orchestrator && npm install && cd ../..
```

### 4. Run the Project

**Terminal 1:**
```bash
cd ~/coverce.ai
dfx start
```

**Terminal 2:**
```bash
cd ~/coverce.ai
dfx generate && dfx deploy
```

**Terminal 3:**
```bash
cd ~/coverce.ai/src/coverce_frontend
npm run dev
```

Open browser: **http://localhost:3000**

## That's it! 🎉

You're now running Coverce.ai on Linux (via WSL).

