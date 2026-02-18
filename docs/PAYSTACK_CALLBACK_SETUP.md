# Paystack Callback URL Setup Guide

## Issue ✅ RESOLVED
After successful payment on Paystack, users are now being redirected back to the website.

## Root Cause ✅ FIXED
The Paystack payment transaction needed to be created with a `callback_url` parameter that tells Paystack where to redirect users after payment.

## Implementation Status ✅ COMPLETE

### Frontend Changes ✅ COMPLETE
- ✅ Updated Flight Service to include `callback_url` in payment details
- ✅ Uses `appConfig.siteUrl` for consistent URL generation (now correctly set to `http://localhost:3000`)
- ✅ Callback URL: `${siteUrl}/flights/booking-confirmation`

### Backend Changes ✅ COMPLETE
- ✅ Backend flight booking endpoint (`/products/flights/book`) extracts `callback_url` from payment details
- ✅ Paystack service includes `callback_url` when creating transactions
- ✅ Payment flow properly configured

### Payment Flow ✅ WORKING
```
User completes payment → Paystack redirects to callback URL → Payment verification → Success page
```

## Technical Implementation

### Frontend (flight-service.ts)
```typescript
paymentDetails: {
  method: 'paystack',
  amount: parseFloat(bookingData.totalAmount),
  currency: bookingData.currency,
  callback_url: `${appConfig.siteUrl}/flights/booking-confirmation`,
}
```

### Backend (productController.js)
```javascript
const paystackInitResponse = await paystackService.initializePayment({
  email: contactEmail,
  amount: finalAmount,
  reference: paymentReference,
  currency: paymentDetails?.currency || 'NGN',
  callback_url: paymentDetails?.callback_url, // ← Properly extracted and used
  metadata: { ... }
});
```

### Paystack Service (paystackService.js)
```javascript
const initializePayment = async (paymentDetails) => {
  const processedDetails = {
    ...paymentDetails,
    amount: Math.round(paymentDetails.amount * 100), // Convert to kobo
  };

  // Include callback_url if provided
  if (paymentDetails.callback_url) {
    processedDetails.callback_url = paymentDetails.callback_url;
    logger.info(`Payment initialized with callback URL: ${paymentDetails.callback_url}`);
  }
  
  return await makePaystackRequest('POST', '/transaction/initialize', processedDetails);
};
```

## Environment Configuration ✅ CONFIGURED

### Frontend (.env.local)
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Updated to correct port
```

### Backend
```
PAYSTACK_SECRET_KEY=sk_test_your_test_key
```

## Testing Results ✅ VERIFIED

### Test Results
- ✅ Backend receives callback URL correctly
- ✅ Paystack payment initialization successful
- ✅ Authorization URL generated: `https://checkout.paystack.com/[token]`
- ✅ Booking confirmation page handles callback properly
- ✅ Payment verification service integrated

### Manual Testing Steps
1. ✅ Complete flight booking form
2. ✅ Proceed to payment
3. ✅ Get redirected to Paystack payment page
4. ✅ Complete payment on Paystack
5. ✅ Get redirected back to: `http://localhost:3000/flights/booking-confirmation?reference=TTP-FL-[timestamp]`
6. ✅ Payment verification runs automatically
7. ✅ Success page displayed

## Verification Flow ✅ WORKING

The callback URL (`/flights/booking-confirmation`) properly:
1. ✅ Extracts payment reference from URL parameters
2. ✅ Calls backend to verify payment status
3. ✅ Shows success/failure message
4. ✅ Redirects to appropriate page

## Status: ✅ COMPLETE AND WORKING

The Paystack callback URL implementation is now fully functional:
- ✅ Frontend correctly sends callback URL
- ✅ Backend properly handles callback URL parameter
- ✅ Paystack redirects users back to website after payment
- ✅ Payment verification works correctly
- ✅ User experience is seamless

## Production Deployment Notes

For production deployment, ensure:
1. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in frontend environment
2. Use production Paystack keys: `PAYSTACK_SECRET_KEY=sk_live_your_live_key`
3. Test the complete flow in production environment