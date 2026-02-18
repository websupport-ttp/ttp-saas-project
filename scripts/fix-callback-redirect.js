/**
 * Fix Callback Redirect Issue
 * This script helps diagnose and fix the Paystack callback redirect problem
 */

import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:8080/api/v1';

async function testCallbackSolutions() {
  console.log('🔧 Testing Callback Redirect Solutions...\n');

  // Solution 1: Test with different callback URL formats
  const callbackUrls = [
    'http://localhost:3000/flights/booking-confirmation',
    'http://127.0.0.1:3000/flights/booking-confirmation',
    'https://localhost:3000/flights/booking-confirmation', // This won't work but let's test
  ];

  for (let i = 0; i < callbackUrls.length; i++) {
    const callbackUrl = callbackUrls[i];
    console.log(`\n📤 Test ${i + 1}: Testing callback URL: ${callbackUrl}`);
    
    const bookingData = {
      flightDetails: {
        id: `test-callback-${i + 1}`,
        price: { total: "5000", currency: "NGN" },
        itineraries: [{
          segments: [{
            departure: { iataCode: "LOS", at: "2024-02-15T10:00:00" },
            arrival: { iataCode: "ABV", at: "2024-02-15T12:00:00" },
            carrierCode: "AA", number: "123"
          }]
        }]
      },
      passengerDetails: [{
        id: `passenger-${i + 1}`,
        name: { firstName: "Test", lastName: `Callback${i + 1}` },
        gender: "MALE", dateOfBirth: "1990-01-01",
        contact: {
          emailAddress: `test${i + 1}@example.com`,
          phones: [{ deviceType: "MOBILE", countryCallingCode: "234", number: "8012345678" }]
        },
        documents: []
      }],
      paymentDetails: {
        method: 'paystack', amount: 10000, currency: 'NGN',
        callback_url: callbackUrl
      },
      isGuestBooking: true,
      guestContactInfo: {
        email: `test${i + 1}@example.com`, phone: "8012345678",
        countryCode: "NG", dialCode: "+234"
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}/products/flights/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        console.log(`✅ Booking created with callback: ${callbackUrl}`);
        console.log(`   Authorization URL: ${result.data.authorizationUrl}`);
        console.log(`   Payment Reference: ${result.data.paymentReference}`);
      } else {
        console.log(`❌ Booking failed for callback: ${callbackUrl}`);
      }
    } catch (error) {
      console.log(`❌ Error with callback: ${callbackUrl} - ${error.message}`);
    }
  }

  console.log('\n📋 SOLUTIONS TO TRY:');
  console.log('1. Use ngrok to create HTTPS tunnel for localhost');
  console.log('2. Configure callback URL in Paystack Dashboard');
  console.log('3. Use Paystack webhooks instead of callback URLs');
  console.log('4. Manually redirect after payment completion');
}

async function suggestNgrokSolution() {
  console.log('\n🌐 RECOMMENDED SOLUTION: Use ngrok for HTTPS tunnel\n');
  
  console.log('Steps to fix the callback redirect:');
  console.log('1. Install ngrok: npm install -g ngrok');
  console.log('2. Create tunnel: ngrok http 3000');
  console.log('3. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)');
  console.log('4. Update your .env.local file:');
  console.log('   NEXT_PUBLIC_SITE_URL=https://abc123.ngrok.io');
  console.log('5. Restart your frontend server');
  console.log('6. Test payment again');
  
  console.log('\nAlternatively, you can:');
  console.log('- Set up a webhook endpoint instead of callback URL');
  console.log('- Configure default callback URL in Paystack Dashboard');
  console.log('- Use manual redirect after payment (less user-friendly)');
}

async function createWebhookSolution() {
  console.log('\n🔗 WEBHOOK SOLUTION (Alternative to callback URL)\n');
  
  console.log('If callback URLs don\'t work, you can use webhooks:');
  console.log('1. Create webhook endpoint: /api/webhooks/paystack');
  console.log('2. Configure webhook URL in Paystack Dashboard');
  console.log('3. Handle payment.success event in webhook');
  console.log('4. Update booking status when webhook is received');
  console.log('5. User can check booking status manually');
  
  console.log('\nWebhook endpoint example:');
  console.log('POST /api/webhooks/paystack');
  console.log('- Verify webhook signature');
  console.log('- Handle payment.success event');
  console.log('- Update ledger entry status');
  console.log('- Send confirmation email');
}

// Run all solutions
async function main() {
  await testCallbackSolutions();
  await suggestNgrokSolution();
  await createWebhookSolution();
}

main();