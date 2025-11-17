# Installation Guide - Windows

Complete step-by-step guide to install all dependencies for Coverce.ai on Windows.

## 📋 Prerequisites Checklist

Before starting, you'll need:
- [ ] Windows 10/11
- [ ] Administrator access (for some installations)
- [ ] Internet connection

## Step 1: Install Node.js (Required)

### Option A: Using Official Installer (Recommended)

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the **LTS version** (Long Term Support)
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Run the installer:**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - ✅ **Important:** Check "Automatically install the necessary tools" if prompted
   - Click "Install" (may need administrator password)
   - Click "Finish"

3. **Verify installation:**
   - Open PowerShell (Windows Key + X → PowerShell)
   - Type:
     ```powershell
     node --version
     ```
   - Should show: `v18.x.x` or higher
   - Type:
     ```powershell
     npm --version
     ```
   - Should show: `9.x.x` or higher

### Option B: Using Chocolatey (If you have it)

```powershell
choco install nodejs-lts
```

---

## Step 2: Install DFX SDK (Required)

### Method 1: Using PowerShell Script (Easiest)

1. **Open PowerShell as Administrator:**
   - Right-click Start menu → "Windows PowerShell (Admin)"
   - Or search "PowerShell" → Right-click → "Run as administrator"

2. **Run the installation script:**
   ```powershell
   powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest 'https://internetcomputer.org/install.sh' -OutFile install.sh; bash install.sh}"
   ```

   **OR** if that doesn't work, use the manual method below.

### Method 2: Manual Installation

1. **Download DFX:**
   - Go to: https://github.com/dfinity/sdk/releases
   - Download the latest `dfx-x.x.x-x86_64-pc-windows-msvc.zip` file

2. **Extract and install:**
   - Extract the ZIP file to a folder (e.g., `C:\dfx`)
   - Open PowerShell as Administrator
   - Add to PATH:
     ```powershell
     [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\dfx", [EnvironmentVariableTarget]::Machine)
     ```
   - Replace `C:\dfx` with your actual path

3. **Restart PowerShell** and verify:
   ```powershell
   dfx --version
   ```
   Should show: `dfx x.x.x`

### Method 3: Using WSL (Windows Subsystem for Linux)

If you have WSL installed:

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Then use WSL for all commands.

---

## Step 3: Install Project Dependencies

1. **Open PowerShell** (regular, not admin needed)

2. **Navigate to your project:**
   ```powershell
   cd C:\Users\bspam\Desktop\coverce.ai
   ```

3. **Install root dependencies:**
   ```powershell
   npm install
   ```
   Wait for it to finish (may take 1-2 minutes)

4. **Install frontend dependencies:**
   ```powershell
   cd src\coverce_frontend
   npm install
   cd ..\..
   ```

5. **Install AI orchestrator dependencies:**
   ```powershell
   cd src\ai_orchestrator
   npm install
   cd ..\..
   ```

---

## Step 4: Install FFmpeg (Optional - For AI Movie Generation)

FFmpeg is needed for the AI orchestrator to stitch videos together.

### Option A: Using Chocolatey (Easiest)

If you have Chocolatey installed:
```powershell
choco install ffmpeg
```

### Option B: Manual Installation

1. **Download FFmpeg:**
   - Go to: https://www.gyan.dev/ffmpeg/builds/
   - Click "Download Build" (full build recommended)
   - Download the ZIP file

2. **Extract FFmpeg:**
   - Extract to: `C:\ffmpeg`
   - You should have: `C:\ffmpeg\bin\ffmpeg.exe`

3. **Add to PATH:**
   - Press `Windows Key + X` → "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find "Path" → Click "Edit"
   - Click "New" → Add: `C:\ffmpeg\bin`
   - Click "OK" on all windows

4. **Restart PowerShell** and verify:
   ```powershell
   ffmpeg -version
   ```
   Should show version information

### Option C: Using winget (Windows 11)

```powershell
winget install ffmpeg
```

---

## Step 5: Verify All Installations

Run these commands in PowerShell to verify everything is installed:

```powershell
# Check Node.js
node --version
npm --version

# Check DFX
dfx --version

# Check FFmpeg (optional)
ffmpeg -version
```

