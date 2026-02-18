# Travel Insurance User Flow - Complete Payload Guide

This document shows the exact payloads needed for each step of the travel insurance booking flow.

---

## 🔄 Complete User Flow

```
1. Load Form Data (Lookups)
   ↓
2. User Fills Form
   ↓
3. Get Quote
   ↓
4. User Reviews Quote
   ↓
5. Purchase Policy
   ↓
6. Receive Contract Number
```

---

## Step 1: Load Form Data (Lookup Endpoints)

### 1.1 Get Countries List

**Endpoint:** `GET /api/lookup/GetCountry`

**Request:**
```http
GET https://web-app.sanlamallianz.com.ng/Travel/api/lookup/GetCountry
```

**No payload needed** - This is a GET request

**Response Sample:**
```json
[
  {
    "Region": {
      "RegionId": 3,
      "Name": "Others",
      "Description": "Worldwide excluding USA, Canada & Japan"
    },
    "CountryId": 110,
    "Name": "Afghanistan",
    "AlphaCode": "AF",
    "RegionId": 3
  },
  {
    "CountryId": 231,
    "Name": "United Kingdom",
    "AlphaCode": "GB",
    "RegionId": 1
  }
  // ... 201 countries total
]
```

**Usage:** Display in destination dropdown

---

### 1.2 Get Travel Plans (Based on Selected Country)

**Endpoint:** `GET /api/lookup/GetTravelPlan?countryId={id}`

**Request:**
```http
GET https://web-app.sanlamallianz.com.ng/Travel/api/lookup/GetTravelPlan?countryId=110
```

**Query Parameters:**
- `countryId` (required): The CountryId from the countries list

**Response Sample:**
```json
[
  {
    "TravelPlanId": 1,
    "Name": "Schengen Area"
  },
  {
    "TravelPlanId": 2,
    "Name": "Worldwide Area 1 & 2"
  }
]
```

**Usage:** Display travel plan options based on destination

---

### 1.3 Get Booking Types

**Endpoint:** `GET /api/lookup/GetBookingType`

**Request:**
```http
GET https://web-app.sanlamallianz.com.ng/Travel/api/lookup/GetBookingType
```

**Response Sample:**
```json
[
  {
    "BookingTypeId": 1,
    "Name": "Individual"
  },
  {
    "BookingTypeId": 2,
    "Name": "Family"
  }
]
```

**Usage:** Let user choose Individual or Family coverage

---

### 1.4 Get Gender Options

**Endpoint:** `GET /api/lookup/GetGender`

**Response Sample:**
```json
[
  {
    "GenderId": 1,
    "Name": "Male"
  },
  {
    "GenderId": 2,
    "Name": "Female"
  }
]
```

---

### 1.5 Get Title Options

**Endpoint:** `GET /api/lookup/GetTitle`

**Response Sample:**
```json
[
  {
    "TitleId": 1,
    "Name": "Alhaja"
  },
  {
    "TitleId": 2,
    "Name": "Alhaji"
  },
  {
    "TitleId": 3,
    "Name": "Chief"
  },
  {
    "TitleId": 4,
    "Name": "Dr"
  },
  {
    "TitleId": 5,
    "Name": "Mr"
  },
  {
    "TitleId": 6,
    "Name": "Mrs"
  },
  {
    "TitleId": 7,
    "Name": "Ms"
  }
  // ... 31 titles total
]
```

---

### 1.6 Get Nigerian States

**Endpoint:** `GET /api/lookup/GetState`

**Response Sample:**
```json
[
  {
    "StateId": 1,
    "Name": "Abia State"
  },
  {
    "StateId": 25,
    "Name": "Lagos State"
  }
  // ... 37 states total
]
```

---

### 1.7 Get Marital Status Options

**Endpoint:** `GET /api/lookup/GetMaritalStatus`

