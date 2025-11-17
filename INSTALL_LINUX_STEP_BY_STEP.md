# Linux Installation - Step by Step

Complete guide to install and run Coverce.ai on Linux.

## Prerequisites Check

First, let's check what you have:

```bash
# Check if you're on Linux
uname -a

# Check Node.js
node --version

# Check npm
npm --version

# Check if DFX is installed
dfx --version
```

## Step 1: Install Node.js (if needed)

### Ubuntu/Debian:

```bash
# Update package list
sudo apt update

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Fedora/RHEL:

```bash
sudo dnf install -y nodejs npm
```

### Arch Linux:

```bash
sudo pacman -S nodejs npm
```

## Step 2: Install DFX SDK

```bash
# Install DFX (this is the official method)
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

This will:
- Download DFX
- Install it to `~/bin/`
- Add it to your PATH

**After installation, close and reopen your terminal**, then verify:

```bash
dfx --version
```

If it doesn't work, add to PATH manually:

```bash
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
dfx --version
```

## Step 3: Install Project Dependencies

```bash
# Navigate to your project directory
cd ~/Desktop/coverce.ai
# (or wherever you cloned/downloaded the project)

# Install root dependencies
npm install

# Install frontend dependencies
cd src/coverce_frontend
npm install
cd ../..

# Install AI orchestrator dependencies
cd src/ai_orchestrator
npm install
cd ../..
```

## Step 4: Install FFmpeg (Optional - for AI movie generation)

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y ffmpeg

# Fedora
sudo dnf install -y ffmpeg

# Arch
sudo pacman -S ffmpeg

# Verify
ffmpeg -version
```

## Step 5: Run the Project

You need **3 terminal windows**:

### Terminal 1 - Start ICP Network:

```bash
dfx start
```

**Keep this running!** Wait until you see "Replica ready" or similar.

### Terminal 2 - Deploy Canisters:

```bash
cd ~/Desktop/coverce.ai  # or your project path

# Generate TypeScript bindings
dfx generate

# Deploy canisters
dfx deploy
```

Wait for "Deployed canisters" message.

### Terminal 3 - Start Frontend:

```bash
cd ~/Desktop/coverce.ai/src/coverce_frontend
npm run dev
```

Wait for "Local: http://localhost:3000/" message.

### Open Browser:

Go to: **http://localhost:3000**

## Quick Setup Script

Or use the automated script:

```bash
# Make it executable
chmod +x setup-linux.sh

# Run it
./setup-linux.sh
```

## Troubleshooting

### "dfx: command not found"

```bash
# Add to PATH
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Or check where it was installed
ls ~/bin/dfx
```

### "Permission denied"

```bash
# Make scripts executable
chmod +x setup-linux.sh
chmod +x install.ps1  # if you have it
```

### Port already in use

```bash
# Find what's using port 8000
sudo lsof -i :8000

# Kill it (replace PID with the number from above)
sudo kill -9 <PID>
```

### npm install fails

```bash
# Clear cache
npm cache clean --force

# Try with legacy peer deps
npm install --legacy-peer-deps
```

## Verification Checklist

After installation, verify everything:

```bash
# Check Node.js
node --version  # ✅ Should show v18+ or v20+

# Check npm
npm --version   # ✅ Should show 9+ or 10+

# Check DFX
dfx --version   # ✅ Should show dfx 0.x.x

# Check FFmpeg (optional)
ffmpeg -version # ✅ Should show version info

# Check project dependencies
cd ~/Desktop/coverce.ai
ls node_modules # ✅ Should exist and have folders
```

## Next Steps

Once everything is installed:

1. ✅ Read [HOW_TO_RUN.md](./HOW_TO_RUN.md) for detailed run instructions
2. ✅ Follow [QUICK_PREVIEW.md](./QUICK_PREVIEW.md) to test the app
3. ✅ See [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md) for complete testing guide

