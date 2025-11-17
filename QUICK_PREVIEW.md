# Quick Preview - 3 Steps

The fastest way to see Coverce.ai in action:

## Step 1: Start Everything (3 terminals)

**Open 3 terminal windows** (PowerShell or Command Prompt on Windows)

**Terminal 1:**
```bash
dfx start
```
⚠️ Keep this running - don't close it!

**Terminal 2** (wait for Terminal 1 to show "Replica ready"):
```bash
dfx generate && dfx deploy
```

**Terminal 3:**
```bash
cd src/coverce_frontend && npm run dev
```
(On Windows, use: `cd src\coverce_frontend && npm run dev`)

## Step 2: Open Browser

Go to: **http://localhost:3000**

## Step 3: Test the Flow

1. **Login** → Click "Login with Internet Identity"
2. **Submit** → Click "Submit Script" → Upload a test file
3. **Validate** → Click "Validate" → Register → Score the script
4. **View** → Click "Scripts" → See your script with scores

**That's it!** You've tested the core MVP functionality.

---

## Need Help?

- **Don't know how to run these commands?** → See [HOW_TO_RUN.md](./HOW_TO_RUN.md)
- **Want detailed testing steps?** → See [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md)
- **Troubleshooting?** → Check the "Common Questions" section in HOW_TO_RUN.md