**Response Sample:**
```json
[
  {
    "MaritalStatusId": 1,
    "Name": "Single"
  },
  {
    "MaritalStatusId": 2,
    "Name": "Married"
  },
  {
    "MaritalStatusId": 3,
    "Name": "Divorced"
  },
  {
    "MaritalStatusId": 4,
    "Name": "Widowed"
  },
  {
    "MaritalStatusId": 5,
    "Name": "Separated"
  }
]
```

---

## Step 2: Get Quote

### 2.1 Individual Quote

**Endpoint:** `POST /api/Quote`

**Request Payload:**
```json
{
  "DateOfBirth": "14-Nov-2000",
  "Email": "customer@example.com",
  "Telephone": "08034635116",
  "CoverBegins": "14-Mar-2026",
  "CoverEnds": "30-Mar-2026",
  "CountryId": 110,
  "PurposeOfTravel": "Leisure",
  "TravelPlanId": 1,
  "BookingTypeId": 1,
  "IsRoundTrip": false,
  "NoOfPeople": 1,
  "NoOfChildren": 0,
  "IsMultiTrip": false
}
```

**Field Descriptions:**
- `DateOfBirth`: Format **DD-MMM-YYYY** (e.g., "14-Nov-2000")
- `Email`: Customer email
- `Telephone`: Nigerian phone number
- `CoverBegins`: Start date in **DD-MMM-YYYY** format
- `CoverEnds`: End date in **DD-MMM-YYYY** format
- `CountryId`: From GetCountry lookup
- `PurposeOfTravel`: "Leisure" or "Business"
- `TravelPlanId`: From GetTravelPlan lookup
- `BookingTypeId`: 1 for Individual, 2 for Family
- `IsRoundTrip`: true/false
- `NoOfPeople`: Number of adults (1 for individual)
- `NoOfChildren`: Number of children (0 for individual)
- `IsMultiTrip`: true if duration > 92 days

**Response:**
```json
{
  "QuoteRequestId": 1077,
  "ProductVariantId": "NGN002FCG-Worldwide",
  "DateOfBirth": "2000-11-14T00:00:00",
  "Email": "customer@example.com",
  "Telephone": "08034635116",
  "CoverBegins": "2026-03-14T00:00:00",
  "CoverEnds": "2026-03-30T00:00:00",
  "CountryId": 110,
  "PurposeOfTravel": "Leisure",
  "TravelPlanId": 1,
  "BookingTypeId": 1,
  "IsRoundTrip": false,
  "IsLifeInsuranceIncluded": false,
  "PreExistingMedicalCondition": false,
  "MedicalCondition": null,
  "NoOfPeople": 1,
  "NoOfChildren": 0,
  "IsMultiTrip": false,
  "Amount": 7467,
  "AllianzPrice": "7467",
  "TravelPlan": null,
  "BookingType": null,
  "Country": null
}
```

**Important:** Save the `QuoteRequestId` - you'll need it for purchase!

---

### 2.2 Family Quote

**Endpoint:** `POST /api/Quote`

**Request Payload:**
```json
{
  "DateOfBirth": "14-Nov-1985",
  "Email": "family@example.com",
  "Telephone": "08034635116",
  "CoverBegins": "14-Mar-2026",
  "CoverEnds": "30-Mar-2026",
  "CountryId": 4,
  "PurposeOfTravel": "Leisure",
  "TravelPlanId": 1,
  "BookingTypeId": 2,
  "IsRoundTrip": false,
  "NoOfPeople": 2,
  "NoOfChildren": 2,
  "IsMultiTrip": false
}
```

**Family Requirements:**
- `BookingTypeId`: Must be 2 (Family)
- `NoOfPeople`: Must be 2 (two adults)
- `NoOfChildren`: Between 1-6 (children under 18)

**Response:**
```json
{
  "QuoteRequestId": 1078,
  "ProductVariantId": "VAS002FCGFAM",
  "Amount": 35259.00,
  "AllianzPrice": "30806",
  "NoOfPeople": 2,
  "NoOfChildren": 2,
  // ... other fields
}
```

---

## Step 3: Purchase Policy

### 3.1 Individual Purchase

