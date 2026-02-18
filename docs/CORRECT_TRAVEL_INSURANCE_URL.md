# Correct Travel Insurance URL Format

## Issue
The URL you're using has incorrect parameter names that don't match what the travel insurance page expects.

## Current URL (❌ Incorrect)
```
http://localhost:3000/travel-insurance?passengers=1&destination=Canada&destination_data=%5Bobject+Object%5D&coverBegins=2026-01-30&coverEnds=2026-01-31
```

**Problems:**
- Uses `passengers=1` instead of `travelers=1`
- Has extra `destination_data` parameter that's not needed
- Parameter names don't match the component expectations

## Correct URL Format (✅)
```
http://localhost:3000/travel-insurance?destination=Canada&coverBegins=2026-01-30&coverEnds=2026-01-31&travelers=1
```

## Required Parameters
The travel insurance page expects exactly these parameters:

1. **`destination`** - Country name (e.g., "Canada", "Australia", "United Kingdom")
2. **`coverBegins`** - Start date in YYYY-MM-DD format (e.g., "2026-01-30")
3. **`coverEnds`** - End date in YYYY-MM-DD format (e.g., "2026-01-31")
4. **`travelers`** - Number of travelers (e.g., "1", "2", "3")

## Test URLs

### Canada (1 day coverage)
```
http://localhost:3000/travel-insurance?destination=Canada&coverBegins=2026-01-30&coverEnds=2026-01-31&travelers=1
```

### Australia (10 days coverage)
```
http://localhost:3000/travel-insurance?destination=Australia&coverBegins=2026-02-01&coverEnds=2026-02-10&travelers=1
```

### United Kingdom (7 days coverage, 2 travelers)
```
http://localhost:3000/travel-insurance?destination=United%20Kingdom&coverBegins=2026-02-01&coverEnds=2026-02-07&travelers=2
```

## Expected Behavior
When you use the correct URL format:

1. ✅ Page loads successfully (no 404 error)
2. ✅ Form auto-populates with URL parameters
3. ✅ Shows "Form Pre-filled" notice
4. ✅ Automatically searches for quotes
5. ✅ Displays 3 plans with different pricing:
   - Standard: ₦7,467
   - Premium: ₦9,707
   - Comprehensive: ₦11,947
6. ✅ Can proceed with purchase flow

## Debug Info
If the URL still doesn't work, check browser console for:
- `📋 URL Parameters:` - Should show all 4 parameters
- `✅ All required URL parameters found` - Confirms parameters are detected
- `🔢 Parsed traveler count:` - Shows traveler count parsing
- `📝 Setting form data:` - Shows form population

## Available Countries
The system supports these destination countries:
- USA
- Canada  
- United Kingdom
- Germany
- France
- Australia
- South Africa