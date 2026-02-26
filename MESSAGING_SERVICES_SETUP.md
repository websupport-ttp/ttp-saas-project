# Messaging Services Setup Guide

## Current Issues

1. ✅ Email verification emails not being sent (Gmail SMTP configured but may be failing)
2. ⚠️ Users can login without email verification (security concern)
3. 💰 Need cheaper SMS alternative to Twilio
4. 📱 WhatsApp Business API not configured

---

## 1. Fix Email Verification

### Check Gmail SMTP Configuration

Your current setup uses Gmail SMTP. Common issues:

**Problem**: Gmail blocks "less secure apps" by default

**Solution**: Use Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Generate an App Password for "Mail"
5. Update Railway environment variable:
   ```
   EMAIL_PASSWORD=<your-16-character-app-password>
   ```

### Alternative: Use a Dedicated Email Service

**Recommended: Resend** (Better deliverability, free tier)

1. Sign up at https://resend.com
2. Verify your domain or use their test domain
3. Get API key
4. Install: `npm install resend`
5. Update your email service to use Resend

**Pricing**: 
- Free: 3,000 emails/month
- Pro: $20/month for 50,000 emails

---

## 2. Enforce Email Verification

### Update Auth Middleware

Add email verification check to protected routes. Your backend already has `requireEmailVerification` middleware - just need to apply it to sensitive routes.

**Example**: Require verification for bookings:
```javascript
router.post('/bookings', 
  authenticateUser, 
  requireEmailVerification,  // Add this
  createBooking
);
```

---

## 3. Cheaper SMS Alternatives to Twilio

### Option 1: Termii (Recommended for Nigeria) 🇳🇬

**Why**: Nigerian company, better local delivery, cheaper rates