**Endpoint:** `POST /api/IndividualBooking`

**Request Payload:**
```json
{
  "QuoteId": 1077,
  "Surname": "Doe",
  "MiddleName": "John",
  "FirstName": "Smith",
  "GenderId": 1,
  "TitleId": 5,
  "DateOfBirth": "14-Nov-1987",
  "Email": "customer@example.com",
  "Telephone": "08034635116",
  "StateId": 25,
  "Address": "15 Victoria Island Road, Lagos",
  "ZipCode": "100001",
  "Nationality": "Nigeria",
  "PassportNo": "A12345678",
  "IdentificationPath": null,
  "Occupation": "Software Developer",
  "MaritalStatusId": 2,
  "PreExistingMedicalCondition": false,
  "MedicalCondition": null,
  "NextOfKin": {
    "FullName": "Jane Doe",
    "Address": "Same as mine",
    "Relationship": "Spouse",
    "Telephone": "08034635117"
  }
}
```

**Field Descriptions:**
- `QuoteId`: The `QuoteRequestId` from the quote response
- `Surname`: Last name
- `MiddleName`: Middle name
- `FirstName`: First name
- `GenderId`: From GetGender lookup (1=Male, 2=Female)
- `TitleId`: From GetTitle lookup
- `DateOfBirth`: Format **DD-MMM-YYYY**
- `Email`: Customer email
- `Telephone`: Nigerian phone number
- `StateId`: From GetState lookup
- `Address`: Full address
- `ZipCode`: Postal code
- `Nationality`: Country name (usually "Nigeria")
- `PassportNo`: Passport number
- `IdentificationPath`: Optional - path to uploaded ID document
- `Occupation`: Job title
- `MaritalStatusId`: From GetMaritalStatus lookup
- `PreExistingMedicalCondition`: true/false
- `MedicalCondition`: Description if PreExistingMedicalCondition is true
- `NextOfKin`: Emergency contact details

**Response:**
```json
{
  "ContractNo": "AZNNG7000000134"
}
```

**Success!** The `ContractNo` is the policy number.

---

### 3.2 Family Purchase

**Endpoint:** `POST /api/FamilyBooking`

**Request Payload:** (Array of family members)
```json
[
  {
    "QuoteId": 1078,
    "Surname": "Doe",
    "MiddleName": "John",
    "FirstName": "Smith",
    "GenderId": 1,
    "TitleId": 5,
    "DateOfBirth": "14-Nov-1985",
    "Email": "john.doe@example.com",
    "Telephone": "08034635116",
    "StateId": 25,
    "Address": "15 Victoria Island Road, Lagos",
    "ZipCode": "100001",
    "Nationality": "Nigeria",
    "PassportNo": "A12345678",
    "IdentificationPath": null,
    "Occupation": "Software Developer",
    "MaritalStatusId": 2,
    "PreExistingMedicalCondition": false,
    "MedicalCondition": null,
    "NextOfKin": {
      "FullName": "Jane Doe",
      "Address": "Same as mine",
      "Relationship": "Spouse",
      "Telephone": "08034635117"
    }
  },
  {
    "QuoteId": 1078,
    "Surname": "Doe",
    "MiddleName": "Mary",
    "FirstName": "Jane",
    "GenderId": 2,
    "TitleId": 6,
    "DateOfBirth": "20-May-1987",
    "Email": "jane.doe@example.com",
    "Telephone": "08034635117",
    "StateId": 25,
    "Address": "15 Victoria Island Road, Lagos",
    "ZipCode": "100001",
    "Nationality": "Nigeria",
    "PassportNo": "A12345679",
    "IdentificationPath": null,
    "Occupation": "Teacher",
    "MaritalStatusId": 2,
    "PreExistingMedicalCondition": false,
    "MedicalCondition": null,
    "NextOfKin": {
      "FullName": "John Doe",
      "Address": "Same as mine",
      "Relationship": "Spouse",
      "Telephone": "08034635116"
    }
  },
  {
    "QuoteId": 1078,
    "Surname": "Doe",
    "MiddleName": "Michael",
    "FirstName": "Junior",
    "GenderId": 1,
    "TitleId": 5,
    "DateOfBirth": "10-Jan-2010",
    "Email": "john.doe@example.com",
    "Telephone": "08034635116",
    "StateId": 25,
    "Address": "15 Victoria Island Road, Lagos",
    "ZipCode": "100001",
    "Nationality": "Nigeria",
    "PassportNo": "A12345680",
    "IdentificationPath": null,
    "Occupation": "Student",
    "MaritalStatusId": 1,
    "PreExistingMedicalCondition": false,
    "MedicalCondition": null,
    "NextOfKin": {
      "FullName": "John Doe",
      "Address": "Same as mine",
      "Relationship": "Father",
      "Telephone": "08034635116"
    }
  },
  {
    "QuoteId": 1078,
    "Surname": "Doe",
    "MiddleName": "Sarah",
    "FirstName": "Princess",
    "GenderId": 2,
    "TitleId": 7,
    "DateOfBirth": "15-Aug-2012",
    "Email": "john.doe@example.com",
    "Telephone": "08034635116",
    "StateId": 25,
    "Address": "15 Victoria Island Road, Lagos",
    "ZipCode": "100001",
    "Nationality": "Nigeria",
    "PassportNo": "A12345681",
    "IdentificationPath": null,
    "Occupation": "Student",
    "MaritalStatusId": 1,
    "PreExistingMedicalCondition": false,
    "MedicalCondition": null,
    "NextOfKin": {
      "FullName": "Jane Doe",
      "Address": "Same as mine",
      "Relationship": "Mother",
      "Telephone": "08034635117"
    }
  }
]
```

