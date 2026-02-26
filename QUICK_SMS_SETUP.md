# Quick SMS Setup Guide - Action Required ⚡

## Current Status

✅ **Code Implementation**: Complete - Dual-provider SMS service is ready
✅ **Documentation**: Complete - Full guides created
⏳ **Configuration**: Pending - Need to add API keys to Railway

## What You Need to Do NOW

### Step 1: Sign Up for Termii (5 minutes)

1. Go to **https://termii.com**
2. Click "Get Started" or "Sign Up"
3. Fill in your business details
4. Verify your email
5. Login to dashboard
6. Go to **Settings → API Keys**
7. Copy your API Key
8. (Optional) Go to **Sender ID** and register "TravelPlace"

**Minimum Funding**: ₦1,000 (gets you ~400 SMS)

### Step 2: Sign Up for Telnyx (5 minutes)

1. Go to **https://telnyx.com**
2. Click "Sign Up" (you get $10 free credit!)
3. Verify your email
4. Login to portal
5. Go to **Messaging → Messaging Profiles**
6. Create a new profile
7. Go to **API Keys** in left menu
8. Create a new API key
9. Copy the API key (shown only once!)

**Note**: You can use alphanumeric sender ID "TravelPlace" or buy a phone number

### Step 3: Add to Railway (2 minutes)

1. Go to **https://railway.app**
2. Open your backend project
3. Click on your service
4. Go to **Variables** tab
5. Click **+ New Variable**
6. Add these three variables:

```
TERMII_API_KEY=paste_your_termii_key_here
TERMII_SENDER_ID=TravelPlace
TELNYX_API_KEY=paste_your_telnyx_key_here
```

7. Railway will automatically restart your service

### Step 4: Test (2 minutes)

Test with a Nigerian number:

```bash
curl -X POST https://api.test.ttp.ng/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phoneNumber": "+2348012345678",
    "password": "Test123!@#"
  }'
```

Check your phone for the OTP SMS!

## Expected Results

### Before (Using Twilio)
- Cost: ₦180 per SMS
- Monthly cost for 1,000 SMS: ₦180,000

### After (Using Termii + Telnyx)
- Nigerian SMS: ₦2.50 per SMS (via Termii)
- International SMS: ₦60 per SMS (via Telnyx)
- Monthly cost for 1,000 Nigerian SMS: ₦2,500

**Savings: ₦177,500 per 1,000 SMS (98.6% reduction!)**

## Verification Checklist

After setup, verify:

- [ ] Termii account created and funded
- [ ] Telnyx account created (has $10 free credit)
- [ ] Both API keys added to Railway
- [ ] Railway service restarted (automatic)
- [ ] Test SMS received on Nigerian number
- [ ] Check Railway logs for "SMS sent via termii"

## Check Railway Logs

```bash
# If you have Railway CLI
railway logs --tail

# Or check in Railway dashboard
# Go to your service → Deployments → View Logs
```

Look for:
```
SMS sent via Termii to +234...
```

## Troubleshooting

### "Termii API key not configured"
- Check Railway Variables tab
- Ensure TERMII_API_KEY is set
- Restart service manually if needed

### "Insufficient balance"
- Fund your Termii account
- Minimum ₦1,000

### SMS not received
- Check phone number format (+234...)
- Check Termii dashboard for delivery status
- Check Railway logs for errors

## Cost Breakdown

### Termii Pricing (Nigeria)
- ₦2.50 per SMS
- No monthly fees
- Pay as you go

### Telnyx Pricing (International)
- $0.04 per SMS to Nigeria (~₦60)
- $0.004-0.008 per SMS to US/UK
- No monthly fees
- $10 free credit on signup

### Comparison

| Volume | Twilio Cost | New Cost | Savings |
|--------|-------------|----------|---------|
| 100 SMS | ₦18,000 | ₦250 | ₦17,750 |
| 500 SMS | ₦90,000 | ₦1,250 | ₦88,750 |
| 1,000 SMS | ₦180,000 | ₦2,500 | ₦177,500 |
| 5,000 SMS | ₦900,000 | ₦12,500 | ₦887,500 |

## Next Steps After SMS Setup

1. **Fix Email Verification** (if still not working)
   - Check Gmail App Password
   - Or switch to Resend (see MESSAGING_SERVICES_SETUP.md)

2. **Enforce Email Verification** (optional)
   - Add `requireEmailVerification` middleware to booking routes
   - See backend/v1/middleware/authMiddleware.js

3. **Setup WhatsApp** (optional)
   - See MESSAGING_SERVICES_SETUP.md for WhatsApp setup
   - Can use Telnyx for WhatsApp too

## Support Links

- **Termii Dashboard**: https://termii.com/dashboard
- **Termii Docs**: https://developers.termii.com
- **Telnyx Portal**: https://portal.telnyx.com
- **Telnyx Docs**: https://developers.telnyx.com
- **Railway Dashboard**: https://railway.app

## Summary

**Total Setup Time**: ~15 minutes
**Cost**: ₦1,000 initial funding (Termii) + $0 (Telnyx has free credit)
**Expected Savings**: 98.6% on Nigerian SMS
**Status**: Ready to deploy - just add API keys!

---

**Action Required**: Add TERMII_API_KEY and TELNYX_API_KEY to Railway now! 🚀
