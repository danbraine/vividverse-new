# Fix: dfx.json Not Found in WSL

## Problem
You're in `~/coverce.ai` but `dfx.json` is in the Windows location.

## Solution: Work from Windows Location

In your WSL terminal, run:

```bash
# Navigate to Windows location
cd /mnt/c/Users/bspam/Desktop/coverce.ai

# Verify dfx.json exists
ls -la dfx.json

# Now run dfx commands
dfx generate
dfx deploy
```

## Alternative: Copy Project Properly

If you want to work from `~/coverce.ai`, copy all files:

```bash
# Remove the incomplete copy
rm -rf ~/coverce.ai

# Copy everything from Windows
cp -r /mnt/c/Users/bspam/Desktop/coverce.ai ~/coverce.ai

# Go to the project
cd ~/coverce.ai

# Verify dfx.json exists
ls -la dfx.json

# Now run dfx commands
dfx generate
dfx deploy
```

## Quick Fix (Recommended)

Just work from the Windows location - it's easier:

```bash
cd /mnt/c/Users/bspam/Desktop/coverce.ai
dfx generate && dfx deploy
```

The `/mnt/c/` path gives you direct access to your Windows files from Linux.

