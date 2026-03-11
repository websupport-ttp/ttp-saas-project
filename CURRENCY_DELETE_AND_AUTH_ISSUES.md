# Currency Delete and Auth Issues

## Current Issues

### 1. Delete Button Not Working ❌
**Symptom**: Clicking delete icon does nothing

**Root Cause**: Two-step delete confirmation + Auth issues
- First click: Sets confirmation state (button turns red)
- Second click (within 3 seconds): Actually deletes
- BUT: 401 auth errors preventing API calls

**How Delete Should Work**:
1. Click delete icon once → Icon turns red
2. Click again within 3 seconds → Currency deleted
3. Wait >3 seconds → Confirmation resets

### 2. Authentication Errors ❌
**Symptoms**:
- 401 errors on all API calls
- "Authentication required: No tokens provided"
- Getting logged out repeatedly
- Dashboard shows but currency tab asks for login

**Root Causes**:
1. **Frontend not deployed yet** - Auth persistence fix pushed but Vercel hasn't deployed
2. **Cookie issues** - HTTP-only cookies not being sent properly
3. **Auth state mismatch** - localStorage has user data but cookies expired

### 3. Railway Disk Space Warning ⚠️
**Issue**: Available disk space (231MB) < Required (524MB)
**Impact**: Database indexes failing to create
**Solution**: Upgrade Railway plan or clean up database

## Console Errors Explained

```
api.test.ttp.ng/api/v1/dashboard/admin/stats:1 Failed to load resource: 401
api.test.ttp.ng/api/v1/auth/logout:1 Failed to load resource: 401
api.test.ttp.ng/api/v1/currencies/all:1 Failed to load resource: 401
```

These 401 errors mean:
- Backend doesn't recognize you as authenticated
- HTTP-only cookies either missing or expired
- Need to login again

## Immediate Solutions

### Solution 1: Clear Everything and Re-login
1. Open DevTools (F12)
2. Go to Application tab
3. Clear all:
   - Cookies (especially from api.test.ttp.ng)
   - Local Storage
   - Session Storage
4. Close browser completely
5. Reopen and go to https://test.ttp.ng/login
6. Login again
7. Try deleting currency:
   - Click delete icon once (turns red)
   - Click again within 3 seconds

### Solution 2: Wait for Deployment
The auth persistence fix was just pushed (commit `d0c975f`). Once Vercel deploys:
- Auth will persist properly
- Cookies will be verified correctly
- 401 errors should stop

**Check deployment**: https://vercel.com/your-project/deployments

### Solution 3: Manual Cookie Check
1. Open DevTools → Application → Cookies
2. Check for cookies from `api.test.ttp.ng`:
   - `accessToken`
   - `refreshToken`
3. If missing → Need to login again
4. If present but still 401 → Cookies expired, need to login

## How to Delete Currency (Step by Step)

1. **Ensure you're logged in**:
   - Check top right corner shows your name
   - No "Login" button visible

2. **Navigate to Currency Management**:
   - Dashboard → Currency Management tab

3. **Find currency to delete**:
   - Cannot delete NGN (base currency)
   - Can delete USD, EUR, GBP, etc.

4. **Delete process**:
   ```
   Click 1: Delete icon turns RED
   ↓ (within 3 seconds)
   Click 2: Currency deleted, list refreshes
   ```

5. **If nothing happens**:
   - Check console for 401 errors
   - If 401 → Logout and login again
   - Try delete process again

## Technical Details

### Delete Function Code:
```typescript
const handleDelete = async (code: string) => {
  if (deleteConfirm === code) {
    // Second click - actually delete
    await currencyService.deleteCurrency(code)
    await fetchCurrencies()
    setDeleteConfirm(null)
  } else {
    // First click - set confirmation
    setDeleteConfirm(code)
    setTimeout(() => setDeleteConfirm(null), 3000) // Reset after 3s
  }
}
```

### API Call:
```
DELETE https://api.test.ttp.ng/api/v1/currencies/:code
Headers: Cookie: accessToken=...; refreshToken=...
```

### Backend Requirements:
- Must be authenticated (Staff Tier 3+)
- Cannot delete base currency (NGN)
- Returns 401 if not authenticated
- Returns 400 if trying to delete base currency

## Deployment Status

### Frontend (Vercel):
- ✅ Auth fix pushed (commit `d0c975f`)
- ⏳ Waiting for deployment
- ⏳ ETA: 2-3 minutes from push

### Backend (Railway):
- ✅ Code is up to date
- ⚠️ Low disk space (231MB/524MB)
- ⚠️ May need plan upgrade

## Next Steps

1. **Wait 5 minutes** for Vercel deployment
2. **Clear browser cache** and cookies
3. **Login again** to https://test.ttp.ng
4. **Try delete** with double-click method
5. **If still failing**:
   - Check console for errors
   - Share screenshot of console
   - Check if cookies are present

## Workaround: Use API Directly

If UI delete still doesn't work, use API directly:

```bash
# Get your access token from DevTools → Application → Cookies
# Then run:

curl -X DELETE "https://api.test.ttp.ng/api/v1/currencies/USD" \
  -H "Cookie: accessToken=YOUR_TOKEN_HERE"
```

Replace `USD` with the currency code you want to delete.

## Summary

**Main Issue**: 401 authentication errors preventing all API calls
**Why**: Auth persistence fix not deployed yet + possible cookie issues
**Solution**: 
1. Wait for deployment (5 minutes)
2. Clear cookies and login again
3. Use double-click delete method

**Delete Method**: Click once (turns red) → Click again within 3 seconds (deletes)

---

**Status**: ⏳ Waiting for Vercel deployment
**ETA**: 5 minutes
**Last Updated**: March 11, 2026 12:15 PM
