# Fix WSL Permission Error

The error "Operation not permitted" happens because you're working on Windows filesystem (`/mnt/c/`) from WSL. 

## Solution: Copy Project to Linux Filesystem

Copy the project to your Linux home directory for better performance and no permission issues:

```bash
# Remove any incomplete copy
rm -rf ~/coverce.ai

# Copy from Windows to Linux
cp -r /mnt/c/Users/bspam/Desktop/coverce.ai ~/coverce.ai

# Go to the project
cd ~/coverce.ai

# Clean any previous build artifacts
rm -rf .dfx

# Now try again
dfx generate
dfx deploy
```

## Why This Works

- Linux filesystem (`~/`) has proper permissions
- Better performance (no Windows filesystem overhead)
- No permission errors
- Standard Linux development workflow

## Alternative: Work from Windows Location

If you want to keep working from Windows location, you can try:

```bash
# Set umask to be more permissive
umask 000

# Then try again
cd /mnt/c/Users/bspam/Desktop/coverce.ai
dfx generate
```

But copying to Linux filesystem is recommended!

