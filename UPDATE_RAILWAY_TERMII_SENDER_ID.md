# Update Railway Environment Variable - TERMII_SENDER_ID

## Action Required

You need to update the `TERMII_SENDER_ID` environment variable in Railway from `TravelPlace` to `fastbeep`.

## Why?

- Your Termii account doesn't have "TravelPlace" approved as a sender ID yet
- "fastbeep" is the test sender ID that Termii activated for you
- The OTP API will fail with "TravelPlace" but works with "fastbeep"

## How to Update in Railway

### Step 1: Login to Railway
1. Go to https://railway.app/
2. Login to your account

### Step 2: Navigate to Backend Service
1. Select your project (ttp-saas-backend)
2. Click on your **backend service**

### Step 3: Update the Variable
1. Click on **"Variables"** tab
2. Find `TERMII_SENDER_ID` in the list
3. Click on it to edit
4. Change the value from `TravelPlace` to `fastbeep`
5. Click **"Save"** or press Enter

### Step 4: Wait for Redeploy
- Railway will automatically redeploy your backend
- This takes about 2-3 minutes
- Wait for the deployment to complete

## Current vs New Value

```env
# Current (in Railway)
TERMII_SENDER_ID=TravelPlace

# Change to
TERMII_SENDER_ID=fastbeep
```

## When to Change Back

Once your custom sender ID is approved by Termii (1-5 business days):

1. Go back to Railway Variables
2. Change `TERMII_SENDER_ID` from `fastbeep` to your approved sender ID
3. Example: `TERMII_SENDER_ID=TravelPlace` (if "TravelPlace" gets approved)

## Testing After Update

Once Railway redeploys, test the OTP:

```bash
# Test locally first
cd backend
node test-termii-otp.js +2349035573593

# Or test via your production API
# Register on https://test.ttp.ng
# Request phone verification
# Check if SMS arrives with "fastbeep" as sender
```

## Summary

**What to do NOW:**
1. Login to Railway
2. Update `TERMII_SENDER_ID` to `fastbeep`
3. Wait for redeploy
4. Test OTP functionality

**What to do LATER (after sender ID approval):**
1. Update `TERMII_SENDER_ID` to your approved sender ID
2. Test again
3. Production ready!

---

**Note**: The local `.env` file already has `fastbeep`, so local testing works. Railway needs the same update for production to work.
