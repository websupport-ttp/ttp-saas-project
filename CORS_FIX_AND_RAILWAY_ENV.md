# CORS Fix and Railway Environment Configuration

## Issue
Frontend at `https://test.ttp.ng` cannot connect to backend at `https://api.test.ttp.ng` due to CORS errors.

## Root Cause
The backend CORS configuration requires proper environment variables to be set in Railway.

## Changes Made

### 1. Enhanced CORS Configuration (backend/app.js)
- Added detailed logging for CORS requests
- Added Vercel deployment URLs to allowed origins
- Added `preflightContinue: false` and `optionsSuccessStatus: 204`
- Added explicit OPTIONS handler for preflight requests

### 2. Allowed Origins
The backend now allows these origins by default in production:
- `https://test.ttp.ng`
- `https://www.test.ttp.ng`
- `https://ttp.ng`
- `https://www.ttp.ng`
- `https://ttp-saas-frontend.vercel.app`
- `https://ttp-saas-frontend-git-main.vercel.app`

## Railway Environment Variables Required

### Critical Variables

1. **NODE_ENV**
   ```
   NODE_ENV=production
   ```
   This ensures the backend runs in production mode with proper CORS checks.

2. **ALLOWED_ORIGINS** (Optional - for additional origins)
   ```
   ALLOWED_ORIGINS=https://test.ttp.ng,https://www.test.ttp.ng
   ```
   Add any additional origins that need access.

3. **COOKIE_SECRET**
   ```
   COOKIE_SECRET=your-secure-random-string-here
   ```
   Required for secure cookie handling.

### How to Set Environment Variables in Railway

1. Go to your Railway project dashboard
2. Click on your backend service
3. Go to the "Variables" tab
4. Add/Update the following variables:

```bash
NODE_ENV=production
COOKIE_SECRET=<generate-a-secure-random-string>
ALLOWED_ORIGINS=https://test.ttp.ng,https://www.test.ttp.ng
```

### Generate Secure Cookie Secret

Use one of these methods:

**Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**OpenSSL:**
```bash
openssl rand -hex 32
```

**Online:**
Visit: https://www.random.org/strings/

## Testing the Fix

### 1. Check Backend Health
```bash
curl -I https://api.test.ttp.ng/health
```

Should return 200 OK.

### 2. Test CORS Preflight
```bash
curl -X OPTIONS https://api.test.ttp.ng/api/v1/auth/login \
  -H "Origin: https://test.ttp.ng" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

Should return:
- Status: 204 No Content
- Header: `Access-Control-Allow-Origin: https://test.ttp.ng`
- Header: `Access-Control-Allow-Credentials: true`

### 3. Test Actual Request
```bash
curl -X POST https://api.test.ttp.ng/api/v1/auth/login \
  -H "Origin: https://test.ttp.ng" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  -v
```

Should return proper response with CORS headers.

## Deployment Steps

### 1. Commit and Push Changes
```bash
cd backend
git add app.js
git commit -m "fix: Enhanced CORS configuration with explicit preflight handling"
git push origin main
```

### 2. Set Railway Environment Variables
- Log into Railway dashboard
- Navigate to backend service
- Add/update environment variables as listed above

### 3. Redeploy Backend
Railway should auto-deploy after the git push. If not:
- Go to Railway dashboard
- Click "Deploy" on your backend service

### 4. Verify Deployment
- Check Railway logs for any errors
- Look for CORS log messages: "CORS request from origin: ..."
- Test the endpoints using curl commands above

### 5. Test Frontend
- Clear browser cache (Ctrl+Shift+Delete)
- Go to https://test.ttp.ng
- Try to login
- Check browser console for errors

## Troubleshooting

### If CORS errors persist:

1. **Check Railway Logs**
   ```
   Look for: "CORS request from origin: https://test.ttp.ng"
   Look for: "CORS allowed for origin: https://test.ttp.ng"
   ```

2. **Verify Environment Variables**
   - Ensure NODE_ENV=production is set
   - Check ALLOWED_ORIGINS if using custom domains

3. **Check Backend Health**
   ```bash
   curl https://api.test.ttp.ng/health
   ```
   If this fails, backend is not running properly.

4. **Check DNS**
   ```bash
   nslookup api.test.ttp.ng
   ```
   Ensure it resolves to Railway's IP.

5. **Check SSL Certificate**
   ```bash
   curl -I https://api.test.ttp.ng
   ```
   Should not show SSL errors.

### Common Issues

**Issue:** "No 'Access-Control-Allow-Origin' header is present"
**Solution:** Backend is not responding. Check Railway logs and ensure service is running.

**Issue:** "CORS blocked origin: https://test.ttp.ng"
**Solution:** Origin not in allowed list. Add to ALLOWED_ORIGINS environment variable.

**Issue:** Backend returns 500 error
**Solution:** Check Railway logs for application errors. May need to fix database connection or other issues.

## Additional CORS Headers

The backend now sends these CORS headers:
- `Access-Control-Allow-Origin`: The requesting origin
- `Access-Control-Allow-Credentials`: true
- `Access-Control-Allow-Methods`: GET, POST, PUT, PATCH, DELETE, OPTIONS
- `Access-Control-Allow-Headers`: Origin, X-Requested-With, Content-Type, Accept, Authorization, etc.
- `Access-Control-Expose-Headers`: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
- `Access-Control-Max-Age`: 86400 (24 hours)

## Security Notes

1. **Credentials**: CORS is configured with `credentials: true` to allow cookies
2. **Allowed Origins**: Only specific origins are allowed in production
3. **Methods**: Only necessary HTTP methods are allowed
4. **Headers**: Only required headers are allowed
5. **Max Age**: Preflight responses are cached for 24 hours

## Next Steps

1. Deploy the backend changes to Railway
2. Set the required environment variables
3. Test the CORS configuration
4. Monitor Railway logs for any issues
5. Clear browser cache and test frontend login

## Status

- [x] Enhanced CORS configuration
- [x] Added explicit OPTIONS handler
- [x] Added detailed logging
- [ ] Deploy to Railway
- [ ] Set environment variables
- [ ] Test CORS functionality
- [ ] Verify frontend can connect
