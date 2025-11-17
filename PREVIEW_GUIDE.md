# Preview Guide - Testing Coverce.ai MVP

This guide walks you through previewing and testing all functionality of the Coverce.ai MVP.

## 🎯 Quick Preview (5 minutes)

### Step 1: Start the Local Environment

**Terminal 1 - Start ICP Network:**
```bash
dfx start
```
Wait until you see: `"Replica ready"` or similar message. Keep this terminal open.

**Terminal 2 - Deploy Canisters:**
```bash
# Generate TypeScript bindings
dfx generate

# Deploy both canisters
dfx deploy
```

You should see output like:
```
Deployed canisters.
URLs:
  Frontend canister via browser
    http://127.0.0.1:8000/?canisterId=<canister-id>
  Backend canister via Candid interface:
    http://127.0.0.1:8000/?canisterId=<canister-id>&id=<canister-id>
```

**Terminal 3 - Start Frontend Dev Server:**
```bash
cd src/coverce_frontend
npm run dev
```

The frontend will start at `http://localhost:3000`

### Step 2: Open the Application

1. Open your browser to `http://localhost:3000`
2. You should see the Coverce.ai homepage with:
   - Hero section with "Submit scripts. Get validated. Watch AI bring them to life."
   - Feature cards (Submit Scripts, Get Validated, AI Generates Film)
   - "How It Works" section

## 🧪 Testing Each Feature

### Test 1: Authentication (Internet Identity)

1. Click **"Login with Internet Identity"** in the navbar
2. A popup will appear for Internet Identity
3. For local development:
   - Click "Create Internet Identity" or use existing
   - You'll get a local identity (no real authentication needed locally)
4. After login, you should see:
   - Your principal ID in the navbar (e.g., `rrkah-f...`)
   - "Logout" button
   - New menu items: "Submit Script" and "Validate"

**Expected Result:** ✅ You're logged in and can see authenticated features

---

### Test 2: Submit a Script

1. Click **"Submit Script"** in the navbar (or from homepage)
2. Fill out the form:
   - **Title**: "My First Script"
   - **Format**: Select "Fountain" (or PDF/Text)
   - **File**: Create a test script file:
     ```bash
     # Create a simple test script
     echo "INT. COFFEE SHOP - DAY

     A writer sits at a table, typing on a laptop.

     WRITER
     This is my first script submission.

     FADE OUT." > test_script.fountain
     ```
   - **Summary** (optional): "A simple test script"
3. Click **"Submit Script"**
4. You should see: "Script submitted successfully! Redirecting..."
5. You'll be redirected to the Scripts page

**Expected Result:** ✅ Script appears in the scripts list with status "PendingValidation"

---

### Test 3: Become a Validator

1. Click **"Validate"** in the navbar
2. You'll see a page: "Become a Validator"
3. Click **"Register as Validator"**
4. You should see: The validator dashboard with "Pending Scripts" section

**Expected Result:** ✅ You're now a validator and can see pending scripts

---

### Test 4: Validate a Script

1. In the Validator Dashboard, you should see your submitted script in the left panel
2. Click on the script card to select it
3. The right panel will show the scoring form
4. Score each category (1-10) using the sliders:
   - **Story**: 8
   - **Characters**: 7
   - **Dialogue**: 6
   - **Originality**: 9
   - **Structure**: 7
   - **Visual Potential**: 8
5. Add optional comments: "Great concept, needs more character development"
6. Click **"Submit Validation"**
7. You should see: "Validation submitted successfully!"

**Expected Result:** ✅ Script now has a score and status may change

---

### Test 5: View Scripts and Scores

1. Click **"Scripts"** in the navbar
2. You should see:
   - Your submitted script
   - Status badge (color-coded)
   - Score (if validated): e.g., "7.50/10"
   - Validator count: "1"
   - Upload date
3. If it's the top script, you'll see a "🏆 Top Script" badge

**Expected Result:** ✅ Script list shows all scripts with their scores and status

---

### Test 6: Select Top Script (Manual)

Since we only have one script, it's automatically the top script. To test movie generation:

1. Go to the Scripts page
2. If the script status is "Validated" or "Selected", you should see a **"Generate Movie"** button
3. Click it (this will trigger the AI orchestrator - see Test 7)

**Note:** For full testing, you may want to submit multiple scripts and validate them to see score comparisons.

---

