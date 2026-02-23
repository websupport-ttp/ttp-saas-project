# CMS & Dynamic Content Implementation Plan

## Overview
Implement a Content Management System for homepage sections and complete the financial dashboard with charts.

## Phase 1: Backend - CMS Models & APIs

### 1.1 Database Models
- **HeroSlide Model** - Hero section carousel slides
- **Package Model** - Travel packages (already exists, enhance)
- **HotDeal Model** - Special offers and deals
- **Article Model** - Blog posts/articles
- **SiteSettings Model** - General site configuration
- **GoogleReview Model** - Cache for Google reviews

### 1.2 API Endpoints
- `GET/POST/PUT/DELETE /api/v1/cms/hero-slides` - Manage hero slides
- `GET/POST/PUT/DELETE /api/v1/cms/hot-deals` - Manage hot deals
- `GET/POST/PUT/DELETE /api/v1/cms/articles` - Manage articles
- `GET/PUT /api/v1/cms/settings` - Site settings
- `GET /api/v1/cms/google-reviews` - Fetch Google reviews
- `POST /api/v1/cms/google-reviews/sync` - Sync with Google API

## Phase 2: Frontend - Dynamic Content Display

### 2.1 Homepage Sections
- Update HeroSection to fetch from API
- Update PackagesSection to fetch from API
- Update HotDealsSection to fetch from API
- Update TestimonialsSection to fetch Google reviews
- Update ArticlesSection to fetch from API

### 2.2 CMS Dashboard
- Create `/dashboard/admin/cms` page
- Hero Slides Manager
- Hot Deals Manager
- Articles Manager
- Site Settings Manager
- Google Reviews Sync

## Phase 3: Chart Library & Financial Dashboard

### 3.1 Install Chart Library
- Install Recharts (React-friendly, no external dependencies)
- Alternative: Chart.js with react-chartjs-2

### 3.2 Complete Financial Dashboard
- Revenue vs Expenses Line Chart
- Service Revenue Pie Chart
- Monthly Trends Bar Chart
- Profit Margin Gauge
- Top Services Table
- Export to PDF/Excel functionality

## Phase 4: Google Reviews Integration

### 4.1 Google Places API Setup
- Configure Google Places API key
- Create service for fetching reviews
- Implement caching mechanism
- Auto-sync every 24 hours

### 4.2 Display Reviews
- Show star ratings
- Display review text
- Show reviewer name and photo
- Link to Google Business Profile

## Implementation Priority
1. ✅ Chart Library Installation
2. ✅ Complete Financial Dashboard with Charts
3. Backend CMS Models
4. Backend CMS APIs
5. Frontend Dynamic Content
6. CMS Dashboard UI
7. Google Reviews Integration

## Technical Stack
- **Charts**: Recharts (lightweight, React-native)
- **Image Upload**: Cloudinary/AWS S3
- **Rich Text Editor**: TipTap or Quill
- **Google API**: @google/maps (Places API)

## Security Considerations
- CMS access restricted to Admin/Manager roles
- Image upload validation and sanitization
- Rate limiting on public APIs
- Google API key security (server-side only)

## Next Steps
1. Install Recharts
2. Update Financial Dashboard with charts
3. Create CMS models
4. Build CMS APIs
5. Create CMS dashboard UI
6. Integrate Google Reviews
