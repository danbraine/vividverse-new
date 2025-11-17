# Installing Coverce.ai on Linux

Complete guide to install and run Coverce.ai on Linux.

## Prerequisites

- Ubuntu/Debian Linux (or similar)
- Terminal access
- Internet connection

## Step 1: Install Node.js

### Ubuntu/Debian:

```bash
# Update package list
sudo apt update

# Install Node.js 18+ (using NodeSource repository)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Or using snap:

```bash
sudo snap install node --classic
```

## Step 2: Install DFX SDK

### Easy Method (Recommended):

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

This will:
- Download and install DFX
- Add it to your PATH
- Set up everything automatically

### Verify DFX Installation:

```bash
# Close and reopen terminal, then:
dfx --version
```

You should see: `dfx 0.x.x`

## Step 3: Install Project Dependencies

```bash
# Navigate to project directory
cd ~/Desktop/coverce.ai
# (or wherever you have the project)

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
sudo apt update
sudo apt install -y ffmpeg

# Verify
ffmpeg -version
```

## Step 5: Run the Project

### Terminal 1 - Start ICP Network:

```bash
dfx start
```

Keep this running. Wait for "Replica ready" message.

### Terminal 2 - Deploy Canisters:

```bash
cd ~/Desktop/coverce.ai
dfx generate
dfx deploy
```

### Terminal 3 - Start Frontend:

```bash
cd ~/Desktop/coverce.ai/src/coverce_frontend
npm run dev
```

### Open Browser:

Go to: **http://localhost:3000**

## Quick Setup Script

Save this as `setup-linux.sh` and run it:

```bash
#!/bin/bash

echo "🎬 Coverce.ai Linux Setup"
echo "========================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

echo "✅ Node.js: $(node --version)"

# Check DFX
if ! command -v dfx &> /dev/null; then
    echo "Installing DFX SDK..."
    sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
fi

echo "✅ DFX: $(dfx --version)"

# Install dependencies
echo "Installing project dependencies..."
npm install
cd src/coverce_frontend && npm install && cd ../..
cd src/ai_orchestrator && npm install && cd ../..

# Install FFmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo "Installing FFmpeg..."
    sudo apt update
    sudo apt install -y ffmpeg
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Terminal 1: dfx start"
echo "2. Terminal 2: dfx generate && dfx deploy"
echo "3. Terminal 3: cd src/coverce_frontend && npm run dev"
echo "4. Open: http://localhost:3000"
```

Make it executable and run:

```bash
chmod +x setup-linux.sh
./setup-linux.sh
```

## Troubleshooting

### "dfx: command not found" after installation

**Solution:**
```bash
# Add to PATH manually
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### "Permission denied" errors

**Solution:**
```bash
# Make scripts executable
chmod +x setup-linux.sh
chmod +x install.ps1  # if you have it
```

### Port already in use

**Solution:**
```bash
# Find what's using port 8000 or 3000
sudo lsof -i :8000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

### npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try with legacy peer deps
npm install --legacy-peer-deps
```

## Differences from Windows

1. **File paths**: Use forward slashes `/` instead of backslashes `\`
2. **Commands**: Same commands, but some Windows-specific tools won't work
3. **Permissions**: May need `sudo` for some installations
4. **Package managers**: Use `apt` instead of Chocolatey

## Next Steps

After installation:
1. ✅ Verify: `dfx --version` and `node --version`
2. 📖 Read [HOW_TO_RUN.md](./HOW_TO_RUN.md) (commands are the same)
3. 🚀 Follow [QUICK_PREVIEW.md](./QUICK_PREVIEW.md) to test

