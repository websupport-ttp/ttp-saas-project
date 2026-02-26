# Quick Commands Reference

## 🔐 Generate Secrets

```bash
# Generate all secrets at once
node generate-secrets.cjs
```

## 📦 Git Commands

### Check Status
```bash
# Main project
git status

# Backend
cd backend
git status

# Frontend
cd frontend/web-app
git status
```

### Push Changes
```bash
# Backend
cd backend
git add .
git commit -m "Your message"
git push origin main

# Frontend
cd frontend/web-app
git add .
git commit -m "Your message"
git push origin main

# Main project
git add .
git commit -m "Your message"
git push origin main
```

## 🚀 Railway Deployment

### View Logs
```bash
# Install Railway CLI (optional)
npm install -g @railway/cli

# Login
railway login

# View logs
railway logs
```

### Environment Variables
```bash
# List variables
railway variables

# Set a variable
railway variables set KEY=value
```

## 🔍 Vercel Deployment

### Install Vercel CLI (optional)
```bash
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# View logs
vercel logs
```

## 🧪 Local Testing

### Backend
```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Or start production
npm start
```

### Frontend
```bash
cd frontend/web-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Useful Node Commands

### Generate Single Secret
```bash
# In Node REPL
node
> require('crypto').randomBytes(64).toString('hex')
> .exit
```

### Check Node Version
```bash
node --version
npm --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

## 📊 Database Commands

### MongoDB
```bash
# Connect to MongoDB (if using local)
mongosh "mongodb://localhost:27017/ttp-saas"

# Or connect to Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/database"
```

### Redis
```bash
# Connect to Redis (if using local)
redis-cli

# Test connection
redis-cli ping
```

## 🐛 Debugging

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :8080
netstat -ano | findstr :3000

# Kill process by PID
taskkill /PID <PID> /F
```

### View Environment Variables
```bash
# Windows PowerShell
Get-ChildItem Env:

# View specific variable
echo $env:NODE_ENV
```

### Test API Endpoints
```bash
# Using curl (if installed)
curl http://localhost:8080/health
curl http://localhost:8080/api/v1

# Or use PowerShell
Invoke-WebRequest -Uri http://localhost:8080/health
```

## 📝 Quick File Operations

### View File Content
```bash
# Windows
type filename.txt
Get-Content filename.txt

# View last 20 lines
Get-Content filename.txt -Tail 20
```

### Find Files
```bash
# Find by name
Get-ChildItem -Recurse -Filter "*.js"

# Find by content
Select-String -Path "*.js" -Pattern "JWT_SECRET"
```

## 🔄 Update Dependencies

### Check for Updates
```bash
npm outdated
```

### Update All
```bash
npm update
```

### Update Specific Package
```bash
npm update package-name
```

## 🧹 Cleanup

### Remove node_modules
```bash
# Backend
cd backend
Remove-Item -Recurse -Force node_modules
npm install

# Frontend
cd frontend/web-app
Remove-Item -Recurse -Force node_modules
npm install
```

### Clear Build Files
```bash
# Frontend
cd frontend/web-app
Remove-Item -Recurse -Force .next
npm run build
```

## 📚 Documentation

### View Package Info
```bash
npm info package-name
npm docs package-name
```

### View Scripts
```bash
npm run
```

## 🎯 Quick Deployment Checklist

```bash
# 1. Generate secrets
node generate-secrets.cjs

# 2. Check git status
git status

# 3. Push to GitHub (if needed)
git add .
git commit -m "Update"
git push origin main

# 4. Deploy to Railway
# - Go to railway.app
# - Add environment variables
# - Deploy

# 5. Deploy to Vercel
# - Go to vercel.com
# - Import project
# - Add env variables
# - Deploy

# 6. Test
# - Visit Vercel URL
# - Test login
# - Test features
```

---

**Tip**: Bookmark this file for quick reference during development and deployment!
