# How to Open Linux (WSL) on Windows

After installing WSL, here are several ways to open it:

## Method 1: Search in Start Menu (Easiest)

1. Press `Windows Key`
2. Type: **"Ubuntu"** or **"WSL"**
3. Click on **"Ubuntu"** (or your installed Linux distribution)
4. Terminal will open with Linux prompt

## Method 2: From PowerShell/Command Prompt

Open PowerShell or Command Prompt and type:
```powershell
wsl
```
or
```powershell
ubuntu
```

## Method 3: From Windows Terminal

1. Press `Windows Key + X`
2. Click **"Windows Terminal"** (or **"Terminal"**)
3. Click the dropdown arrow next to the `+` tab
4. Select **"Ubuntu"** (or your Linux distribution)

## Method 4: Pin to Taskbar

1. Search for "Ubuntu" in Start menu
2. Right-click on Ubuntu
3. Click **"Pin to taskbar"**
4. Click the icon anytime to open

## Method 5: Create Desktop Shortcut

1. Search for "Ubuntu" in Start menu
2. Right-click on Ubuntu
3. Click **"Open file location"**
4. Right-click the shortcut → **"Send to"** → **"Desktop (create shortcut)"**

## Verify You're in Linux

Once Ubuntu opens, you should see:
```bash
username@computername:~$
```

You're in Linux! You can now run Linux commands.

## First Time Setup

If this is your first time opening Ubuntu:
1. It will ask you to create a **username** (lowercase, no spaces)
2. It will ask for a **password** (won't show as you type - that's normal)
3. Confirm the password

## Next Steps

Once you're in Linux, navigate to your project:

```bash
# Go to your project (Windows files are in /mnt/c/)
cd /mnt/c/Users/bspam/Desktop/coverce.ai

# Or copy to Linux home directory (recommended for better performance)
cp -r /mnt/c/Users/bspam/Desktop/coverce.ai ~/coverce.ai
cd ~/coverce.ai
```

Then continue with installation!

