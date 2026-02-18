/**
 * Final comprehensive callback test
 */

import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:8080/api/v1';
const PAYSTACK_SECRET_KEY = 'sk_test_c10c5787d76e0237642b593ea541618af7749360';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

async function finalCallbackTest() {
  console.log('🔧 Final Callback Test - Comparing Direct vs Backend\n');

  // Test 1: Direct Paystack API call (this worked before)
  console.log('📤 Test 1: Direct Paystack API Call');
  const directPayload = {
    email: "direct.test@example.com",
    amount: 500000, // 5000 NGN in kobo
    reference: `TTP-DIRECT-${Date.now()}`,
    currency: "NGN",
    callback_url: "http://localhost:3000/flights/booking-confirmation"
  };

  try {
    const directResponse = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(directPayload)
    });

    const directResult = await directResponse.json();
    
    if (directResult.status) {
      console.log('✅ Direct call successful');
      console.log('   Authorization URL:', directResult.data.authorization_url);
      console.log('   Reference:', directResult.data.reference);
    } else {
      console.log('❌ Direct call failed:', directResult.message);
    }
  } catch (error) {
    console.log('❌ Direct call error:', error.message);
  }

  // Test 2: Backend booking (this is not redirecting)
  console.log('\n📤 Test 2: Backend Booking');
  const bookingData = {
    flightDetails: {
      id: "final-callback-test",
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
      id: "passenger-final-test",
      name: { firstName: "Final", lastName: "Test" },
      gender: "MALE", dateOfBirth: "1990-01-01",
      contact: {
        emailAddress: "final.test@example.com",
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
      email: "final.test@example.com",
      phone: "8012345678",
      countryCode: "NG", dialCode: "+234"
    }
  };

  try {
    const backendResponse = await fetch(`${API_BASE_URL}/products/flights/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    const backendResult = await backendResponse.json();
    
    if (backendResult.status === 'success') {
      console.log('✅ Backend booking successful');
      console.log('   Authorization URL:', backendResult.data.authorizationUrl);
      console.log('   Reference:', backendResult.data.paymentReference);
    } else {
      console.log('❌ Backend booking failed:', backendResult);
    }
  } catch (error) {
    console.log('❌ Backend booking error:', error.message);
  }

  console.log('\n🔍 ANALYSIS:');
  console.log('1. If both tests create authorization URLs, the issue is in Paystack configuration');
  console.log('2. If only direct test works, there\'s an issue in our backend service');
  console.log('3. Check browser console for any security/CORS errors during redirect');
  console.log('4. Try testing in different browsers (Chrome, Firefox, Edge)');
  console.log('5. Try testing in incognito/private mode');
  
  console.log('\n🛠️ IMMEDIATE WORKAROUND:');
  console.log('After completing payment, manually navigate to:');
  console.log('http://localhost:3000/flights/payment-redirect');
  console.log('This page will prompt for payment reference and redirect you properly');
}

finalCallbackTest();