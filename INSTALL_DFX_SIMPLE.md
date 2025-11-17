# Install DFX SDK - Simple Windows Guide

## Quick Method (5 minutes)

### Step 1: Download DFX

1. **Open your browser** and go to:
   https://github.com/dfinity/sdk/releases

2. **Find the latest release** (look for the green "Latest" tag)

3. **Download the Windows ZIP file:**
   - Look for: `dfx-x.x.x-x86_64-pc-windows-msvc.zip`
   - Example: `dfx-0.15.0-x86_64-pc-windows-msvc.zip`
   - Click to download

### Step 2: Extract DFX

1. **Create a folder:** `C:\dfx`
   - Open File Explorer
   - Go to `C:\`
   - Right-click → New → Folder
   - Name it: `dfx`

2. **Extract the ZIP file:**
   - Right-click the downloaded ZIP file
   - Click "Extract All..."
   - Extract to: `C:\dfx`
   - Make sure `dfx.exe` is directly in `C:\dfx` (not in a subfolder)

### Step 3: Add to PATH

**Option A: Using PowerShell (Easiest)**

1. **Open PowerShell as Administrator:**
   - Press `Windows Key + X`
   - Click "Windows PowerShell (Admin)"
   - Click "Yes" when prompted

2. **Run this command:**
   ```powershell
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\dfx", [EnvironmentVariableTarget]::User)
   ```

3. **Close PowerShell**

**Option B: Using GUI**

1. Press `Windows Key + X` → Click **"System"**
2. Click **"Advanced system settings"** (on the right side)
3. Click **"Environment Variables"** button (bottom)
4. Under **"User variables"** (top section), find **"Path"** → Click **"Edit"**
5. Click **"New"** → Type: `C:\dfx`
6. Click **"OK"** on all windows

### Step 4: Test Installation

1. **Close all PowerShell/Command Prompt windows**
2. **Open a new PowerShell window** (regular, not admin)
3. **Run:**
   ```powershell
   dfx --version
   ```

4. **You should see:**
   ```
   dfx 0.15.0
   ```
   (or whatever version you downloaded)

### ✅ Success!

If `dfx --version` works, you're done! Now you can:

```powershell
cd C:\Users\bspam\Desktop\coverce.ai
dfx start
```

---

## Troubleshooting

### "dfx: command not found" after adding to PATH

**Solution 1:** Restart your computer (PATH changes sometimes need a full restart)

**Solution 2:** Close ALL terminal windows and open a new one

**Solution 3:** Test with full path:
```powershell
C:\dfx\dfx.exe --version
```
If this works, PATH isn't set correctly. Try Step 3 again.

### "Access Denied" when extracting

**Solution:** Right-click the ZIP file → Properties → Unblock → OK → Then extract

### Can't find the download link

**Direct link format:**
- Go to: https://github.com/dfinity/sdk/releases
- Look for the file ending in: `-x86_64-pc-windows-msvc.zip`
- Click it to download

### Still having issues?

Try the official installation guide:
https://internetcomputer.org/docs/current/developer-docs/setup/install/

---

## Alternative: Use WSL (Windows Subsystem for Linux)

If you have WSL installed, you can install DFX in Linux:

```bash
wsl
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Then use WSL for all commands instead of PowerShell.


