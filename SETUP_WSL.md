# Setting Up Coverce.ai on WSL (Windows Subsystem for Linux)

WSL lets you run Linux on Windows. This is the easiest way to run Coverce.ai on Linux.

## Step 1: Install WSL

Open PowerShell as Administrator and run:

```powershell
wsl --install
```

This will:
- Install WSL
- Install Ubuntu (default Linux distribution)
- Set everything up

**After running this, RESTART YOUR COMPUTER.**

## Step 2: Set Up Ubuntu

After restart:

1. **Ubuntu will launch automatically** (or search for "Ubuntu" in Start menu)
2. **Create a Linux username and password** when prompted
3. **Update Ubuntu:**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

## Step 3: Install Node.js

In your Ubuntu terminal:

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

## Step 4: Install DFX SDK

```bash
# Install DFX
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Add to PATH (if needed)
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify
dfx --version
```

## Step 5: Copy Project to WSL

You can access your Windows files from WSL:

```bash
# Your Windows files are in /mnt/c/
cd /mnt/c/Users/bspam/Desktop/coverce.ai

# Or copy to Linux home directory (recommended)
cp -r /mnt/c/Users/bspam/Desktop/coverce.ai ~/coverce.ai
cd ~/coverce.ai
```

## Step 6: Install Project Dependencies

```bash
# Install dependencies
npm install
cd src/coverce_frontend && npm install && cd ../..
cd src/ai_orchestrator && npm install && cd ../..
```

## Step 7: Install FFmpeg

```bash
sudo apt update
sudo apt install -y ffmpeg
```

## Step 8: Run the Project

Open **3 Ubuntu/WSL terminal windows**:

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

**Open browser:** http://localhost:3000

## Quick Setup Script

Or use the automated script:

```bash
cd ~/coverce.ai
chmod +x setup-linux.sh
./setup-linux.sh
```

## Accessing Files

- **Windows → Linux:** Files in `C:\Users\bspam\Desktop\` are at `/mnt/c/Users/bspam/Desktop/`
- **Linux → Windows:** Files in `~/` are in your Windows user folder (usually `\\wsl$\Ubuntu\home\yourusername\`)

## Tips

- Use Ubuntu terminal for all commands
- You can use Windows browser to access `http://localhost:3000`
- WSL integrates well with VS Code (install "Remote - WSL" extension)

