# Next Steps to Fix Admin Dashboard Discounts Not Showing

## Current Status
✅ Frontend code is fixed - response parsing is correct
✅ Backend code is correct - endpoints are working
❌ Backend cannot connect to MongoDB in production

## What's Happening
1. User accesses `https://test.ttp.ng/dashboard/admin`
2. Frontend calls `GET /api/v1/discounts` to load discounts
3. Backend receives the request but cannot query the database
4. Backend returns empty array `{ count: 0, discounts: [] }`
5. Frontend displays "No discounts found"

## Root Cause
The backend is deployed on Vercel with `MONGO_URI=mongodb://localhost:27017/the_travel_place` in the `.env` file. This connection string:
- Points to a local MongoDB instance
- Does NOT exist on the Vercel server
- Cannot connect from a deployed server

## Solution Required
Set the correct `MONGO_URI` environment variable in Vercel project settings.

### Action Items for User:

1. **Get MongoDB Connection String**
   - If using MongoDB Atlas: Get from cluster connection settings
   - If using self-hosted MongoDB: Get from your server
   - Format: `mongodb+srv://user:pass@cluster.mongodb.net/database` or `mongodb://user:pass@host:port/database`

2. **Update Vercel Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add/Update `MONGO_URI` with the correct connection string
   - Make sure it's set for "Production" environment

3. **Redeploy Backend**
   - Go to Vercel Dashboard → Deployments
   - Redeploy the latest version
   - Wait for deployment to complete

4. **Verify Fix**
   - Check backend logs in Vercel for "MongoDB Connected: <host>"
   - Go to admin dashboard and refresh
   - Discounts should now appear

## Debugging Commands
If you need to verify the database connection:

```bash
# Check if MongoDB is accessible
mongo "mongodb+srv://user:pass@cluster.mongodb.net/database_name"

# List all discounts in database
db.discounts.find()

# Count discounts
db.discounts.countDocuments()
```

## Files Modified in This Session
- `frontend/web-app/src/lib/services/pricing-service.ts` - Fixed response parsing
- `backend/v1/controllers/discountController.js` - Added logging
- `backend/v1/controllers/serviceChargeController.js` - Added logging

## Expected Outcome
After setting the correct `MONGO_URI` and redeploying:
- Admin dashboard will show all discounts
- Admin dashboard will show all service charges
- Admin dashboard will show all taxes
- Flight selection will show applicable discounts
- Booking page will show price breakdown with discounts

## Support
If the issue persists after these steps:
1. Check Vercel logs for MongoDB connection errors
2. Verify the MongoDB connection string is correct
3. Ensure the database contains the discount documents
4. Check if the user is authenticated (look for 401 errors in browser Network tab)