**Pricing**:
- ₦2.50 - ₦3.50 per SMS (vs Twilio's ₦15-20)
- No monthly fees
- Pay as you go

**Setup**:
1. Sign up at https://termii.com
2. Get API Key from dashboard
3. Fund your account (minimum ₦1,000)

**Integration**:
```javascript
const axios = require('axios');

async function sendSMS(phoneNumber, message) {
  const response = await axios.post('https://api.ng.termii.com/api/sms/send', {
    to: phoneNumber,
    from: "TravelPlace", // Your sender ID
    sms: message,
    type: "plain",
    channel: "generic",
    api_key: process.env.TERMII_API_KEY
  });
  return response.data;
}
```

### Option 2: BulkSMS Nigeria

**Pricing**: ₦2.00 - ₦2.80 per SMS

**Setup**: https://www.bulksmsnigeria.com

### Option 3: Telnyx (Recommended for International) 🌍

**Why**: Cheaper than Twilio, better API, transparent pricing, includes voice & WhatsApp

**Pricing**:
- Nigeria SMS: $0.04 per message (~₦60) vs Twilio's $0.12 (~₦180)
- US/UK SMS: $0.004 - $0.008 per message
- No monthly fees
- Pay as you go
- $10 free credit on signup

**Setup**:
1. Sign up at https://telnyx.com
2. Create Messaging Profile
3. Get API Key from dashboard
4. Buy a phone number (optional, can use alphanumeric sender ID)

**Integration**:
```javascript
const axios = require('axios');

async function sendSMS(phoneNumber, message) {
  const response = await axios.post('https://api.telnyx.com/v2/messages', {
    from: process.env.TELNYX_PHONE_NUMBER, // or "TravelPlace" for alphanumeric
    to: phoneNumber, // Format: +2348012345678
    text: message
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.TELNYX_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}
```

**Telnyx also offers**:
- WhatsApp Business API (cheaper than Meta direct)
- Voice calls
- Number verification
- 2FA services

### Option 4: SMS Portal (International)

**Pricing**: $0.03 - $0.05 per SMS

**Setup**: https://www.smsportal.com

### Comparison Table

| Service | Cost per SMS (Nigeria) | Free Tier | Best For | Extra Features |
|---------|----------------------|-----------|----------|----------------|
| **Termii** | ₦2.50 - ₦3.50 | No | Nigerian users | Local delivery, sender ID |
| BulkSMS NG | ₦2.00 - ₦2.80 | No | Nigerian users | Bulk only |
| **Telnyx** | ~₦60 ($0.04) | $10 credit | International + Nigeria | Voice, WhatsApp, Number verification |
| Twilio | ₦180 ($0.12) | $15 credit | International | Full platform |
| SMS Portal | $0.03 - $0.05 | No | International | Simple API |

### Pricing Breakdown (per 1,000 SMS)

| Service | Nigeria | US/UK | Total Cost |
|---------|---------|-------|------------|
| Termii | ₦2,500 | N/A | ₦2,500 |
| Telnyx | ₦60,000 | ₦6,000 | ₦60,000 (Nigeria) / ₦6,000 (US) |
| Twilio | ₦180,000 | ₦12,000 | ₦180,000 (Nigeria) / ₦12,000 (US) |

**Recommendation**: 
- **For Nigerian users**: Use **Termii** (3x cheaper than Telnyx, 6x cheaper than Twilio)
- **For International users**: Use **Telnyx** (3x cheaper than Twilio)
- **Best Setup**: Termii for Nigeria, Telnyx for international

---

## 4. WhatsApp Business API Setup

### Option A: Meta WhatsApp Business API (Official)

**Requirements**:
- Verified Facebook Business Account
- Phone number (can't be personal WhatsApp)
- Business verification documents

**Setup Steps**:

1. **Create Facebook Business Account**
   - Go to https://business.facebook.com
   - Create business account
   - Verify your business

2. **Set up WhatsApp Business API**
   - Go to https://developers.facebook.com
   - Create an App → Business → WhatsApp
   - Add WhatsApp product to your app

3. **Get Phone Number**
   - Buy a new number (can't use existing WhatsApp number)
   - Verify the number in Meta dashboard

4. **Get Credentials**
   ```
   WHATSAPP_PHONE_NUMBER_ID=<from Meta dashboard>
   WHATSAPP_ACCESS_TOKEN=<from Meta dashboard>
   WHATSAPP_API_VERSION=v18.0
   ```

5. **Send Message Example**:
```javascript
const axios = require('axios');

async function sendWhatsAppMessage(to, message) {
  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  
  const response = await axios.post(url, {
    messaging_product: "whatsapp",
    to: to, // Format: 2348012345678 (no +)
    type: "text",
    text: { body: message }
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}
```

**Pricing**:
- First 1,000 conversations/month: FREE
- After that: $0.005 - $0.09 per conversation (varies by country)
- Nigeria: ~$0.02 per conversation

### Option B: Twilio WhatsApp (Easier Setup)

**Pros**: Faster setup, no business verification needed for testing

**Setup**:
1. Go to Twilio Console → Messaging → Try it out → WhatsApp
2. Join sandbox: Send "join <code>" to Twilio WhatsApp number
3. Use Twilio API to send messages

**Pricing**: $0.005 per message (cheaper than SMS!)

**Code**:
```javascript
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendWhatsAppMessage(to, message) {
  const msg = await client.messages.create({
    from: 'whatsapp:+14155238886', // Twilio sandbox number
    to: `whatsapp:${to}`,
    body: message
  });
  return msg;
}
```

### Option C: Termii WhatsApp (For Nigeria)

**Pros**: Nigerian service, easier for local businesses

**Setup**: Contact Termii sales for WhatsApp API access

---

## Implementation Plan

### Phase 1: Fix Email (Immediate)
1. Set up Gmail App Password or switch to Resend
2. Test email delivery
3. Check spam folder

### Phase 2: Add SMS (This Week)
1. Sign up for Termii
2. Replace Twilio with Termii for Nigerian numbers
3. Keep Twilio as fallback for international

### Phase 3: WhatsApp (Next Week)
1. Start with Twilio WhatsApp sandbox for testing
2. Apply for Meta WhatsApp Business API
3. Implement WhatsApp notifications for bookings

### Phase 4: Enforce Verification (After Testing)
1. Add `requireEmailVerification` to booking routes
2. Add `requirePhoneVerification` for payment routes
3. Show verification status in user dashboard

---

## Recommended Service Stack

**For Nigerian Travel Business**:

| Service | Provider | Monthly Cost | Use Case |
|---------|----------|--------------|----------|
| Email | Resend | Free (3k emails) | Verification, receipts |
| SMS (Nigeria) | Termii | Pay-as-you-go (~₦2.50/SMS) | OTP, alerts for Nigerian users |
| SMS (International) | Telnyx | Pay-as-you-go (~₦60/SMS) | OTP for international users |
| WhatsApp | Telnyx or Meta | Free (1k/month) | Booking confirmations |

**Total Monthly Cost**: ~₦5,000 - ₦15,000 for moderate usage (500-1000 messages)

### Why This Stack?

1. **Termii for Nigeria**: Cheapest option, best local delivery
2. **Telnyx for International**: 3x cheaper than Twilio, includes WhatsApp
3. **Resend for Email**: Best deliverability, generous free tier
4. **Telnyx WhatsApp**: Easier setup than Meta, competitive pricing

---

## Next Steps

1. **Immediate**: Fix Gmail SMTP with App Password
2. **This Week**: Sign up for Termii and integrate
3. **Next Week**: Apply for WhatsApp Business API
4. **Testing**: Send test messages to verify all services work

Would you like me to:
1. Implement Termii SMS integration?
2. Set up Resend email service?
3. Create WhatsApp message templates?
