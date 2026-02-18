/**
 * Check what's being sent to Paystack by examining the logs
 */

import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:8080/api/v1';

async function checkPaystackLogs() {
  console.log('🔍 Checking Paystack Integration...\n');

  // Create a booking to trigger the Paystack call
  const bookingData = {
    flightDetails: {
      id: "debug-logs-test",
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
      id: "passenger-debug-logs",
      name: { firstName: "Debug", lastName: "Logs" },
      gender: "MALE", dateOfBirth: "1990-01-01",
      contact: {
        emailAddress: "debug.logs@example.com",
        phones: [{ deviceType: "MOBILE", countryCallingCode: "234", number: "8012345678" }]
      },
      documents: []
    }],
    paymentDetails: {
      method: 'paystack',
      amount: 10000,
      currency: 'NGN',
      callback_url: 'http://localhost:3000/flights/booking-confirmation'
    },
    isGuestBooking: true,
    guestContactInfo: {
      email: "debug.logs@example.com",
      phone: "8012345678",
      countryCode: "NG", dialCode: "+234"
    }
  };

  try {
    console.log('📤 Creating booking to check logs...');
    
    const response = await fetch(`${API_BASE_URL}/products/flights/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      console.log('✅ Booking created - check backend logs for:');
      console.log(`[DEBUG] Paystack payload with callback:`);
      console.log('');
      console.log('🔍 TROUBLESHOOTING STEPS:');
      console.log('');
      console.log('1. CHECK PAYSTACK DASHBOARD:');
      console.log('   - Go to https://dashboard.paystack.com/');
      console.log('   - Navigate to Settings → API Keys & Webhooks');
      console.log('   - Look for "Callback URL" or "Default Redirect URL"');
      console.log('   - If there\'s a default URL set, it overrides API parameters');
      console.log('   - Either remove the default URL or update it to your localhost');
      console.log('');
      console.log('2. CHECK BROWSER NETWORK TAB:');
      console.log('   - Open browser dev tools');
      console.log('   - Go to Network tab');
      console.log('   - Complete payment');
      console.log('   - Look for any redirect attempts or blocked requests');
      console.log('');
      console.log('3. TEST WITH DIFFERENT BROWSER:');
      console.log('   - Try in incognito/private mode');
      console.log('   - Try a different browser');
      console.log('   - Some browsers block localhost redirects from HTTPS sites');
      console.log('');
      console.log('4. MANUAL WORKAROUND:');
      console.log(`   - After payment, manually go to: http://localhost:3000/flights/booking-confirmation?reference=${result.data.paymentReference}`);
      console.log('   - This will verify if the payment verification works');
      
    } else {
      console.log('❌ Booking failed:', result);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkPaystackLogs();