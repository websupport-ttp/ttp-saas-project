# Railway Environment Variables - SMS Configuration

## Copy These to Railway

Go to Railway → Your Backend Service → Variables → Add these:

```bash
# Termii Configuration (Nigerian SMS - Primary)
TERMII_API_KEY=TLfqBRIbxRUDKWDvWdUJjsTTwSPVypcxtvFwLrTbtmbLnEfueeATrXvduHEJNQ
TERMII_BASE_URL=https://v3.api.termii.com
TERMII_SENDER_ID=TravelPlace

# Telnyx Configuration (International SMS - Secondary)
# Sign up at https://telnyx.com to get your API key
TELNYX_API_KEY=your_telnyx_api_key_here
TELNYX_PHONE_NUMBER=+1234567890

# Keep existing Twilio as fallback (already configured in Railway)
# TWILIO_ACCOUNT_SID=<your_existing_twilio_sid>
# TWILIO_AUTH_TOKEN=<your_existing_twilio_token>
# TWILIO_PHONE_NUMBER=<your_existing_twilio_number>
```

## Step-by-Step Instructions

### 1. Add Termii Variables (NOW - You have the key!)

1. Go to https://railway.app
2. Select your backend project
3. Click on your service
4. Go to **Variables** tab
5. Click **+ New Variable** and add:

**Variable 1:**
```
Name: TERMII_API_KEY
Value: TLfqBRIbxRUDKWDvWdUJjsTTwSPVypcxtvFwLrTbtmbLnEfueeATrXvduHEJNQ
```

**Variable 2:**
```
Name: TERMII_BASE_URL
Value: https://v3.api.termii.com
```

**Variable 3:**
```
Name: TERMII_SENDER_ID
Value: TravelPlace
```

6. Railway will automatically restart your service

### 2. Add Telnyx Variables (Optional - for international SMS)

If you want to support international SMS at lower cost:

1. Sign up at https://telnyx.com (get $10 free credit)
2. Create a Messaging Profile
3. Get your API Key
4. Add to Railway:

```
Name: TELNYX_API_KEY
Value: <your_telnyx_api_key>
```

```
Name: TELNYX_PHONE_NUMBER
Value: +1234567890
```

### 3. Verify Configuration

After adding variables, check Railway logs:

```bash
railway logs --tail
```

Or in Railway dashboard: Service → Deployments → View Logs

Look for:
```
SMS configured with: termii, twilio
```

## Test SMS Sending

### Test with Nigerian Number

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

Replace `+2348012345678` with your actual Nigerian phone number.

### Expected Response

```json
{
  "status": "success",
  "message": "User registered successfully. Please check your email/phone for verification.",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "phoneNumber": "+2348012345678",
      "role": "user",
      "isEmailVerified": false,
      "isPhoneVerified": false
    }
  }
}
```

### Check Your Phone

You should receive an SMS like:
```
Your OTP for phone verification at The Travel Place is: 123456. It expires in 5 minutes.
```

### Check Railway Logs

Look for this in logs:
```
SMS sent via Termii to +2348012345678
```

## Troubleshooting

### "Termii API key not configured"

**Solution**: Make sure you added all three Termii variables to Railway:
- TERMII_API_KEY
- TERMII_BASE_URL
- TERMII_SENDER_ID

### "Insufficient balance"

**Solution**: Fund your Termii account at https://termii.com/dashboard

### SMS not received

1. **Check phone number format**: Must be +234... (with country code)
2. **Check Termii dashboard**: https://termii.com/dashboard → SMS Logs
3. **Check Railway logs**: Look for errors
4. **Verify API key**: Make sure it's copied correctly (no extra spaces)

### Wrong API endpoint error

If you see errors about API endpoint, verify:
- TERMII_BASE_URL is set to `https://v3.api.termii.com`
- No trailing slash in the URL

## Cost Tracking

### Termii Pricing
- ₦2.50 per SMS
- No monthly fees
- Pay as you go

### Check Balance
Go to https://termii.com/dashboard to see:
- Current balance
- SMS sent today
- Delivery reports

## What Happens Next

Once you add these variables to Railway:

1. ✅ Railway automatically restarts your service
2. ✅ SMS service detects Termii is configured
3. ✅ Nigerian numbers (+234) automatically route to Termii
4. ✅ International numbers route to Twilio (or Telnyx if configured)
5. ✅ You save 98.6% on Nigerian SMS costs!

## Summary

**Immediate Action Required:**
1. Add 3 Termii variables to Railway (copy from above)
2. Wait for Railway to restart (~30 seconds)
3. Test with your phone number
4. Check SMS delivery

**Optional (for international SMS):**
1. Sign up for Telnyx
2. Add TELNYX_API_KEY to Railway
3. Save 66% on international SMS

**Total Setup Time**: 5 minutes
**Expected Savings**: ₦177,500 per 1,000 SMS

---

**Status**: Ready to deploy! Add the variables now. 🚀
