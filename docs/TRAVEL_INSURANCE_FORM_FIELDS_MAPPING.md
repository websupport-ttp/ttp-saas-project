# Travel Insurance Form Fields Mapping

## Current Flow vs Required Flow

### ✅ Current Implementation (What You Have)

**Page 1: Search/Service Tab** (`/travel-insurance`)
- Destination (Country)
- Coverage Start Date
- Coverage End Date
- Number of Travelers

**Page 2: Traveler Information** (`/travel-insurance/book`)
- Email
- Phone Number
- Date of Birth

### 🎯 Required Implementation (What API Needs)

## Complete Field Mapping

---

## STEP 1: Service Tab (Search Form)
**Page:** `/travel-insurance`

### Fields to Collect:

| Field | Current | Required | API Field | Notes |
|-------|---------|----------|-----------|-------|
| Destination | ✅ Yes | ✅ Yes | `CountryId` | Dropdown from GetCountry API |
| Coverage Start | ✅ Yes | ✅ Yes | `CoverBegins` | Format: DD-MMM-YYYY |
| Coverage End | ✅ Yes | ✅ Yes | `CoverEnds` | Format: DD-MMM-YYYY |
| Number of Travelers | ✅ Yes | ✅ Yes | `NoOfPeople` | 1 for individual, 2 for family |
| Number of Children | ❌ No | ⚠️ Optional | `NoOfChildren` | 0 for individual, 1-6 for family |
| Purpose of Travel | ❌ No | ⚠️ Optional | `PurposeOfTravel` | "Leisure" or "Business" (default: Leisure) |
| Round Trip | ❌ No | ⚠️ Optional | `IsRoundTrip` | true/false (default: false) |

**What to Add:**
- Number of Children field (if family booking)
- Purpose of Travel dropdown (optional, can default to "Leisure")
- Round Trip checkbox (optional, can default to false)

---

## STEP 2: Traveler Information Page
**Page:** `/travel-insurance/book`

### Current Fields (Minimal):
- Email ✅
- Phone Number ✅
- Date of Birth ✅

### Additional Fields Needed for Quote API:

| Field | Current | Required | API Field | Notes |
|-------|---------|----------|-----------|-------|
| **Contact Info** | | | | |
| Email | ✅ Yes | ✅ Yes | `Email` | Already collected |
| Phone | ✅ Yes | ✅ Yes | `Telephone` | Already collected, format: +234XXXXXXXXXX |
| **Traveler Info** | | | | |
| Date of Birth | ✅ Yes | ✅ Yes | `DateOfBirth` | Already collected, format: DD-MMM-YYYY |

**✅ You already have all fields needed for Quote API!**

---

## STEP 3: Get Quote & Display Results
**Action:** Call Quote API with collected data

### Quote Request Payload:
```json
{
  "DateOfBirth": "14-Nov-2000",           // From Traveler Info
  "Email": "customer@example.com",         // From Traveler Info
  "Telephone": "+2348034635116",           // From Traveler Info
  "CoverBegins": "14-Mar-2026",            // From Service Tab
  "CoverEnds": "30-Mar-2026",              // From Service Tab
  "CountryId": 110,                        // From Service Tab
  "PurposeOfTravel": "Leisure",            // From Service Tab (or default)
  "TravelPlanId": 1,                       // From GetTravelPlan API
  "BookingTypeId": 1,                      // 1=Individual, 2=Family
  "IsRoundTrip": false,                    // From Service Tab (or default)
  "NoOfPeople": 1,                         // From Service Tab
  "NoOfChildren": 0,                       // From Service Tab (or default 0)
  "IsMultiTrip": false                     // Auto-calculate: duration > 92 days
}
```

### Quote Response (Display to User):
```json
{
  "QuoteRequestId": 1077,                  // ⭐ SAVE THIS - needed for purchase!
  "ProductVariantId": "NGN002FCG-Worldwide",
  "Amount": 7467,                          // Display this price
  "AllianzPrice": "7467",
  "// ... other fields"
}
```

**✅ Display the quote with Amount and let user proceed to purchase**

---

## STEP 4: Purchase Form (Additional Fields)
**Page:** `/travel-insurance/book` (after quote is displayed)

### Fields Needed for Purchase API:

| Field | Current | Required | API Field | Source |
|-------|---------|----------|-----------|--------|
| **Already Have** | | | | |
| Quote ID | ✅ Yes | ✅ Yes | `QuoteId` | From quote response |
| Email | ✅ Yes | ✅ Yes | `Email` | Already collected |
| Phone | ✅ Yes | ✅ Yes | `Telephone` | Already collected |
| Date of Birth | ✅ Yes | ✅ Yes | `DateOfBirth` | Already collected |
| **Need to Add** | | | | |
| Title | ❌ No | ✅ Yes | `TitleId` | Dropdown from GetTitle API |
| First Name | ❌ No | ✅ Yes | `FirstName` | Text input |
| Middle Name | ❌ No | ⚠️ Optional | `MiddleName` | Text input |
| Surname | ❌ No | ✅ Yes | `Surname` | Text input |
| Gender | ❌ No | ✅ Yes | `GenderId` | Dropdown from GetGender API |
| State | ❌ No | ✅ Yes | `StateId` | Dropdown from GetState API |
| Address | ❌ No | ✅ Yes | `Address` | Text input |
| Zip Code | ❌ No | ✅ Yes | `ZipCode` | Text input |
| Nationality | ❌ No | ✅ Yes | `Nationality` | Text input (default: "Nigeria") |
| Passport Number | ❌ No | ✅ Yes | `PassportNo` | Text input |
| Occupation | ❌ No | ✅ Yes | `Occupation` | Text input |
| Marital Status | ❌ No | ✅ Yes | `MaritalStatusId` | Dropdown from GetMaritalStatus API |
| Medical Condition | ❌ No | ⚠️ Optional | `PreExistingMedicalCondition` | Checkbox |
| Medical Details | ❌ No | ⚠️ Optional | `MedicalCondition` | Text input (if checkbox is true) |
| **Next of Kin** | | | | |
| NOK Full Name | ❌ No | ✅ Yes | `NextOfKin.FullName` | Text input |
| NOK Address | ❌ No | ✅ Yes | `NextOfKin.Address` | Text input |
| NOK Relationship | ❌ No | ✅ Yes | `NextOfKin.Relationship` | Text input |
| NOK Phone | ❌ No | ✅ Yes | `NextOfKin.Telephone` | Text input |

