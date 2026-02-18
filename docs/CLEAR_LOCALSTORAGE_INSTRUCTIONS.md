# URGENT: Clear LocalStorage to Fix Date of Birth Issue

## The Problem
Your browser has old data stored with `"DateOfBirth":"NaN-undefined-NaN"` which is causing the purchase to fail.

## The Solution (3 Steps)

### Step 1: Clear Your Browser Data
1. Open your browser console (Press F12)
2. Go to the "Console" tab
3. Copy and paste this command:
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```
4. Press Enter

### Step 2: Start Fresh Booking Flow
1. Go to `http://localhost:3000/travel-insurance`
2. Fill in ALL fields:
   - Destination
   - Coverage start date
   - Coverage end date
   - Number of travelers (adults/children)
   - Email
   - Phone number
3. Click "Get Quote"

### Step 3: CRITICAL - Fill in Date of Birth
1. On the book page (`/travel-insurance/book`), you will see traveler information fields
2. **YOU MUST FILL IN THE "DATE OF BIRTH" FOR EACH TRAVELER**
3. Click the date picker and select a valid date
4. If you have 2 adults and 1 child, you need to fill in 3 dates of birth
5. Click "Get Quote" again

### Step 4: Complete the Booking
1. Select your preferred plan (Basic, Standard, or Premium)
2. Fill in all personal details on the complete booking page
3. Click "Complete Purchase"
4. You'll be redirected to Paystack for payment
5. After payment, you'll receive a confirmation email

## Why This Happens
The date of birth field on the book page was not filled in during a previous attempt. The empty data was saved to localStorage and is being reused. The validation is now in place to prevent this, but you need to clear the old data first.

## Verification
After clearing localStorage, you can verify it's empty by running this in the console:
```javascript
console.log('Traveler Info:', localStorage.getItem('insuranceTravelerInfo'));
// Should show: null
```

## Important Notes
- The date of birth field is REQUIRED - you cannot skip it
- If you try to proceed without filling it in, you'll see an alert
- The system will not let you continue with invalid dates
- Once you fill in valid dates, everything will work correctly

## Email Configuration
Your email configuration is already correct:
- EMAIL_PORT=465 ✓
- EMAIL_SECURE=true ✓
- EMAIL_USERNAME=opeyemioladejobi@gmail.com ✓

After you complete a successful booking, you will receive a confirmation email.
