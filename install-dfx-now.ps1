# Install DFX SDK - Run this as Administrator
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "Installing DFX SDK..." -ForegroundColor Cyan
Write-Host ""

# Get latest version
Write-Host "Fetching latest version..." -ForegroundColor Yellow
try {
    $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/dfinity/sdk/releases/latest"
    $version = $releases.tag_name -replace '^dfx-', ''
    Write-Host "Latest version: $version" -ForegroundColor Green
} catch {
    Write-Host "Error fetching version, using 0.15.0" -ForegroundColor Yellow
    $version = "0.15.0"
}

# Setup paths
$installDir = "C:\dfx"
$zipFile = "$env:TEMP\dfx-$version.zip"

# Create install directory
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
    Write-Host "Created directory: $installDir" -ForegroundColor Green
}

# Download
$downloadUrl = "https://github.com/dfinity/sdk/releases/download/dfx-$version/dfx-$version-x86_64-pc-windows-msvc.zip"
Write-Host "Downloading from: $downloadUrl" -ForegroundColor Yellow
Write-Host "This may take a minute..." -ForegroundColor Gray

try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile -UseBasicParsing
    Write-Host "Download complete" -ForegroundColor Green
} catch {
    Write-Host "Download failed. Trying alternative method..." -ForegroundColor Yellow
    # Try direct download
    $altUrl = "https://github.com/dfinity/sdk/releases/latest/download/dfx-$version-x86_64-pc-windows-msvc.zip"
    try {
        Invoke-WebRequest -Uri $altUrl -OutFile $zipFile -UseBasicParsing
        Write-Host "Download complete (alternative method)" -ForegroundColor Green
    } catch {
        Write-Host "ERROR: Could not download DFX" -ForegroundColor Red
        Write-Host "Please download manually from: https://github.com/dfinity/sdk/releases" -ForegroundColor Yellow
        Write-Host "Look for file: dfx-$version-x86_64-pc-windows-msvc.zip" -ForegroundColor Yellow
        exit 1
    }
}

# Extract
Write-Host "Extracting..." -ForegroundColor Yellow
try {
    Expand-Archive -Path $zipFile -DestinationPath $installDir -Force
    Write-Host "Extraction complete" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Extraction failed" -ForegroundColor Red
    exit 1
}

# Clean up
Remove-Item $zipFile -ErrorAction SilentlyContinue

# Add to PATH
Write-Host "Adding to PATH..." -ForegroundColor Yellow
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
if ($currentPath -notlike "*$installDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$installDir", "Machine")
    Write-Host "Added to system PATH" -ForegroundColor Green
} else {
    Write-Host "Already in PATH" -ForegroundColor Green
}

# Refresh PATH for current session
$env:Path += ";$installDir"

# Verify
Write-Host ""
Write-Host "Verifying installation..." -ForegroundColor Yellow
if (Test-Path "$installDir\dfx.exe") {
    try {
        $dfxVersion = & "$installDir\dfx.exe" --version 2>&1
        Write-Host "SUCCESS! DFX installed" -ForegroundColor Green
        Write-Host "Version: $dfxVersion" -ForegroundColor Green
    } catch {
        Write-Host "DFX installed but verification failed" -ForegroundColor Yellow
    }
} else {
    Write-Host "WARNING: dfx.exe not found in $installDir" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Close and reopen PowerShell (to refresh PATH)" -ForegroundColor White
Write-Host "2. Run: dfx --version" -ForegroundColor White
Write-Host "3. If it works, navigate to your project and run: dfx start" -ForegroundColor White
Write-Host ""

