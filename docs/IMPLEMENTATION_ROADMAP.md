# Implementation Roadmap

## Completed Tasks

### ✅ 1. Car Hire Backend API with Staff Clearance
- Created `Car` model for inventory management
- Created `CarBooking` model for bookings
- Created car hire controller with all CRUD operations
- Implemented staff clearance checks (Tier 2+ required for inventory management)
- Created routes with proper authentication and authorization
- Registered routes in main router

**API Endpoints:**
- `GET /api/v1/car-hire` - Get all cars (public)
- `GET /api/v1/car-hire/:id` - Get car by ID (public)
- `POST /api/v1/car-hire` - Create car (Staff Tier 2+)
- `PUT /api/v1/car-hire/:id` - Update car (Staff Tier 2+)
- `DELETE /api/v1/car-hire/:id` - Delete car (Staff Tier 2+)
- `POST /api/v1/car-hire/book` - Book a car (authenticated users)
- `GET /api/v1/car-hire/my-bookings` - Get user's bookings
- `GET /api/v1/car-hire/bookings/all` - Get all bookings (Staff Tier 2+)
- `PUT /api/v1/car-hire/bookings/:id/process` - Process booking (Staff Tier 2+)

## Pending Tasks

### 🔄 2. Dashboard System for All User Types

**Requirements:**
- Create role-based dashboard components
- Implement content access control based on user type and clearance level
- Different dashboard views for:
  - Regular Users (bookings, profile)
  - Business Users (business bookings, reports)
  - Staff Tier 1 (basic operations)
  - Staff Tier 2 (bookings, inventory)
  - Staff Tier 3 (team management, reports)
  - Staff Tier 4 (full management access)
  - Managers/Executives (analytics, oversight)
  - Admins (full system access)

**Files to Create/Modify:**
- `frontend/web-app/src/app/dashboard/page.tsx` - Main dashboard router
- `frontend/web-app/src/components/dashboard/UserDashboard.tsx`
- `frontend/web-app/src/components/dashboard/StaffDashboard.tsx`
- `frontend/web-app/src/components/dashboard/AdminDashboard.tsx`
- `frontend/web-app/src/lib/auth/permissions.ts` - Permission checking utilities

### 🔄 3. Rename "Visa Application" to "Visa Assistance"

**Files to Modify:**
- `frontend/web-app/src/components/ui/ServiceTabs.tsx` - Update tab label
- `frontend/web-app/src/app/visa-application/*` - Rename directory to `visa-assistance`
- All form fields and labels mentioning "application"
- Update user flow to reflect assistance nature
- Backend routes (if any visa-specific routes exist)

**Changes Needed:**
- "Visa Application" → "Visa Assistance"
- "Apply for Visa" → "Get Visa Assistance"
- "Application Form" → "Assistance Request Form"
- Update all related text to emphasize assistance/help rather than direct application

### 🔄 4. Fix Login to Work with Email or Phone Number

**Current Issue:**
- Frontend login may only support email
- Backend supports both email and phone number

**Files to Modify:**
- `frontend/web-app/src/components/auth/LoginOverlay.tsx` - Update form
- `frontend/web-app/src/lib/api-client.ts` - Ensure API calls support both
- Login validation to accept either email or phone format

**Implementation:**
```typescript
// Login form should accept:
- Email: user@example.com
- Phone: +2348012345678 or 08012345678

// Validation logic:
if (input.includes('@')) {
  // Treat as email
} else {
  // Treat as phone number
}
```

## Implementation Priority

### Phase 1 (Immediate)
1. ✅ Car Hire API Backend
2. Fix Login (Email/Phone support)
3. Rename Visa Application to Visa Assistance

### Phase 2 (Next Sprint)
1. Dashboard System Implementation
2. Staff Dashboard with Clearance-based Access
3. Car Inventory Management UI (Staff Tier 2+)

### Phase 3 (Future)
1. Advanced Analytics Dashboard
2. Staff Performance Tracking
3. Automated Booking Processing

## Technical Notes

### Staff Clearance Levels
- **Tier 1**: Drivers, Office Assistants - Basic access
- **Tier 2**: Ticketing Officers - Booking & inventory management
- **Tier 3**: Supervisors - Team oversight, reports
- **Tier 4**: Management - Full operational access

### Security Considerations
- All staff operations are logged for audit
- Clearance checks happen at middleware level
- Failed clearance attempts are logged as security events
- Employee IDs must be unique

### Database Migrations Needed
- Run migrations to add staff clearance fields to existing users
- Seed car inventory data for testing
- Create indexes for performance

## Testing Checklist

### Car Hire API
- [ ] Test car creation (Staff Tier 2+)
- [ ] Test car update (Staff Tier 2+)
- [ ] Test car deletion (Staff Tier 2+)
- [ ] Test booking creation (any authenticated user)
- [ ] Test booking processing (Staff Tier 2+)
- [ ] Test clearance level enforcement
- [ ] Test public car listing

### Login System
- [ ] Test login with email
- [ ] Test login with phone number
- [ ] Test login with invalid credentials
- [ ] Test token refresh
- [ ] Test logout

### Dashboard
- [ ] Test user dashboard access
- [ ] Test staff dashboard with different clearance levels
- [ ] Test admin dashboard
- [ ] Test permission-based content hiding

## API Documentation Updates Needed

1. Add car hire endpoints to Swagger/OpenAPI docs
2. Document staff clearance requirements
3. Update authentication docs to mention email/phone login
4. Add dashboard API endpoints documentation

## Frontend Components Needed

### Car Hire Management (Staff Tier 2+)
- `CarInventoryList.tsx` - List all cars
- `CarForm.tsx` - Create/Edit car
- `CarBookingsList.tsx` - View all bookings
- `BookingProcessor.tsx` - Process bookings

### Dashboard Components
- `DashboardLayout.tsx` - Main layout
- `DashboardSidebar.tsx` - Navigation based on role
- `DashboardStats.tsx` - Role-specific statistics
- `QuickActions.tsx` - Role-specific quick actions

## Environment Variables Needed

```env
# Car Hire
CAR_HIRE_ENABLED=true
CAR_HIRE_MIN_BOOKING_DAYS=1
CAR_HIRE_MAX_BOOKING_DAYS=30

# Staff Management
STAFF_CLEARANCE_ENABLED=true
```

## Next Steps

1. **Immediate**: Test car hire API endpoints
2. **Today**: Fix login to support email/phone
3. **This Week**: Rename visa application to visa assistance
4. **Next Week**: Start dashboard implementation
5. **Ongoing**: Update documentation as features are completed