**Family Requirements:**
- Array must contain 2 adults + 1-6 children
- All members must use the same `QuoteId`
- Children must be under 18 years old

**Response:**
```json
{
  "ContractNo": "AZNNG7000000135"
}
```

---

## 📋 Complete Frontend Flow Example

### Step-by-Step Implementation

```javascript
// 1. Load form data on page load
async function loadFormData() {
  const countries = await fetch('/api/v1/products/travel-insurance/lookup/countries');
  const genders = await fetch('/api/v1/products/travel-insurance/lookup/genders');
  const titles = await fetch('/api/v1/products/travel-insurance/lookup/titles');
  const states = await fetch('/api/v1/products/travel-insurance/lookup/states');
  const maritalStatuses = await fetch('/api/v1/products/travel-insurance/lookup/marital-status');
  const bookingTypes = await fetch('/api/v1/products/travel-insurance/lookup/booking-types');
  
  // Populate dropdowns
  populateDropdown('country', countries);
  populateDropdown('gender', genders);
  // ... etc
}

// 2. When user selects a country, load travel plans
async function onCountryChange(countryId) {
  const travelPlans = await fetch(
    `/api/v1/products/travel-insurance/lookup/travel-plans?countryId=${countryId}`
  );
  populateDropdown('travelPlan', travelPlans);
}

// 3. When user clicks "Get Quote"
async function getQuote(formData) {
  const quotePayload = {
    DateOfBirth: formatDate(formData.dateOfBirth), // Convert to DD-MMM-YYYY
    Email: formData.email,
    Telephone: formData.phone,
    CoverBegins: formatDate(formData.startDate),
    CoverEnds: formatDate(formData.endDate),
    CountryId: parseInt(formData.countryId),
    PurposeOfTravel: formData.purpose,
    TravelPlanId: parseInt(formData.travelPlanId),
    BookingTypeId: parseInt(formData.bookingTypeId),
    IsRoundTrip: formData.isRoundTrip,
    NoOfPeople: parseInt(formData.adults),
    NoOfChildren: parseInt(formData.children),
    IsMultiTrip: calculateDays(formData.startDate, formData.endDate) > 92
  };
  
  const response = await fetch('/api/v1/products/travel-insurance/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quotePayload)
  });
  
  const quote = await response.json();
  
  // Display quote to user
  displayQuote(quote);
  
  // Save QuoteRequestId for purchase
  sessionStorage.setItem('quoteId', quote.QuoteRequestId);
}

// 4. When user clicks "Purchase"
async function purchasePolicy(customerDetails) {
  const quoteId = sessionStorage.getItem('quoteId');
  const bookingType = sessionStorage.getItem('bookingType');
  
  if (bookingType === 'individual') {
    const purchasePayload = {
      QuoteId: parseInt(quoteId),
      Surname: customerDetails.surname,
      MiddleName: customerDetails.middleName,
      FirstName: customerDetails.firstName,
      GenderId: parseInt(customerDetails.genderId),
      TitleId: parseInt(customerDetails.titleId),
      DateOfBirth: formatDate(customerDetails.dateOfBirth),
      Email: customerDetails.email,
      Telephone: customerDetails.phone,
      StateId: parseInt(customerDetails.stateId),
      Address: customerDetails.address,
      ZipCode: customerDetails.zipCode,
      Nationality: customerDetails.nationality,
      PassportNo: customerDetails.passportNo,
      IdentificationPath: null,
      Occupation: customerDetails.occupation,
      MaritalStatusId: parseInt(customerDetails.maritalStatusId),
      PreExistingMedicalCondition: customerDetails.hasMedicalCondition,
      MedicalCondition: customerDetails.medicalCondition || null,
      NextOfKin: {
        FullName: customerDetails.nextOfKinName,
        Address: customerDetails.nextOfKinAddress,
        Relationship: customerDetails.nextOfKinRelationship,
        Telephone: customerDetails.nextOfKinPhone
      }
    };
    
    const response = await fetch('/api/v1/products/travel-insurance/purchase/individual', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(purchasePayload)
    });
    
    const result = await response.json();
    
    // Show success with contract number
    showSuccess(`Policy purchased! Contract No: ${result.ContractNo}`);
  } else {
    // Family purchase - build array of family members
    const familyMembers = buildFamilyMembersArray(customerDetails, quoteId);
    
    const response = await fetch('/api/v1/products/travel-insurance/purchase/family', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(familyMembers)
    });
    
    const result = await response.json();
    showSuccess(`Family policy purchased! Contract No: ${result.ContractNo}`);
  }
}

// Helper: Format date to DD-MMM-YYYY
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
```

