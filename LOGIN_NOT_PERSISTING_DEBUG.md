# Login Not Persisting - Debug Guide

## Current Status

**Backend**: ✅ Login returns 200 (success)  
**Frontend**: ❌ User not staying logged in  
**Deployment**: 🔄 Vercel deploying commit `8fd0ece`

## Possible Causes

### 1. Vercel Not Deployed Yet (Most Likely)
The fix was just pushed. Vercel takes 2-3 minutes to deploy.

**Check**: Go to https://vercel.com/websupport-ttp/ttp-saas-frontend/deployments
- Look for commit `8fd0ece`
- Status should be "Ready" (green)

**Solution**: Wait for deployment, then hard refresh browser

---

### 2. Cookie Domain Mismatch
HTTP-only cookies might not be set due to domain mismatch.

**Check Browser Console**:
```javascript
// After login, check cookies
document.cookie
```

**Expected**: Should see cookies like `accessToken` and `refreshToken`

**If No Cookies**: CORS/domain issue

---

### 3. SameSite Cookie Issue
Cookies might be blocked due to SameSite policy.

**Check Network Tab**:
1. Go to Network tab
2. Find `/auth/login` request
3. Click on it
4. Go to "Cookies" tab
5. Check if cookies are being set

**Expected**: Should see `Set-Cookie` headers with `accessToken` and `refreshToken`

---

## Quick Tests

### Test 1: Check if Deployment is Live
```bash
# Check latest commit on Vercel
curl -I https://test.ttp.ng
# Look for x-vercel-id header
```

### Test 2: Check Cookies After Login
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Cookies" → "https://test.ttp.ng"
4. Login
5. Refresh the cookies view
6. **Expected**: See `accessToken` and `refreshToken`

### Test 3: Check localStorage
```javascript
// In browser console after login
localStorage.getItem('user_data')
```

**Expected**: Should return user object JSON

**If null**: Frontend code not saving user data

---

## Manual Fix (If Deployment Takes Too Long)

### Option 1: Hard Refresh
1. Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. This clears cached JavaScript
3. Try login again

### Option 2: Clear Site Data
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Clear storage"
4. Click "Clear site data"
5. Refresh page
6. Try login again

### Option 3: Incognito Mode
1. Open incognito/private window
2. Go to https://test.ttp.ng
3. Try login
4. If it works → Cache issue
5. If it doesn't → Deployment not live yet

---

## Expected Behavior After Fix

### Login Flow:
1. User enters email/password
2. Click "Sign in"
3. **Success message**: "Login successful! Redirecting..."
4. **User data saved** to localStorage
5. **Cookies set** by backend (HTTP-only)
6. **Smooth redirect** to homepage (no reload)
7. **User stays logged in** (can see profile, dashboard, etc.)

### What Should Happen:
- ✅ localStorage has `user_data`
- ✅ Cookies have `accessToken` and `refreshToken`
- ✅ Homepage shows user as logged in
- ✅ Can access protected routes

---

## If Still Not Working After Deployment

### Check 1: Verify Deployment
```bash
# Check if latest code is deployed
curl https://test.ttp.ng/_next/static/chunks/app/layout-*.js | grep "cookie-based"
```

If you see "cookie-based" → Deployment is live

### Check 2: Check Backend Cookies
```bash
# Test login and check cookies
curl -i -X POST https://api.test.ttp.ng/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"emailOrPhone":"your@email.com","password":"yourpassword"}'
```

Look for `Set-Cookie` headers in response

### Check 3: CORS Configuration
The backend might need to allow credentials from frontend domain.

**Check**: `backend/app.js` or `backend/server.js`

Should have:
```javascript
app.use(cors({
  origin: 'https://test.ttp.ng',
  credentials: true
}));
```

---

## Timeline

**Now**: Vercel deploying (started ~2 minutes ago)  
**+1 min**: Deployment should complete  
**+2 min**: Hard refresh and test  
**+3 min**: If still not working, check cookies  

---

## Next Steps

1. **Wait 2-3 minutes** for Vercel deployment
2. **Hard refresh** browser (Ctrl+Shift+R)
3. **Try login** again
4. **Check localStorage** for user_data
5. **Check cookies** for accessToken

If still not working after these steps, report back with:
- ✅ or ❌ Vercel deployment status
- ✅ or ❌ localStorage has user_data
- ✅ or ❌ Cookies are set
- ✅ or ❌ Console errors

This will help me identify the exact issue!
