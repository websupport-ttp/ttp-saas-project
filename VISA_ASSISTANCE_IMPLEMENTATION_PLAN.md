# Visa Assistance & Management Dashboard Implementation Plan

## Overview
Complete implementation of visa assistance booking flow with officer management, payment link generation, and management dashboard for transaction stats.

## Part 1: Management Dashboard (Expenses & Profit)

### Backend Implementation
**File**: `backend/v1/controllers/dashboardController.js`

Add new endpoint for management stats:
```javascript
GET /api/v1/dashboard/management-stats
```

**Response Structure**:
```javascript
{
  totalRevenue: Number,
  totalExpenses: Number,
  netProfit: Number,
  profitMargin: Number,
  revenueByService: {
    flights: Number,
    hotels: Number,
    carHire: Number,
    visa: Number,
    insurance: Number
  },
  expensesByCategory: {
    operations: Number,
    marketing: Number,
    salaries: Number,
    infrastructure: Number
  },
  monthlyTrends: [{
    month: String,
    revenue: Number,
    expenses: Number,
    profit: Number
  }],
  topPerformingServices: [],
  recentTransactions: []
}
```

### Frontend Implementation
**File**: `frontend/web-app/src/components/dashboard/ManagementDashboard.tsx`

Features:
- Revenue vs Expenses chart
- Profit margin indicator
- Service-wise revenue breakdown
- Monthly trends graph
- Top performing services
- Recent transactions table

## Part 2: Visa Assistance Booking Flow

### User Journey
1. **Landing Page** → User fills basic visa assistance form
2. **Detailed Form** → Redirected to comprehensive visa application form
3. **Submission** → Application saved with "Pending" status
4. **Officer Assignment** → Visa officer receives notification
5. **Follow-up** → Officer contacts customer via call/email
6. **Payment Link** → Officer generates and sends payment link
7. **Payment** → Customer pays via link
8. **Status Update** → Application status changes to "Paid" → "Under Review"

### Implementation Steps

#### Step 1: Improve Landing Page Visa Form
**File**: `frontend/web-app/src/components/ui/ServiceTabs.tsx`

Current fields (to improve):
- Destination Country (autocomplete with country list)
- Visa Type (dropdown with common types)
- Travel Date (date picker)
- Email (validation)
- Phone (international format)

New/Improved fields:
- Full Name
- Nationality
- Purpose of Travel
- Urgency Level (Standard/Express/Super Express)
- Preferred Contact Method (Email/Phone/WhatsApp)

#### Step 2: Create Detailed Visa Application Form
**File**: `frontend/web-app/src/app/visa-assistance/apply/page.tsx`

Sections:
1. **Personal Information**
   - Full name, DOB, Gender, Nationality
   - Passport details
   - Contact information

2. **Travel Details**
   - Destination country
   - Visa type
   - Travel dates
   - Purpose of travel
   - Accommodation details

3. **Document Upload**
   - Passport copy
   - Passport photograph
   - Bank statement
   - Flight itinerary (if available)
   - Hotel booking (if available)
   - Invitation letter (if applicable)

4. **Additional Information**
   - Previous visa history
   - Travel insurance
   - Emergency contact

#### Step 3: Backend API for Visa Assistance
**File**: `backend/v1/controllers/visaAssistanceController.js` (new)

Endpoints:
```javascript
// Create visa assistance request
POST /api/v1/visa-assistance/request
Body: { basic form data from landing page }
Response: { requestId, redirectUrl }

// Submit detailed application
POST /api/v1/visa-assistance/applications
Body: { complete application data }
Response: { applicationReference, status }

// Get application by reference
GET /api/v1/visa-assistance/applications/:reference

// Officer: Get assigned applications
GET /api/v1/visa-assistance/officer/applications

// Officer: Add follow-up note
POST /api/v1/visa-assistance/applications/:id/follow-up
Body: { note, contactMethod, nextAction }

// Officer: Generate payment link
POST /api/v1/visa-assistance/applications/:id/generate-payment-link
Body: { amount, description, dueDate }
Response: { paymentLink, paymentReference }

// Verify payment
POST /api/v1/visa-assistance/applications/:id/verify-payment
Body: { paymentReference }

// Update application status
PUT /api/v1/visa-assistance/applications/:id/status
Body: { status, notes }
```

#### Step 4: Payment Link Generation
**File**: `backend/v1/services/paymentLinkService.js` (new)

Features:
- Generate unique payment link with Paystack
- Set expiry date
- Include application reference
- Send via email/SMS
- Track payment status

```javascript
const generatePaymentLink = async ({
  applicationId,
  amount,
  customerEmail,
  customerPhone,
  description,
  dueDate
}) => {
  // Create Paystack payment page
  const paystackResponse = await paystack.createPaymentPage({
    name: `Visa Application - ${applicationId}`,
    amount: amount * 100, // Convert to kobo
    description,
    redirect_url: `${FRONTEND_URL}/visa-assistance/payment/verify`,
    metadata: {
      applicationId,
      type: 'visa_assistance'
    }
  });

  // Save payment link to database
  const paymentLink = await PaymentLink.create({
    applicationId,
    paystackPageId: paystackResponse.data.id,
    paystackPageUrl: paystackResponse.data.url,
    amount,
    expiresAt: dueDate,
    status: 'active'
  });

  return paymentLink;
};
```

