# The Travel Place SaaS

A comprehensive travel booking platform offering flights, hotels, car rentals, and visa assistance services.

## Project Structure

```
ttp-saas-project/
├── backend/          # Node.js/Express API server
├── frontend/         # Next.js web application
│   └── web-app/     # Main web application
├── docs/            # Project documentation
└── scripts/         # Utility scripts
```

## Repositories

- **Backend**: https://github.com/websupport-ttp/ttp-saas-backend.git
- **Frontend**: https://github.com/websupport-ttp/ttp-saas-frontend.git
- **Full Project**: https://github.com/websupport-ttp/ttp-saas-project.git

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB
- Redis
- AWS S3 account (for file uploads)
- Paystack account (for payments)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm start
```

### Frontend Setup
```bash
cd frontend/web-app
npm install
cp .env.local.example .env.local
# Configure your .env.local file
npm run dev
```

## Features

### Core Services
- ✅ Flight Booking (Amadeus API integration)
- ✅ Hotel Booking (RateHawk API integration)
- ✅ Car Hire (Custom inventory management)
- ✅ Travel Insurance (Allianz/Sanlam integration)
- ✅ Visa Assistance

### User Management
- ✅ Multi-role authentication (User, Staff, Admin, Manager)
- ✅ Staff clearance levels (Tier 1-4)
- ✅ JWT-based authentication
- ✅ Role-based access control

### Payment Processing
- ✅ Paystack integration
- ✅ Payment verification
- ✅ Booking management
- ✅ Transaction tracking

### Admin Features
- ✅ Dashboard with analytics
- ✅ User management
- ✅ Booking management
- ✅ Car inventory management
- ✅ System monitoring

## Technology Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Redis for caching
- JWT authentication
- AWS S3 for file storage
- Paystack for payments

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Material-UI Icons
- React Hook Form

## Documentation

See the `/docs` folder for detailed documentation:
- API Documentation
- Deployment Guide
- Testing Guide
- Integration Guides

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=8080
MONGODB_URI=mongodb://localhost:27017/travelplace
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=eu-north-1
AWS_S3_BUCKET=your_bucket_name
PAYSTACK_SECRET_KEY=your_paystack_secret
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_SITE_NAME=The Travel Place
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

## Development

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend/web-app
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend/web-app
npm run build
```

## Deployment

See `docs/DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## License

Proprietary - All rights reserved

## Support

For support, contact: support@thetravelplace.com
