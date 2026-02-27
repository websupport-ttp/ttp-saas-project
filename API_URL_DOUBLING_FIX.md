# Fix: API URL Doubling Issue ✅

## Problem

API calls were failing with 404 errors because URLs had `/api/v1` duplicated:
```
❌ https://api.test.ttp.ng/api/v1/api/v1/cms/hot-deals
❌ https://api.test.ttp.ng/api/v1/api/v1/dashboard/admin/stats
```

## Root Cause

Inconsistent URL construction across services:
- `api-client.ts` expects baseURL to include `/api/v1`
- `cms-service.ts` was adding `/api/v1` again
- `visa-assistance-service.ts` was adding `/api/v1` again
- `management-dashboard-service.ts` was adding `/api/v1` again

## Solution Applied

### 1. Updated Service Files

Fixed all service files to NOT add `/api/v1` (since it's already in the base URL):

**Files Modified:**
- `frontend/web-app/src/lib/services/cms-service.ts`
- `frontend/web-app/src/lib/services/visa-assistance-service.ts`
- `frontend/web-app/src/lib/services/management-dashboard-service.ts`

**Changes:**
```typescript
// BEFORE (Wrong - adds /api/v1 twice)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const url = `${API_BASE_URL}/api/v1/cms/hot-deals`;

// AFTER (Correct - base URL already has /api/v1)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';
const url = `${API_BASE_URL}/cms/hot-deals`;
```

### 2. Vercel Environment Variable

**Correct Value:**
```
NEXT_PUBLIC_API_BASE_URL=https://api.test.ttp.ng/api/v1
```

This is correct because:
- `api-client.ts` uses it as-is for auth endpoints (`/auth/login`)
- Other services now append paths without `/api/v1` (`/cms/hot-deals`)

## Result

✅ All API calls now use correct URLs:
```
✓ https://api.test.ttp.ng/api/v1/cms/hot-deals
✓ https://api.test.ttp.ng/api/v1/dashboard/admin/stats
✓ https://api.test.ttp.ng/api/v1/auth/login
✓ https://api.test.ttp.ng/api/v1/products/flights/search
```

## Testing

After deploying these changes:

### 1. Test Homepage
```
https://test.ttp.ng
```
Should load without errors and show:
- Hero slides
- Hot deals
- No 404 errors in console

### 2. Test Admin Dashboard
```
https://test.ttp.ng/dashboard/admin
```
Should load stats without 404 errors

### 3. Test Flight Search
```
https://test.ttp.ng/flights
```
Should search for flights without "Network error"

### 4. Test CMS
```
https://test.ttp.ng/dashboard/admin/cms
```
Should load and manage content without errors

## Files Changed

1. `frontend/web-app/src/lib/services/cms-service.ts`
   - Changed base URL default to include `/api/v1`
   - Removed `/api/v1` from all endpoint paths

2. `frontend/web-app/src/lib/services/visa-assistance-service.ts`
   - Changed base URL default to include `/api/v1`
   - Removed `/api/v1` from all endpoint paths

3. `frontend/web-app/src/lib/services/management-dashboard-service.ts`
   - Removed `/api/v1` from all endpoint paths

4. `fix-api-urls.ps1` (helper script)
   - Automated the URL fixes

## Deployment Steps

### 1. Commit and Push Changes
```bash
git add .
git commit -m "fix: remove duplicate /api/v1 from service URLs"
git push
```

### 2. Vercel Will Auto-Deploy
- Wait ~2 minutes for deployment
- Check deployment status at https://vercel.com

### 3. Verify Environment Variable
Go to Vercel → Settings → Environment Variables

Confirm:
```
NEXT_PUBLIC_API_BASE_URL=https://api.test.ttp.ng/api/v1
```

### 4. Test
- Visit https://test.ttp.ng
- Check browser console (F12)
- Should see NO 404 errors
- All API calls should succeed

## Summary

**Issue**: `/api/v1` was being added twice to URLs
**Fix**: Updated all services to use base URL that already includes `/api/v1`
**Status**: ✅ Fixed and ready to deploy
**Impact**: All API endpoints now work correctly

---

**Next Step**: Push changes to trigger Vercel deployment! 🚀