---

## ⚠️ Important Notes

### Date Format
**CRITICAL:** All dates must be in **DD-MMM-YYYY** format:
- ✅ Correct: `"14-Nov-2000"`
- ❌ Wrong: `"2000-11-14"`
- ❌ Wrong: `"11/14/2000"`

### Multi-Trip Calculation
- If trip duration > 92 days, set `IsMultiTrip: true`
- Otherwise, set `IsMultiTrip: false`

### Family Booking Rules
- Must have exactly 2 adults (`NoOfPeople: 2`)
- Must have 1-6 children (`NoOfChildren: 1-6`)
- Children must be under 18 years old
- All family members use the same `QuoteId`

### Quote ID
- Save the `QuoteRequestId` from quote response
- Use it as `QuoteId` in purchase request
- Quote may expire after some time

### Authentication
- Lookup endpoints: No auth required ✅
- Quote endpoint: Requires Bearer token ⚠️
- Purchase endpoints: Requires Bearer token ⚠️

---

## 🧪 Testing Checklist

- [ ] Load all lookup data successfully
- [ ] Select country and load travel plans
- [ ] Generate individual quote
- [ ] Generate family quote
- [ ] Verify quote amount is displayed
- [ ] Save QuoteRequestId correctly
- [ ] Purchase individual policy
- [ ] Purchase family policy
- [ ] Receive contract number
- [ ] Display success message

---

## 📞 Support

If you encounter errors:
1. Check date format (DD-MMM-YYYY)
2. Verify all IDs are from lookup endpoints
3. Ensure QuoteId matches the quote response
4. Check authentication token is valid
5. Review API error messages in response

