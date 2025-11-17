# Install DFX SDK - Right Now (Windows)

## Quick Manual Installation

### Step 1: Download DFX

1. **Open your browser** and go to:
   ```
   https://github.com/dfinity/sdk/releases
   ```

2. **Look for a STABLE release** (not beta) - scroll down past the beta releases

3. **Find a release that has a Windows file**, look for:
   - `dfx-x.x.x-x86_64-pc-windows-msvc.zip`
   - OR any file with `windows` in the name

4. **If you can't find Windows builds in recent releases**, try this older stable version:
   - Go to: https://github.com/dfinity/sdk/releases/tag/dfx-0.15.0
   - Download: `dfx-0.15.0-x86_64-pc-windows-msvc.zip`

### Step 2: Extract and Install

Once downloaded, run these commands in PowerShell (as Administrator):

```powershell
# Create directory
New-Item -ItemType Directory -Path "C:\dfx" -Force

# Extract (replace with your actual download path)
# The file is probably in your Downloads folder
$zipFile = Get-ChildItem "$env:USERPROFILE\Downloads\dfx-*-windows*.zip" | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($zipFile) {
    Write-Host "Found: $($zipFile.Name)"
    Expand-Archive -Path $zipFile.FullName -DestinationPath "C:\dfx" -Force
    Write-Host "Extracted to C:\dfx"
} else {
    Write-Host "ZIP file not found. Please extract manually to C:\dfx"
}

# Add to PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
if ($currentPath -notlike "*C:\dfx*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;C:\dfx", "Machine")
    Write-Host "Added to PATH"
}

# Refresh PATH for this session
$env:Path += ";C:\dfx"

# Test
if (Test-Path "C:\dfx\dfx.exe") {
    C:\dfx\dfx.exe --version
    Write-Host "SUCCESS! DFX is installed"
} else {
    Write-Host "dfx.exe not found. Please check extraction."
}
```

### Step 3: Verify

Close and reopen PowerShell, then:
```powershell
dfx --version
```

---

## Alternative: Use WSL (Windows Subsystem for Linux)

If Windows installation is too difficult, use WSL:

1. **Install WSL:**
   ```powershell
   wsl --install
   ```
   (Restart computer after this)

2. **In WSL terminal:**
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

3. **Use WSL for all commands** instead of PowerShell