#### Step 5: Officer Dashboard
**File**: `frontend/web-app/src/app/dashboard/visa-officer/page.tsx` (new)

Features:
- List of assigned visa applications
- Filter by status (Pending, Contacted, Awaiting Payment, Paid, Under Review)
- Quick actions:
  - View application details
  - Add follow-up note
  - Generate payment link
  - Update status
- Application timeline
- Customer contact information
- Document viewer

#### Step 6: Notification System Integration
When new visa assistance request is submitted:
1. Create NotificationQueue entry
2. Assign to available visa officer (or Head of Operations assigns)
3. Send email/SMS notification to officer
4. Officer sees notification in dashboard

#### Step 7: Email Templates
**File**: `backend/v1/utils/emailTemplates.js`

New templates:
1. **Visa Assistance Request Confirmation** (to customer)
2. **New Visa Application Assignment** (to officer)
3. **Payment Link Email** (to customer)
4. **Payment Confirmation** (to customer)
5. **Application Status Update** (to customer)

### Database Schema Updates

#### New Model: PaymentLink
```javascript
{
  applicationId: ObjectId,
  paystackPageId: String,
  paystackPageUrl: String,
  amount: Number,
  currency: String,
  status: String, // 'active', 'paid', 'expired', 'cancelled'
  expiresAt: Date,
  paidAt: Date,
  paymentReference: String,
  createdBy: ObjectId, // Visa officer
  sentVia: [String], // ['email', 'sms', 'whatsapp']
  sentAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Update VisaApplication Model
Add fields:
```javascript
{
  assignedOfficer: ObjectId,
  assignedAt: Date,
  followUpHistory: [{
    note: String,
    contactMethod: String,
    contactedAt: Date,
    addedBy: ObjectId,
    nextAction: String,
    nextActionDate: Date
  }],
  paymentLink: ObjectId,
  paymentLinkSentAt: Date,
  paymentLinkSentVia: [String]
}
```

## Part 3: Authorization & Permissions

### Middleware Updates
**File**: `backend/v1/middleware/authMiddleware.js`

New middleware functions:
```javascript
// Check if user is visa officer
const requireVisaOfficer = (req, res, next) => {
  if (req.user.role !== 'Staff' || 
      !req.user.staffDetails ||
      req.user.staffDetails.designation !== 'Visa Officer') {
    return res.status(403).json({ error: 'Access denied. Visa Officer role required.' });
  }
  next();
};

// Check if user is operations head
const requireOperationsHead = (req, res, next) => {
  if (req.user.role !== 'Staff' || 
      !req.user.staffDetails ||
      req.user.staffDetails.designation !== 'Head of Operations') {
    return res.status(403).json({ error: 'Access denied. Head of Operations role required.' });
  }
  next();
};

// Check if user is management (can view financial stats)
const requireManagement = (req, res, next) => {
  const managementRoles = ['Admin', 'Executive', 'Manager'];
  const managementDesignations = ['Head of Operations', 'Head of Sales', 'Head of Accounting'];
  
  if (!managementRoles.includes(req.user.role) &&
      (!req.user.staffDetails || !managementDesignations.includes(req.user.staffDetails.designation))) {
    return res.status(403).json({ error: 'Access denied. Management access required.' });
  }
  next();
};
```

## Implementation Priority

### Phase 1: Management Dashboard (High Priority)
1. ✅ Backend: Add management stats endpoint
2. ✅ Frontend: Create ManagementDashboard component
3. ✅ Add charts and visualizations
4. ✅ Test with sample data

### Phase 2: Visa Assistance Form Improvements (High Priority)
1. ✅ Improve landing page visa form
2. ✅ Add country autocomplete
3. ✅ Add visa type dropdown
4. ✅ Improve validation

### Phase 3: Detailed Visa Application (Medium Priority)
1. ✅ Create detailed application form
2. ✅ Add document upload
3. ✅ Create backend API
4. ✅ Test submission flow

### Phase 4: Officer Dashboard & Payment Links (Medium Priority)
1. ✅ Create visa officer dashboard
2. ✅ Implement payment link generation
3. ✅ Add follow-up system
4. ✅ Create email templates

### Phase 5: Notifications & Automation (Low Priority)
1. ✅ Integrate with NotificationQueue
2. ✅ Auto-assign to officers
3. ✅ Email/SMS notifications
4. ✅ Status tracking

## Testing Checklist

### Management Dashboard
- [ ] Revenue calculations correct
- [ ] Expense tracking accurate
- [ ] Profit margins calculated correctly
- [ ] Charts display properly
- [ ] Filters work correctly
- [ ] Export functionality works

### Visa Assistance Flow
- [ ] Landing form validation works
- [ ] Redirect to detailed form works
- [ ] Application submission successful
- [ ] Officer receives notification
- [ ] Payment link generation works
- [ ] Payment verification works
- [ ] Status updates correctly
- [ ] Email notifications sent

### Authorization
- [ ] Only visa officers can access officer dashboard
- [ ] Only management can view financial stats
- [ ] Payment links can only be generated by officers
- [ ] Customers can view their own applications

## Next Steps
1. Start with Management Dashboard implementation
2. Improve visa assistance form on landing page
3. Create detailed application form
4. Implement officer dashboard
5. Add payment link generation
6. Test complete flow