### Test 7: AI Movie Generation (Optional - Requires API Keys)

**Prerequisites:** You need API keys for AI services. See `env.example` for required keys.

1. **Configure API Keys:**
   ```bash
   cd src/ai_orchestrator
   cp ../../env.example .env
   # Edit .env with your API keys
   ```

2. **Install FFmpeg:**
   - macOS: `brew install ffmpeg`
   - Linux: `sudo apt-get install ffmpeg`
   - Windows: Download from https://ffmpeg.org

3. **Test Orchestrator Manually:**
   ```bash
   cd src/ai_orchestrator
   npm install
   node index.js 0 test_script.fountain
   ```
   (Replace `0` with your script ID, and `test_script.fountain` with your script path)

4. **Or Trigger from Frontend:**
   - Click "Generate Movie" on a selected script
   - Status will change to "Generating"
   - Check backend logs for progress

**Expected Result:** ✅ Movie generation starts (takes several minutes)

---

### Test 8: View Generated Movie

1. Once generation completes, script status changes to "Completed"
2. Go to Scripts page
3. Click **"Watch Movie"** button
4. You'll be taken to the Movie Viewer page
5. Video player should load and play the generated movie

**Expected Result:** ✅ Movie plays in the video player

---

## 🎬 Complete User Flow Test

Test the full cycle:

1. **Submit 3 scripts** with different titles
2. **Validate all 3** with different scores
3. **Check Scripts page** - see which one has the highest score
4. **Generate movie** for the top script
5. **Watch the movie** when it's ready

## 🔍 What to Check

### Visual Checks:
- ✅ Homepage loads with gradient background
- ✅ Navigation works between pages
- ✅ Forms are styled and functional
- ✅ Status badges show correct colors
- ✅ Responsive design (try resizing browser)

### Functional Checks:
- ✅ Login/logout works
- ✅ Script upload succeeds
- ✅ Validation scores save correctly
- ✅ Aggregated scores calculate properly
- ✅ Script status updates correctly
- ✅ Top script is identified

### Data Checks:
- ✅ Scripts persist after page refresh
- ✅ Scores are accurate
- ✅ Validator count increments
- ✅ Status transitions work

## 🐛 Troubleshooting

### Issue: "Cannot connect to local network"
**Solution:** Make sure `dfx start` is running in Terminal 1

### Issue: Frontend shows "Failed to connect"
**Solution:** 
1. Check canister IDs in `src/coverce_frontend/src/services/coverceService.ts`
2. Run `dfx generate` again
3. Restart frontend dev server

### Issue: Internet Identity popup doesn't appear
**Solution:**
```bash
# Deploy Internet Identity locally
dfx deploy internet_identity
```

### Issue: Scripts don't appear after submission
**Solution:**
1. Check browser console for errors
2. Verify backend canister is deployed
3. Try refreshing the page

### Issue: Validation scores don't save
**Solution:**
1. Make sure you're registered as a validator
2. Check all categories have scores (1-10)
3. Check browser console for errors

## 📊 Expected Console Output

### Backend (dfx start terminal):
```
Replica ready
```

### Frontend (npm run dev terminal):
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### When deploying:
```
Deployed canisters.
URLs:
  Frontend canister via browser
    http://127.0.0.1:8000/?canisterId=...
```

## 🎯 Quick Test Checklist

- [ ] Homepage loads
- [ ] Can login with Internet Identity
- [ ] Can submit a script
- [ ] Can register as validator
- [ ] Can validate a script
- [ ] Scores appear correctly
- [ ] Script list shows all scripts
- [ ] Top script is identified
- [ ] Can trigger movie generation (if API keys configured)
- [ ] Can view generated movie (if generated)

## 💡 Tips for Best Preview Experience

1. **Use Multiple Browsers/Incognito**: Test with different identities
2. **Submit Multiple Scripts**: Better demonstrates the validation system
3. **Vary Scores**: Submit scripts with different quality scores
4. **Check Status Transitions**: Watch how status changes through the workflow
5. **Test Responsive Design**: Try on mobile/tablet viewport sizes

## 🚀 Next Steps After Preview

Once you've previewed the MVP:
1. Review the code structure
2. Customize styling/branding
3. Add your AI API keys for full testing
4. Deploy to ICP mainnet (see DEPLOYMENT.md)
5. Gather feedback and plan V2 features

---

**Happy Testing! 🎬**



