# How to Run Coverce.ai - Step by Step

This guide shows you exactly how to run the commands, especially if you're new to the terminal.

**🪟 Windows users:** See Windows-specific instructions below  
**🐧 Linux users:** Commands are the same, just use forward slashes `/` instead of backslashes `\`

## 🪟 Windows Instructions (PowerShell or Command Prompt)

### Option 1: Using PowerShell (Recommended)

1. **Open PowerShell:**
   - Press `Windows Key + X`
   - Click "Windows PowerShell" or "Terminal"
   - Or search for "PowerShell" in Start menu

2. **Navigate to your project folder:**
   ```powershell
   cd C:\Users\bspam\Desktop\coverce.ai
   ```

3. **Open 3 PowerShell Windows:**
   - Right-click PowerShell icon → "Open new window" (do this 3 times)
   - Or press `Ctrl + Shift + N` in PowerShell to open a new window
   - Or open PowerShell from Start menu 3 times

### Option 2: Using Command Prompt (cmd)

1. **Open Command Prompt:**
   - Press `Windows Key + R`
   - Type `cmd` and press Enter
   - Or search for "Command Prompt" in Start menu

2. **Navigate to your project:**
   ```cmd
   cd C:\Users\bspam\Desktop\coverce.ai
   ```

3. **Open 3 Command Prompt windows** (same as PowerShell above)

---

## 📝 Step-by-Step: Running Each Terminal

### Terminal 1: Start ICP Network

1. **In the first terminal window**, type:
   ```powershell
   dfx start
   ```
   (or `dfx start` in Command Prompt)

2. **Wait for it to finish starting.** You'll see messages like:
   ```
   Starting local replica...
   Replica ready
   ```
   ⚠️ **Keep this terminal open!** Don't close it.

3. **Leave this running** - it's your local blockchain network.

---

### Terminal 2: Deploy Canisters

1. **Open a second terminal window**
2. **Navigate to the project folder again:**
   ```powershell
   cd C:\Users\bspam\Desktop\coverce.ai
   ```

3. **Run these commands one at a time:**
   ```powershell
   dfx generate
   ```
   Wait for it to finish (may take 30-60 seconds)

   Then run:
   ```powershell
   dfx deploy
   ```
   Wait for it to finish (may take 1-2 minutes)

4. **You should see:**
   ```
   Deployed canisters.
   URLs:
     Frontend canister via browser
       http://127.0.0.1:8000/?canisterId=...
   ```

---

### Terminal 3: Start Frontend

1. **Open a third terminal window**
2. **Navigate to the project folder:**
   ```powershell
   cd C:\Users\bspam\Desktop\coverce.ai
   ```

3. **Navigate to frontend folder:**
   ```powershell
   cd src\coverce_frontend
   ```
   (Note: Use backslashes `\` on Windows, or forward slashes `/` work too)

4. **Start the dev server:**
   ```powershell
   npm run dev
   ```

5. **You should see:**
   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:3000/
   ```

6. **Open your browser** and go to: **http://localhost:3000**

---

## 🖥️ macOS/Linux Instructions

### Using Terminal

1. **Open Terminal** (3 windows):
   - macOS: `Cmd + Space`, type "Terminal", press Enter
   - Linux: `Ctrl + Alt + T` or search for Terminal

2. **Navigate to project:**
   ```bash
   cd ~/Desktop/coverce.ai
   ```
   (Adjust path to where your project is)

3. **Follow the same 3-terminal steps above**, but use forward slashes `/`:
   ```bash
   # Terminal 1
   dfx start
   
   # Terminal 2
   dfx generate
   dfx deploy
   
   # Terminal 3
   cd src/coverce_frontend
   npm run dev
   ```

---

## 🎯 Visual Guide: What You Should See

### Terminal 1 (dfx start):
```
Starting local replica...
Replica ready
[Keeps running - don't close]
```

### Terminal 2 (dfx deploy):
```
Generating type definitions...
Deployed canisters.
URLs:
  Frontend canister via browser
    http://127.0.0.1:8000/?canisterId=...
```

### Terminal 3 (npm run dev):
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Browser (http://localhost:3000):
- Coverce.ai homepage
- "Login with Internet Identity" button
- Feature cards and "How It Works" section

---

## ❓ Common Questions

### Q: Do I need to install anything first?

**Yes!** Make sure you have:

1. **DFX SDK** installed:
   ```powershell
   dfx --version
   ```
   If this doesn't work, install from: https://internetcomputer.org/docs/current/developer-docs/setup/install/

2. **Node.js** installed:
   ```powershell
   node --version
   ```
   If this doesn't work, install from: https://nodejs.org/

3. **Dependencies** installed:
   ```powershell
   npm install
   cd src\coverce_frontend
   npm install
   cd ..\..
   cd src\ai_orchestrator
   npm install
   ```

### Q: What if "dfx" command not found?

**Install DFX SDK:**
- Windows: Follow instructions at https://internetcomputer.org/docs/current/developer-docs/setup/install/
- Or use the setup script: `.\setup.ps1` (PowerShell) or `setup.sh` (Linux/macOS)

### Q: What if "npm" command not found?

**Install Node.js:**
- Download from: https://nodejs.org/
- Install the LTS version
- Restart your terminal after installing

### Q: Can I use one terminal instead of three?

**Not recommended**, but you can use background processes:

**Windows PowerShell:**
```powershell
# Start dfx in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "dfx start"

# Wait a few seconds, then deploy
dfx generate
dfx deploy

# Start frontend
cd src\coverce_frontend
npm run dev
```

**But it's easier to use 3 separate windows!**

### Q: How do I stop everything?

1. **Terminal 1**: Press `Ctrl + C` to stop dfx
2. **Terminal 3**: Press `Ctrl + C` to stop the frontend server
3. **Terminal 2**: Can be closed (it's done)

### Q: What if I get errors?

**Common fixes:**

1. **"dfx: command not found"**
   - Install DFX SDK
   - Restart terminal
   - Check PATH environment variable

2. **"Cannot connect to local network"**
   - Make sure Terminal 1 (dfx start) is still running
   - Wait a bit longer for it to fully start

3. **"Port already in use"**
   - Something else is using port 8000 or 3000
   - Close other applications
   - Or change ports in config files

4. **"npm install" fails**
   - Check internet connection
   - Try: `npm install --legacy-peer-deps`
   - Delete `node_modules` folder and try again

---

## 🎬 Quick Copy-Paste Commands

**For Windows PowerShell (copy all at once):**

```powershell
# Terminal 1
dfx start

# Terminal 2 (wait for Terminal 1)
cd C:\Users\bspam\Desktop\coverce.ai
dfx generate
dfx deploy

# Terminal 3
cd C:\Users\bspam\Desktop\coverce.ai
cd src\coverce_frontend
npm run dev
```

**For macOS/Linux (copy all at once):**

```bash
# Terminal 1
dfx start

# Terminal 2 (wait for Terminal 1)
cd ~/Desktop/coverce.ai
dfx generate
dfx deploy

# Terminal 3
cd ~/Desktop/coverce.ai
cd src/coverce_frontend
npm run dev
```

---

## ✅ Success Checklist

After running all commands, you should have:

- [ ] Terminal 1 running `dfx start` (showing "Replica ready")
- [ ] Terminal 2 completed `dfx deploy` (showing "Deployed canisters")
- [ ] Terminal 3 running `npm run dev` (showing "Local: http://localhost:3000/")
- [ ] Browser open to http://localhost:3000 showing the Coverce.ai homepage

**If all checkboxes are checked, you're ready to test!** 🎉

See [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md) for testing instructions.



