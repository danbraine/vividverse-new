# Manual DFX Installation Script for Windows
# This script downloads and installs DFX SDK

Write-Host "Installing DFX SDK for Windows..." -ForegroundColor Cyan
Write-Host ""

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  This script should be run as Administrator for best results" -ForegroundColor Yellow
    Write-Host "   Right-click PowerShell -> Run as Administrator" -ForegroundColor Yellow
    Write-Host ""
}

# Get latest DFX version
Write-Host "Fetching latest DFX version..." -ForegroundColor Yellow
try {
    $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/dfinity/sdk/releases/latest"
    $version = $releases.tag_name -replace '^dfx-', ''
    $downloadUrl = "https://github.com/dfinity/sdk/releases/download/dfx-$version/dfx-$version-x86_64-pc-windows-msvc.zip"
    Write-Host "Latest version: $version" -ForegroundColor Green
} catch {
    Write-Host "Could not fetch latest version, using fallback..." -ForegroundColor Yellow
    $version = "0.15.0"
    $downloadUrl = "https://github.com/dfinity/sdk/releases/download/dfx-$version/dfx-$version-x86_64-pc-windows-msvc.zip"
}

# Create installation directory
$installDir = "C:\dfx"
Write-Host "Installation directory: $installDir" -ForegroundColor Yellow

if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
    Write-Host "Created directory: $installDir" -ForegroundColor Green
}

# Download DFX
$zipFile = "$env:TEMP\dfx-$version.zip"
Write-Host "Downloading DFX SDK..." -ForegroundColor Yellow
Write-Host "URL: $downloadUrl" -ForegroundColor Gray

try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile -UseBasicParsing
    Write-Host "Download complete" -ForegroundColor Green
} catch {
    Write-Host "❌ Download failed: $_" -ForegroundColor Red
    Write-Host "Please download manually from: https://github.com/dfinity/sdk/releases" -ForegroundColor Yellow
    exit 1
}

# Extract ZIP
Write-Host "Extracting DFX..." -ForegroundColor Yellow
try {
    Expand-Archive -Path $zipFile -DestinationPath $installDir -Force
    Write-Host "Extraction complete" -ForegroundColor Green
} catch {
    Write-Host "❌ Extraction failed: $_" -ForegroundColor Red
    exit 1
}

# Clean up
Remove-Item $zipFile -ErrorAction SilentlyContinue

# Add to PATH
Write-Host "Adding to PATH..." -ForegroundColor Yellow
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*$installDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$installDir", "User")
    Write-Host "Added to user PATH" -ForegroundColor Green
} else {
    Write-Host "Already in PATH" -ForegroundColor Green
}

# Refresh PATH for current session
$env:Path += ";$installDir"

# Verify installation
Write-Host ""
Write-Host "Verifying installation..." -ForegroundColor Yellow
try {
    $dfxVersion = & "$installDir\dfx.exe" --version 2>&1
    Write-Host "✅ DFX installed successfully!" -ForegroundColor Green
    Write-Host "Version: $dfxVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Installation complete, but verification failed" -ForegroundColor Yellow
    Write-Host "   Please restart PowerShell and run: dfx --version" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Close and reopen PowerShell (to refresh PATH)" -ForegroundColor White
Write-Host "2. Run: dfx --version" -ForegroundColor White
Write-Host "3. If it works, you're ready to use Coverce.ai!" -ForegroundColor White
Write-Host ""


