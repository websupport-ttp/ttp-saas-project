# Travel Insurance Debug Steps

## 🚨 Current Issue
You're seeing mock quotes instead of the search form when you should see the search form.

## 🔍 Debug Steps

### Step 1: Check Current URL
**What URL are you accessing?**
- ✅ Expected for search form: `http://localhost:3000/travel-insurance`
- ✅ Expected for auto-populate: `http://localhost:3000/travel-insurance?destination=United%20Kingdom&coverBegins=2026-02-15&coverEnds=2026-02-25&travelers=2%20travelers`

### Step 2: Clear All Caches
1. Open `clear-travel-insurance-cache.html` in your browser
2. Click "Clear All Caches"
3. Hard refresh (Ctrl+Shift+R)

### Step 3: Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Navigate to `http://localhost:3000/travel-insurance`
4. Look for these debug logs:
   ```
   🔍 Travel Insurance Page - useEffect triggered
   📋 URL Parameters: {destination: null, coverBegins: null, coverEnds: null, travelers: null}
   ❌ Missing URL parameters - showing search form
   🎨 UI State: showSearchForm = true, cleared quotes and errors
   ```

### Step 4: Check Debug Panel
With the updated code, you should see a yellow debug panel at the top showing:
- `showSearchForm: true`
- `isPrePopulated: false`
- `quotes.length: 0`
- `searchCriteria: null`

## 🎯 Expected Behavior

### Scenario 1: No URL Parameters
- **URL:** `http://localhost:3000/travel-insurance`
- **Expected:** Search form displayed
- **Debug logs:** "Missing URL parameters - showing search form"
- **UI State:** `showSearchForm: true`, `quotes.length: 0`

### Scenario 2: With URL Parameters
- **URL:** `http://localhost:3000/travel-insurance?destination=United%20Kingdom&coverBegins=2026-02-15&coverEnds=2026-02-25&travelers=2%20travelers`
- **Expected:** Form auto-populated, quotes automatically searched
- **Debug logs:** "All required URL parameters found - auto-populating form"
- **UI State:** `showSearchForm: false`, quotes displayed

## 🚨 If You Still See Mock Quotes

### Check 1: Verify URL
Make sure you're accessing exactly: `http://localhost:3000/travel-insurance` (no parameters)

### Check 2: Check for Cached State
The issue might be:
1. **localStorage** has cached quote data
2. **Component state** is not resetting properly
3. **Backend** is returning mock data
4. **Browser cache** has old version

### Check 3: Look for These Issues
1. **Old cached component:** Clear browser cache completely
2. **localStorage data:** Use the cache clearing tool
3. **Backend mock data:** Check if backend is returning hardcoded quotes
4. **Component state bug:** Check if `showSearchForm` is actually `true`

## 🔧 Quick Fixes

### Fix 1: Nuclear Reset
```bash
# Stop development server
Ctrl+C

# Clear Next.js cache
cd frontend/web-app
rmdir /s /q .next
rmdir /s /q node_modules\.cache

# Clear npm cache
npm cache clean --force

# Restart
npm run dev
```

### Fix 2: Browser Reset
1. Clear all browser data for localhost:3000
2. Hard refresh (Ctrl+Shift+R)
3. Open in incognito/private mode

### Fix 3: Check Component Logic
The issue might be in the component logic. With the debug logs added, you should see exactly what's happening.

## 📋 Debug Checklist

- [ ] Verified exact URL being accessed
- [ ] Cleared localStorage and sessionStorage
- [ ] Cleared browser cache
- [ ] Restarted development server
- [ ] Checked browser console for debug logs
- [ ] Verified debug panel shows correct state
- [ ] Tested in incognito mode
- [ ] Checked if backend is running and responding correctly

## 🎯 Next Steps

1. **First:** Check the exact URL you're accessing
2. **Second:** Look at browser console for debug logs
3. **Third:** Check the yellow debug panel for component state
4. **Fourth:** Clear all caches if needed

The debug logs will tell us exactly what's happening and why you're seeing quotes instead of the search form.