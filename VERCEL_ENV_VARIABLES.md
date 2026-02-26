# Vercel Environment Variables

## 🚀 What to Update for Vercel Production

When deploying to Vercel, you need to update these variables:

### ✅ MUST UPDATE (Critical)

1. **NEXT_PUBLIC_SITE_URL**
   - Current: `http://localhost:3000`
   - Update to: `https://your-app.vercel.app` (your actual Vercel URL)
   - Example: `https://ttp-saas-frontend.vercel.app`

2. **NEXT_PUBLIC_API_BASE_URL**
   - Current: `http://localhost:8080/api/v1`
   - Update to: `https://your-backend.up.railway.app/api/v1` (your Railway URL)
   - Example: `https://ttp-saas-backend-production.up.railway.app/api/v1`

### ⚙️ SHOULD UPDATE (Recommended)

3. **NEXT_PUBLIC_DEBUG_MODE**
   - Current: `true`
   - Update to: `false` (for production)

4. **NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS**
   - Current: `true`
   - Update to: `false` (for production)

### ✅ KEEP AS IS (Already Correct)

- `NEXT_PUBLIC_SITE_NAME` - Already good
- `NEXT_PUBLIC_SITE_DESCRIPTION` - Already good
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` - Test key is fine for testing
- `NEXT_PUBLIC_AUTH_COOKIE_NAME` - Already good
- `NEXT_PUBLIC_REFRESH_TOKEN_NAME` - Already good
- `NEXT_PUBLIC_API_TIMEOUT` - Already good
- `NEXT_PUBLIC_ENABLE_GUEST_CHECKOUT` - Already good
- `NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES` - Already good

## 📋 Complete Vercel Environment Variables

Copy these to Vercel (update the URLs with your actual values):

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME=The Travel Place
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NEXT_PUBLIC_SITE_DESCRIPTION=Discover amazing destinations and plan your perfect trip with The Travel Place - your trusted travel companion for flights, hotels, visa applications, and travel insurance.

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-backend.up.railway.app/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication Configuration
NEXT_PUBLIC_AUTH_COOKIE_NAME=ttp_auth_token
NEXT_PUBLIC_REFRESH_TOKEN_NAME=ttp_refresh_token

# Payment Configuration (Paystack)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_94c934b4b9a13be250eff78151e924c031ae9344

# Production Settings
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS=false
NEXT_PUBLIC_ENABLE_GUEST_CHECKOUT=true
NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES=true
```

## 🎯 How to Add to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add each variable:
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://your-app.vercel.app`
   - Environment: Select "Production", "Preview", and "Development"
5. Repeat for all variables above

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter value when prompted: https://your-app.vercel.app

vercel env add NEXT_PUBLIC_API_BASE_URL production
# Enter value when prompted: https://your-backend.up.railway.app/api/v1

# Continue for other variables...
```

### Method 3: During Initial Deployment

When you first import your project to Vercel:
1. Vercel will detect it's a Next.js project
2. Click "Environment Variables" section
3. Add all variables before deploying

## 🔄 Deployment Workflow

### Step 1: Deploy Backend to Railway First
1. Deploy backend to Railway
2. Copy the Railway URL (e.g., `https://ttp-saas-backend-production.up.railway.app`)

### Step 2: Deploy Frontend to Vercel
1. Import project to Vercel
2. Add environment variables with Railway URL
3. Deploy

### Step 3: Update Railway CORS
1. Go back to Railway
2. Update `ALLOWED_ORIGINS` to include Vercel URL:
   ```
   ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-app-*.vercel.app
   ```

### Step 4: Get Vercel URL and Update
1. After first deployment, Vercel gives you a URL
2. Update `NEXT_PUBLIC_SITE_URL` in Vercel with this URL
3. Redeploy (Vercel will auto-redeploy)

## 📝 Production vs Development

### Development (.env.local)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS=true
```

### Production (Vercel)
```env
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_BASE_URL=https://your-backend.up.railway.app/api/v1
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS=false
```

## ⚠️ Important Notes

1. **NEXT_PUBLIC_ prefix**: All variables with this prefix are exposed to the browser
2. **No secrets**: Never put secret keys in NEXT_PUBLIC_ variables
3. **Rebuild required**: Changes to env variables require a rebuild/redeploy
4. **Multiple environments**: You can set different values for Production, Preview, and Development

## 🔍 Verify After Deployment

1. Visit your Vercel URL
2. Open browser console
3. Check if API calls go to Railway URL
4. Test login functionality
5. Check Network tab for correct API endpoints

## 🐛 Troubleshooting

### API calls fail with CORS error
**Solution**: Update Railway `ALLOWED_ORIGINS` to include Vercel URL

### API calls go to localhost
**Solution**: Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly in Vercel

### Changes not reflecting
**Solution**: Redeploy from Vercel dashboard or push new commit

### 404 on API calls
**Solution**: Ensure Railway backend is running and URL is correct

## 📊 Example URLs

### Railway Backend
```
https://ttp-saas-backend-production.up.railway.app
https://ttp-saas-backend-production.up.railway.app/api/v1
https://ttp-saas-backend-production.up.railway.app/health
```

### Vercel Frontend
```
https://ttp-saas-frontend.vercel.app
https://ttp-saas-frontend-git-main.vercel.app (preview)
https://ttp-saas-frontend-username.vercel.app (personal)
```

## 🎯 Quick Copy-Paste for Vercel

**After deploying backend to Railway**, replace the URLs and copy this:

```
NEXT_PUBLIC_SITE_NAME=The Travel Place
NEXT_PUBLIC_SITE_URL=https://YOUR-VERCEL-URL.vercel.app
NEXT_PUBLIC_SITE_DESCRIPTION=Discover amazing destinations and plan your perfect trip with The Travel Place - your trusted travel companion for flights, hotels, visa applications, and travel insurance.
NEXT_PUBLIC_API_BASE_URL=https://YOUR-RAILWAY-URL.up.railway.app/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_AUTH_COOKIE_NAME=ttp_auth_token
NEXT_PUBLIC_REFRESH_TOKEN_NAME=ttp_refresh_token
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_94c934b4b9a13be250eff78151e924c031ae9344
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS=false
NEXT_PUBLIC_ENABLE_GUEST_CHECKOUT=true
NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES=true
```

---

**Ready to deploy?** Deploy Railway first, then use the Railway URL in Vercel! 🚀
