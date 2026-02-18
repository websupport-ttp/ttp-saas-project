# Staff Clearance System Documentation

## Overview
The staff clearance system introduces a hierarchical access control mechanism for staff members within the travel booking platform. This system allows administrators to assign different clearance levels to staff members, controlling their access to various features and information.

## Staff Clearance Levels

### Tier 1 - Drivers and Office Assistants
- **Clearance Level**: 1
- **Description**: Basic access level for operational staff
- **Typical Roles**: Drivers, Office Assistants, Support Staff
- **Access**: Limited to basic operational tasks

### Tier 2 - Ticketing Officers
- **Clearance Level**: 2
- **Description**: Booking and customer management access
- **Typical Roles**: Ticketing Officers, Customer Service Representatives
- **Access**: Booking management, customer information, basic reporting

### Tier 3 - Supervisors
- **Clearance Level**: 3
- **Description**: Team oversight and reporting access
- **Typical Roles**: Team Supervisors, Department Leads
- **Access**: Team management, advanced reporting, operational oversight

### Tier 4 - Management
- **Clearance Level**: 4
- **Description**: Full operational access
- **Typical Roles**: Department Managers, Operations Managers
- **Access**: Full operational control, analytics, staff management

## Database Schema Changes

### User Model Updates
The following fields have been added to the User model:

```javascript
{
  staffClearanceLevel: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: null,
    // Required when role is 'Staff', null otherwise
  },
  staffDepartment: {
    type: String,
    trim: true,
    default: null,
  },
  staffEmployeeId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    default: null,
  }
}
```

### Indexes
New indexes have been added for performance:
- `staffClearanceLevel`: For filtering staff by clearance level
- `staffEmployeeId`: For quick employee ID lookups
- Compound index: `role + staffClearanceLevel`: For staff queries

## API Endpoints

### 1. Make User Staff
**Endpoint**: `PUT /api/v1/users/:id/make-staff`
**Access**: Admin only
**Description**: Convert a regular user to a staff member with specified clearance level

**Request Body**:
```json
{
  "clearanceLevel": 2,
  "department": "Ticketing",
  "employeeId": "EMP001"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User successfully made staff member",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "Staff",
      "staffClearanceLevel": 2,
      "clearanceDescription": "Tier 2 - Ticketing Officers",
      "staffDepartment": "Ticketing",
      "staffEmployeeId": "EMP001"
    }
  }
}
```

### 2. Update Staff Clearance
**Endpoint**: `PUT /api/v1/users/:id/clearance`
**Access**: Admin only
**Description**: Update clearance level and details for existing staff member

**Request Body**:
```json
{
  "clearanceLevel": 3,
  "department": "Operations",
  "employeeId": "EMP002"
}
```

### 3. Get All Staff
**Endpoint**: `GET /api/v1/users/staff`
**Access**: Admin only
**Description**: Retrieve all staff members with optional filtering

**Query Parameters**:
- `clearanceLevel` (optional): Filter by clearance level (1-4)
- `department` (optional): Filter by department name

**Example**: `GET /api/v1/users/staff?clearanceLevel=2&department=Ticketing`

### 4. Update User Role
**Endpoint**: `PUT /api/v1/users/:id/role`
**Access**: Admin only
**Description**: Change user role (automatically clears staff fields when changing from Staff to another role)

## Middleware Functions

### requireStaffClearance(minimumLevel)
Middleware to check if the authenticated user has the minimum required clearance level.

**Usage Example**:
```javascript
const { requireStaffClearance } = require('../middleware/authMiddleware');
const { StaffClearanceLevel } = require('../utils/constants');

// Require Tier 2 or higher
router.get('/bookings', 
  authenticateUser, 
  requireStaffClearance(StaffClearanceLevel.TIER_2), 
  getBookings
);

// Require Tier 3 or higher
router.get('/reports', 
  authenticateUser, 
  requireStaffClearance(StaffClearanceLevel.TIER_3), 
  getReports
);
```

## User Model Methods

### hasMinimumClearance(requiredLevel)
Check if user has minimum clearance level.

```javascript
const user = await User.findById(userId);
if (user.hasMinimumClearance(StaffClearanceLevel.TIER_2)) {
  // User has Tier 2 or higher clearance
}
```

### isStaff()
Check if user is a staff member.

```javascript
if (user.isStaff()) {
  // User is staff
}
```

### getClearanceDescription()
Get human-readable clearance level description.

```javascript
const description = user.getClearanceDescription();
// Returns: "Tier 2 - Ticketing Officers"
```

## Constants

### StaffClearanceLevel
```javascript
const StaffClearanceLevel = {
  TIER_1: 1, // Drivers and Office Assistants
  TIER_2: 2, // Ticketing Officers
  TIER_3: 3, // Supervisors
  TIER_4: 4, // Management
};
```

### StaffClearanceDescription
```javascript
const StaffClearanceDescription = {
  1: 'Tier 1 - Drivers and Office Assistants',
  2: 'Tier 2 - Ticketing Officers',
  3: 'Tier 3 - Supervisors',
  4: 'Tier 4 - Management',
};
```

## Security Features

1. **Validation**: Clearance level is validated on save
2. **Audit Logging**: All clearance checks and updates are logged
3. **Role Enforcement**: Staff-specific fields are automatically cleared when role changes
4. **Unique Employee IDs**: Employee IDs must be unique across all staff members
5. **Admin-Only Management**: Only admins can create staff or modify clearance levels

## Usage Examples

### Example 1: Create a Ticketing Officer
```javascript
// Admin makes user a ticketing officer
PUT /api/v1/users/507f1f77bcf86cd799439011/make-staff
{
  "clearanceLevel": 2,
  "department": "Ticketing",
  "employeeId": "TICK001"
}
```

### Example 2: Promote to Supervisor
```javascript
// Admin promotes ticketing officer to supervisor
PUT /api/v1/users/507f1f77bcf86cd799439011/clearance
{
  "clearanceLevel": 3,
  "department": "Operations"
}
```

### Example 3: Protect Route with Clearance
```javascript
// Only Tier 3 (Supervisors) and above can access
router.get('/team-reports', 
  authenticateUser,
  requireStaffClearance(StaffClearanceLevel.TIER_3),
  getTeamReports
);
```

### Example 4: Get All Supervisors
```javascript
// Get all Tier 3 staff members
GET /api/v1/users/staff?clearanceLevel=3
```

## Migration Notes

For existing staff members in the database:
1. Run a migration script to set appropriate clearance levels
2. Assign employee IDs if needed
3. Update any existing role-based checks to include clearance checks where appropriate

## Testing

Test the staff clearance system with:
```bash
# Test making a user staff
curl -X PUT http://localhost:8080/api/v1/users/:id/make-staff \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"clearanceLevel": 2, "department": "Ticketing", "employeeId": "EMP001"}'

# Test clearance-protected route
curl -X GET http://localhost:8080/api/v1/protected-route \
  -H "Authorization: Bearer <staff-token>"
```

## Future Enhancements

1. **Permissions Matrix**: Define specific permissions for each clearance level
2. **Department-Based Access**: Add department-specific access controls
3. **Temporary Clearance**: Allow temporary clearance elevation
4. **Clearance History**: Track clearance level changes over time
5. **Self-Service Portal**: Staff portal to view their clearance and permissions
