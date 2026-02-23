# Railway & Vercel Deployment Guide

## Current Status

### ✅ Frontend Repository
- **Repository**: `https://github.com/websupport-ttp/ttp-saas-frontend.git`
- **Status**: Successfully pushed to GitHub
- **Latest Commit**: Profile page, collapsible sidebar, and visa form UX improvements
- **Ready for**: Vercel deployment

### ⚠️ Backend Repository
- **Repository**: `https://github.com/websupport-ttp/ttp-saas-backend.git`
- **Status**: Committed locally but push failed (permission denied)
- **Issue**: Authentication problem - user `opeoladettp` doesn't have push access
- **Latest Commit**: User profile management with picture upload functionality

## Fixing Backend Push Issue

### Option 1: Use Personal Access Token (Recommended)

1. **Generate a GitHub Personal Access Token**:
   - Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a name: "Railway Backend Deployment"
   - Select scopes: `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again)

2. **Update the backend remote URL**:
   ```powershell
   cd backend
   git remote set-url origin https://YOUR_TOKEN@github.com/websupport-ttp/ttp-saas-backend.git
   ```
   Replace `YOUR_TOKEN` with the token you just generated.

3. **Push the changes**:
   ```powershell
   git push origin main
   ```

### Option 2: Use SSH (Alternative)

1. **Generate SSH key** (if you don't have one):
   ```powershell
   ssh-keygen -t ed25519 -C "opeoladettp@gmail.com"
   ```

2. **Add SSH key to GitHub**:
   - Copy the public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub.com → Settings → SSH and GPG keys → New SSH key
   - Paste the key and save

3. **Update backend remote to use SSH**:
   ```powershell
   cd backend
   git remote set-url origin git@github.com:websupport-ttp/ttp-saas-backend.git
   git push origin main
   ```

### Option 3: Request Organization Access

Contact the owner of the `websupport-ttp` organization and request push access for your account `opeoladettp`.

## Railway Deployment (Backend)

### Prerequisites
- Backend repository must be pushed to GitHub
- Railway account connected to GitHub

### Why Railway Can't Find Your Repository

Railway needs access to your GitHub repositories. Here's how to fix it:

1. **Go to Railway Dashboard**: https://railway.app/
2. **Click on your profile** (top right)
3. **Go to Settings → Connected Accounts**
4. **Reconnect GitHub**:
   - Click "Disconnect" if already connected
   - Click "Connect GitHub Account"
   - Authorize Railway to access your repositories
   - **Important**: Make sure to grant access to the `websupport-ttp` organization

5. **Grant Organization Access**:
   - After connecting, GitHub will ask which organizations Railway can access
   - Check the box for `websupport-ttp`
   - Click "Grant" or "Authorize"

### Deploy Backend to Railway

1. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `websupport-ttp/ttp-saas-backend`

2. **Configure Build Settings**:
   - **Root Directory**: Leave empty (or set to `/` if needed)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` or `node server.js`
   - **Port**: Railway will auto-detect from your code

3. **Add Environment Variables**:
   Click "Variables" tab and add all from your `.env` file:
   ```
   NODE_ENV=production
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   COOKIE_SECRET=your_cookie_secret
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Paystack
   PAYSTACK_SECRET_KEY=your_paystack_secret
   PAYSTACK_PUBLIC_KEY=your_paystack_public
   
   # Redis (Railway provides this)
   REDIS_URL=redis://default:password@host:port
   
   # CORS
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   
   # Email (if using)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_app_password
   ```

4. **Add MongoDB**:
   - Option A: Use Railway's MongoDB plugin
     - Click "New" → "Database" → "Add MongoDB"
     - Railway will auto-create `MONGODB_URI` variable
   
   - Option B: Use MongoDB Atlas
     - Create cluster at mongodb.com/cloud/atlas
     - Get connection string
     - Add as `MONGODB_URI` variable

5. **Add Redis**:
   - Click "New" → "Database" → "Add Redis"
   - Railway will auto-create `REDIS_URL` variable

6. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Copy the generated URL (e.g., `https://your-app.up.railway.app`)

## Vercel Deployment (Frontend)

### Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com/
2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import `websupport-ttp/ttp-saas-frontend`

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (or leave empty)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

4. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend.up.railway.app
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-app.vercel.app`

6. **Update Backend CORS**:
   - Go back to Railway
   - Update `ALLOWED_ORIGINS` to include your Vercel URL:
     ```
     ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-app-*.vercel.app
     ```

## Post-Deployment Checklist

### Backend (Railway)
- [ ] Backend repository pushed to GitHub
- [ ] Railway connected to GitHub with organization access
- [ ] MongoDB connected and accessible
- [ ] Redis connected and accessible
- [ ] All environment variables configured
- [ ] CORS configured with Vercel URL
- [ ] Health check endpoint working: `https://your-backend.up.railway.app/health`
- [ ] API responding: `https://your-backend.up.railway.app/api/v1`

### Frontend (Vercel)
- [ ] Frontend repository pushed to GitHub
- [ ] Vercel connected to GitHub
- [ ] Environment variable `NEXT_PUBLIC_API_BASE_URL` set
- [ ] Build successful
- [ ] Site accessible
- [ ] API calls working to Railway backend

### Testing
- [ ] Login functionality works
- [ ] Dashboard loads correctly
- [ ] Profile picture upload works (Cloudinary)
- [ ] Visa assistance form works (Paystack)
- [ ] Car hire booking works
- [ ] CMS content management works

## Troubleshooting

### Railway: "No repository found"
**Solution**: Reconnect GitHub and grant organization access (see above)

### Railway: Build fails
- Check build logs in Railway dashboard
- Verify `package.json` has correct scripts
- Ensure all dependencies are in `dependencies`, not `devDependencies`

### Vercel: API calls fail
- Check browser console for CORS errors
- Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Ensure Railway backend has Vercel URL in `ALLOWED_ORIGINS`

### Backend: MongoDB connection fails
- Check `MONGODB_URI` format
- Ensure IP whitelist includes `0.0.0.0/0` (allow all) in MongoDB Atlas
- Verify network access settings

### Backend: Redis connection fails
- Check `REDIS_URL` format
- Ensure Redis is running on Railway
- Verify connection string includes password

## Useful Commands

### Check backend remote URL:
```powershell
cd backend
git remote -v
```

### Update backend remote URL with token:
```powershell
cd backend
git remote set-url origin https://YOUR_TOKEN@github.com/websupport-ttp/ttp-saas-backend.git
```

### Push backend changes:
```powershell
cd backend
git push origin main
```

### View Railway logs:
- Go to Railway dashboard → Your project → Deployments → Click on latest deployment → View logs

### View Vercel logs:
- Go to Vercel dashboard → Your project → Deployments → Click on latest deployment → View function logs

## Next Steps

1. **Fix backend push issue** using Option 1 (Personal Access Token)
2. **Push backend to GitHub**
3. **Connect Railway to GitHub** with organization access
4. **Deploy backend to Railway**
5. **Deploy frontend to Vercel**
6. **Update environment variables** on both platforms
7. **Test the deployed application**

## Support Resources

- **Railway Docs**: https://docs.railway.app/
- **Vercel Docs**: https://vercel.com/docs
- **GitHub PAT Guide**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