All should show version numbers without errors.

---

## Step 6: Run Setup Script (Optional)

We've created a setup script to automate some steps:

```powershell
# Navigate to project
cd C:\Users\bspam\Desktop\coverce.ai

# Run setup script
.\setup.ps1
```

This will:
- Check if Node.js and DFX are installed
- Install all npm dependencies
- Create necessary directories
- Set up environment files

---

## 🐛 Troubleshooting

### "node: command not found"

**Problem:** Node.js not installed or not in PATH

**Solution:**
1. Reinstall Node.js from https://nodejs.org/
2. Restart PowerShell after installation
3. Check PATH: `$env:Path` should contain Node.js path

### "npm: command not found"

**Problem:** npm not installed with Node.js

**Solution:**
1. Reinstall Node.js (npm comes with it)
2. Make sure to check "Add to PATH" during installation

### "dfx: command not found"

**Problem:** DFX SDK not installed or not in PATH

**Solution:**
1. Follow Step 2 above to install DFX
2. Restart PowerShell after installation
3. Verify PATH includes DFX location

### "npm install" fails with errors

**Problem:** Network issues or permission problems

**Solutions:**
1. **Check internet connection**
2. **Clear npm cache:**
   ```powershell
   npm cache clean --force
   ```
3. **Try with legacy peer deps:**
   ```powershell
   npm install --legacy-peer-deps
   ```
4. **Run PowerShell as Administrator** and try again
5. **Check firewall/antivirus** isn't blocking npm

### "Permission denied" errors

**Problem:** Need administrator privileges

**Solution:**
1. Right-click PowerShell → "Run as administrator"
2. Navigate to project folder
3. Run commands again

### Port already in use (8000 or 3000)

**Problem:** Another application is using the ports

**Solution:**
1. **Find what's using the port:**
   ```powershell
   netstat -ano | findstr :8000
   netstat -ano | findstr :3000
   ```
2. **Kill the process** (replace PID with number from above):
   ```powershell
   taskkill /PID <PID> /F
   ```
3. Or change ports in config files

---

## ✅ Installation Checklist

After installation, verify:

- [ ] Node.js installed (`node --version` works)
- [ ] npm installed (`npm --version` works)
- [ ] DFX SDK installed (`dfx --version` works)
- [ ] Root dependencies installed (`npm install` completed)
- [ ] Frontend dependencies installed (`cd src\coverce_frontend && npm install` completed)
- [ ] AI orchestrator dependencies installed (`cd src\ai_orchestrator && npm install` completed)
- [ ] FFmpeg installed (optional, `ffmpeg -version` works)

---

## 🚀 Quick Install Script

Save this as `install.ps1` and run it:

```powershell
# Coverce.ai Quick Install Script
Write-Host "Installing Coverce.ai dependencies..." -ForegroundColor Cyan

# Check Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check DFX
if (!(Get-Command dfx -ErrorAction SilentlyContinue)) {
    Write-Host "DFX SDK not found. Please install from https://internetcomputer.org/docs/current/developer-docs/setup/install/" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location src\coverce_frontend
npm install
Set-Location ..\..

Write-Host "Installing AI orchestrator dependencies..." -ForegroundColor Yellow
Set-Location src\ai_orchestrator
npm install
Set-Location ..\..

Write-Host "✅ Installation complete!" -ForegroundColor Green
```

Run with:
```powershell
.\install.ps1
```

---

## 📚 Additional Resources

- **Node.js Docs:** https://nodejs.org/docs/
- **DFX SDK Docs:** https://internetcomputer.org/docs/current/developer-docs/setup/install/
- **FFmpeg Docs:** https://ffmpeg.org/documentation.html
- **npm Docs:** https://docs.npmjs.com/

---

## Next Steps

After installation is complete:

1. ✅ Verify all installations (Step 5 above)
2. 📖 Read [HOW_TO_RUN.md](./HOW_TO_RUN.md) to learn how to run the project
3. 🚀 Follow [QUICK_PREVIEW.md](./QUICK_PREVIEW.md) to start testing

---

**Need help?** Check the troubleshooting section above or open an issue.