---

## Recommended User Flow

### Flow Option 1: Two-Step (Recommended)

```
Step 1: Service Tab
├─ Destination
├─ Coverage Dates
├─ Number of Travelers
├─ Number of Children (if > 1 traveler)
└─ [Get Quotes Button]
    ↓
Step 2: Traveler Information (Minimal for Quote)
├─ Email
├─ Phone
├─ Date of Birth
└─ [Get Quote Button]
    ↓
Step 3: Display Quote Results
├─ Show Amount
├─ Show Coverage Details
└─ [Select Plan Button]
    ↓
Step 4: Complete Booking Form (Full Details)
├─ Personal Details (Name, Gender, Title, etc.)
├─ Address Details
├─ Passport & Occupation
├─ Marital Status
├─ Medical Condition (optional)
├─ Next of Kin Details
└─ [Purchase Button] → Payment
```

### Flow Option 2: Three-Step (Better UX)

```
Step 1: Service Tab (Search)
├─ Destination
├─ Coverage Dates
├─ Number of Travelers
└─ [Search Button]
    ↓
Step 2: Quick Quote (Minimal Info)
├─ Email
├─ Phone
├─ Date of Birth
└─ [Get Quotes Button]
    ↓
Step 3: Display Multiple Quotes
├─ Show different plans with prices
└─ [Select Plan Button]
    ↓
Step 4: Complete Booking (Full Form)
├─ Review Quote Summary
├─ Personal Details
├─ Address & Passport
├─ Next of Kin
└─ [Purchase Button] → Payment
```

---

## Implementation Checklist

### ✅ Already Implemented
- [x] Service tab with destination, dates, travelers
- [x] Traveler info page with email, phone, DOB
- [x] Quote API integration
- [x] Display quote results

### ⚠️ Need to Add (Service Tab)
- [ ] Number of Children field (show if travelers > 1)
- [ ] Purpose of Travel dropdown (optional, can default)
- [ ] Round Trip checkbox (optional, can default)

### ❌ Need to Add (Booking Form)
- [ ] Title dropdown (GetTitle API)
- [ ] First Name input
- [ ] Middle Name input (optional)
- [ ] Surname input
- [ ] Gender dropdown (GetGender API)
- [ ] State dropdown (GetState API)
- [ ] Address input
- [ ] Zip Code input
- [ ] Nationality input (default: "Nigeria")
- [ ] Passport Number input
- [ ] Occupation input
- [ ] Marital Status dropdown (GetMaritalStatus API)
- [ ] Pre-existing Medical Condition checkbox
- [ ] Medical Condition details (if checkbox checked)
- [ ] Next of Kin section:
  - [ ] Full Name input
  - [ ] Address input
  - [ ] Relationship input
  - [ ] Phone input

---

## Form Validation Rules

### Service Tab
- Destination: Required
- Coverage Start: Required, must be today or future
- Coverage End: Required, must be after start date
- Number of Travelers: Required, 1-10
- Number of Children: Optional, 0-6 (if family)

### Traveler Info (Quote)
- Email: Required, valid email format
- Phone: Required, valid phone number
- Date of Birth: Required, must be 18+ years old

### Booking Form (Purchase)
- All fields marked "Required" must be filled
- Passport Number: Valid format (alphanumeric)
- Zip Code: Valid Nigerian zip code
- Medical Condition: Required if checkbox is checked
- Next of Kin Phone: Valid phone number format

---

## API Endpoints to Call

### On Page Load
1. `GET /api/lookup/GetCountry` - For destination dropdown
2. `GET /api/lookup/GetGender` - For gender dropdown
3. `GET /api/lookup/GetTitle` - For title dropdown
4. `GET /api/lookup/GetState` - For state dropdown
5. `GET /api/lookup/GetMaritalStatus` - For marital status dropdown
6. `GET /api/lookup/GetBookingType` - For booking type
7. `GET /api/lookup/GetTravelPlan?countryId={id}` - After country selected

### On Form Submit
1. `POST /api/Quote` - Get quote with minimal info
2. `POST /api/IndividualBooking` - Purchase with full details

---

## Summary

### Current State
You have a **minimal quote flow** that collects:
- Destination, dates, travelers (Service Tab)
- Email, phone, DOB (Traveler Info)

### What's Missing
You need to add a **complete booking form** after the quote is displayed that collects:
- Personal details (name, gender, title)
- Address details (state, address, zip)
- Passport & occupation
- Marital status
- Medical condition (optional)
- Next of kin details

### Recommended Approach
1. Keep current flow for getting quotes (it works!)
2. After user selects a plan, show a comprehensive booking form
3. Collect all required fields for purchase API
4. Submit purchase with complete data
5. Redirect to payment

This gives users a quick quote experience, then collects full details only when they're ready to purchase.
