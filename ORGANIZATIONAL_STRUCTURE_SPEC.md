# Organizational Structure Specification

## Overview
Complete restructuring of user roles and permissions to support departmental hierarchy, specialized roles, and vendor/agent management.

## User Types

### 1. System Admin
- Full system access
- Approves all role changes
- Manages all departments and users

### 2. Staff (Departmental Structure)

#### Departments:
1. **Operations**
2. **Sales**
3. **Accounting**
4. **IT**

#### Tier Levels:
- **Tier 1**: Staff (Entry level)
- **Tier 2**: Officers (Mid level)
- **Tier 3**: Department Heads/Supervisors (Management)

#### Operations Department Roles:
- **Ticketing Officer** (Tier 2)
  - Sees all car rental bookings
  - Follows up on abandoned bookings
  - Receives notifications when contact info is entered
  - Can be assigned tasks by Head of Operations

- **Visa Officer** (Tier 2)
  - Receives visa assistance requests
  - Follows up with customers via call/email
  - Sends payment links for visa services
  - Handles country-specific visa types

- **Customer Care Representative** (Tier 1)
  - General customer support
  - All operations staff work as CCR

- **Head of Operations** (Tier 3)
  - Views all transactions
  - Assigns pending notifications to officers
  - Manages operations team
  - Oversees all bookings and requests

#### Sales Department Roles:
- **Sales Officer** (Tier 2)
  - Sees all car rental bookings
  - Follows up on abandoned bookings
  - Sales tracking and conversion

- **Head of Sales** (Tier 3)
  - Views all transactions
  - Sales analytics and reporting
  - Team management

#### Accounting Department Roles:
- **Accounting Staff** (Tier 1-2)
  - Financial record keeping
  - Payment processing

- **Head of Accounting** (Tier 3)
  - Views all transactions
  - Financial oversight
  - Audit and compliance

#### IT Department Roles:
- **IT Manager** (Tier 3)
  - Technical infrastructure
  - System maintenance

- **Social Media Manager** (Tier 2)
  - Social media management
  - Online presence

- **Content Creator** (Tier 1-2)
  - Content development
  - Marketing materials

### 3. Vendor
- Manages own car rental inventory
- Add/edit/delete own vehicles
- View own bookings
- Earnings tracking
- Subject to admin approval

### 4. Agent
- Books on behalf of customers
- Commission tracking
- Customer management
- Subject to admin approval

### 5. Customer (Existing)
- Regular user
- Makes bookings
- Views own transactions

## Key Features

### Abandoned Booking Tracking
- Track when contact information is entered
- Notify ticketing and sales officers
- Follow-up workflow
- Conversion tracking

### Notification Queue System
- Centralized notification queue
- Assignment by Head of Operations
- Status tracking (pending, assigned, completed)
- Priority levels

### Role Change Approval System
- All role changes require admin approval
- Approval workflow
- Audit trail
- Notification system

### Vendor Management
- Vendor application process
- Inventory management per vendor
- Booking assignment to vendors
- Revenue sharing tracking

### Agent Management
- Agent registration and approval
- Commission structure
- Customer assignment
- Performance tracking

## Database Schema Changes

### User Model Updates
```javascript
{
  role: String, // 'admin', 'staff', 'vendor', 'agent', 'customer'
  
  // Staff-specific fields
  staffDetails: {
    department: String, // 'operations', 'sales', 'accounting', 'it'
    tier: Number, // 1, 2, 3
    designation: String, // 'ticketing_officer', 'visa_officer', 'ccr', etc.
    employeeId: String,
    managerId: ObjectId, // Reference to manager
  },
  
  // Vendor-specific fields
  vendorDetails: {
    businessName: String,
    businessRegistration: String,
    bankDetails: Object,
    commissionRate: Number,
    isApproved: Boolean,
    approvedBy: ObjectId,
    approvedAt: Date,
  },
  
  // Agent-specific fields
  agentDetails: {
    agencyName: String,
    agentCode: String,
    commissionRate: Number,
    isApproved: Boolean,
    approvedBy: ObjectId,
    approvedAt: Date,
  },
  
  // Role change tracking
  roleChangeRequest: {
    requestedRole: String,
    requestedAt: Date,
    status: String, // 'pending', 'approved', 'rejected'
    reviewedBy: ObjectId,
    reviewedAt: Date,
    reason: String,
  }
}
```

### New Models

#### AbandonedBooking Model
```javascript
{
  bookingType: String, // 'car_hire', 'flight', 'hotel', 'visa'
  customerEmail: String,
  customerPhone: String,
  customerName: String,
  formData: Object,
  completionPercentage: Number,
  lastActivity: Date,
  status: String, // 'abandoned', 'contacted', 'converted', 'lost'
  assignedTo: ObjectId,
  followUpNotes: Array,
  createdAt: Date,
}
```

#### NotificationQueue Model
```javascript
{
  type: String, // 'abandoned_booking', 'visa_request', 'customer_inquiry'
  priority: String, // 'low', 'medium', 'high', 'urgent'
  title: String,
  description: String,
  relatedEntity: {
    type: String,
    id: ObjectId,
  },
  assignedTo: ObjectId,
  assignedBy: ObjectId,
  status: String, // 'pending', 'assigned', 'in_progress', 'completed'
  createdAt: Date,
  assignedAt: Date,
  completedAt: Date,
  notes: Array,
}
```

#### RoleChangeRequest Model
```javascript
{
  userId: ObjectId,
  currentRole: String,
  requestedRole: String,
  requestedDetails: Object, // staffDetails, vendorDetails, or agentDetails
  reason: String,
  status: String, // 'pending', 'approved', 'rejected'
  requestedAt: Date,
  reviewedBy: ObjectId,
  reviewedAt: Date,
  reviewNotes: String,
}
```

## Permissions Matrix

| Feature | Admin | Ops Head | Sales Head | Acct Head | IT Mgr | Officer | Staff | Vendor | Agent | Customer |
|---------|-------|----------|------------|-----------|--------|---------|-------|--------|-------|----------|
| View All Transactions | ✓ | ✓ | ✓ | ✓ | - | - | - | - | - | - |
| Manage Users | ✓ | - | - | - | - | - | - | - | - | - |
| Approve Roles | ✓ | - | - | - | - | - | - | - | - | - |
| Assign Tasks | ✓ | ✓ | - | - | - | - | - | - | - | - |
| View Abandoned Bookings | ✓ | ✓ | ✓ | - | - | ✓* | - | - | - | - |
| Manage Own Inventory | - | - | - | - | - | - | - | ✓ | - | - |
| Book for Customers | ✓ | ✓ | ✓ | - | - | ✓* | - | - | ✓ | - |
| View Own Bookings | - | - | - | - | - | - | - | ✓ | ✓ | ✓ |

*Officers: Only for their department's scope

## Implementation Phases

### Phase 1: Database Schema Updates
- Update User model
- Create new models (AbandonedBooking, NotificationQueue, RoleChangeRequest)
- Migration scripts

### Phase 2: Backend API
- Role management endpoints
- Notification queue system
- Abandoned booking tracking
- Vendor/Agent management

### Phase 3: Frontend Updates
- Department-specific dashboards
- Notification center
- Role request interface
- Admin approval interface

### Phase 4: Workflow Automation
- Abandoned booking detection
- Automatic notifications
- Email/SMS follow-ups
- Assignment algorithms

## Next Steps
1. Review and approve specification
2. Update database models
3. Create migration scripts
4. Implement backend APIs
5. Update frontend dashboards
6. Test workflows
7. Deploy and train users
