# Installing DFX SDK on Windows - Step by Step

## Method 1: Using PowerShell Script (Easiest)

### Step 1: Open PowerShell as Administrator

1. Press `Windows Key + X`
2. Click **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**
3. Click "Yes" when prompted by User Account Control

### Step 2: Run Installation Script

Copy and paste this entire command into PowerShell:

```powershell
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://internetcomputer.org/install.sh' -OutFile 'install-dfx.sh'; bash install-dfx.sh}"
```

**OR** if you have WSL (Windows Subsystem for Linux) installed:

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### Step 3: Restart PowerShell

1. Close the current PowerShell window
2. Open a new PowerShell window (regular, not admin)
3. Test: `dfx --version`

---

## Method 2: Manual Installation (If Method 1 doesn't work)

### Step 1: Download DFX

1. Go to: https://github.com/dfinity/sdk/releases
2. Find the latest release (e.g., `dfx-0.15.0-x86_64-pc-windows-msvc.zip`)
3. Download the ZIP file

### Step 2: Extract DFX

1. Create a folder: `C:\dfx`
2. Extract the ZIP file contents to `C:\dfx`
3. You should have: `C:\dfx\dfx.exe`

### Step 3: Add to PATH

**Option A: Using PowerShell (Run as Administrator)**

```powershell
# Add to system PATH
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\dfx", [EnvironmentVariableTarget]::Machine)
```

**Option B: Using GUI**

1. Press `Windows Key + X` → Click **"System"**
2. Click **"Advanced system settings"** (on the right)
3. Click **"Environment Variables"** button
4. Under **"System variables"**, find **"Path"** → Click **"Edit"**
5. Click **"New"** → Type: `C:\dfx`
6. Click **"OK"** on all windows

### Step 4: Restart PowerShell

1. Close all PowerShell windows
2. Open a new PowerShell window
3. Test: `dfx --version`

---

## Method 3: Using WSL (Windows Subsystem for Linux)

If you have WSL installed, you can install DFX in Linux:

### Step 1: Open WSL Terminal

```bash
wsl
```

### Step 2: Install DFX

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### Step 3: Add to PATH (if needed)

```bash
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Step 4: Test

```bash
dfx --version
```

**Note:** When using WSL, run all commands from WSL, not PowerShell.

---

## Method 4: Using Chocolatey (If you have it)

If you have Chocolatey package manager installed:

```powershell
choco install dfx
```

---

## Verify Installation

After installation, open a **new** PowerShell window and run:

```powershell
dfx --version
```

You should see something like:
```
dfx 0.15.0
```

If you still get an error, try:

1. **Restart your computer** (PATH changes sometimes need a full restart)
2. **Check PATH manually:**
   ```powershell
   $env:Path -split ';' | Select-String dfx
   ```
3. **Try full path:**
   ```powershell
   C:\dfx\dfx.exe --version
   ```

---

## Troubleshooting

### "dfx: command not found" after installation

**Solution 1: Restart PowerShell**
- Close all PowerShell windows
- Open a new one
- Try again

**Solution 2: Restart Computer**
- Sometimes PATH changes need a full restart

**Solution 3: Check PATH**
```powershell
# Check if dfx is in PATH
$env:Path -split ';' | Select-String dfx

# If empty, add it manually (see Method 2, Step 3)
```

**Solution 4: Use Full Path**
```powershell
# If dfx is in C:\dfx
C:\dfx\dfx.exe --version

# If it works, PATH isn't set correctly
```

### "Access Denied" errors

**Solution:** Run PowerShell as Administrator

### Installation script fails

**Solution:** Use Method 2 (Manual Installation) instead

### Still having issues?

1. Check DFX installation docs: https://internetcomputer.org/docs/current/developer-docs/setup/install/
2. Check GitHub issues: https://github.com/dfinity/sdk/issues
3. Try installing in WSL instead

---

## Quick Test After Installation

Once `dfx --version` works, test the full setup:

```powershell
# Navigate to project
cd C:\Users\bspam\Desktop\coverce.ai

# Start DFX (this should work now)
dfx start
```

---

## Next Steps

After DFX is installed:

1. ✅ Verify: `dfx --version`
2. 📖 Read [HOW_TO_RUN.md](./HOW_TO_RUN.md)
3. 🚀 Follow [QUICK_PREVIEW.md](./QUICK_PREVIEW.md)


