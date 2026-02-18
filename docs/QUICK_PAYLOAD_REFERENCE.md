# Quick Payload Reference - Travel Insurance API

## 🚀 Quick Copy-Paste Payloads

### 1. Individual Quote Request
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

### 2. Family Quote Request
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

### 3. Individual Purchase Request
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

## 📝 Field Quick Reference

| Field | Type | Format | Example | Required |
|-------|------|--------|---------|----------|
| DateOfBirth | string | DD-MMM-YYYY | "14-Nov-2000" | ✅ |
| Email | string | email | "user@example.com" | ✅ |
| Telephone | string | phone | "08034635116" | ✅ |
| CoverBegins | string | DD-MMM-YYYY | "14-Mar-2026" | ✅ |
| CoverEnds | string | DD-MMM-YYYY | "30-Mar-2026" | ✅ |
| CountryId | number | integer | 110 | ✅ |
| PurposeOfTravel | string | text | "Leisure" or "Business" | ✅ |
| TravelPlanId | number | integer | 1 | ✅ |
| BookingTypeId | number | integer | 1 or 2 | ✅ |
| IsRoundTrip | boolean | true/false | false | ✅ |
| NoOfPeople | number | integer | 1 or 2 | ✅ |
| NoOfChildren | number | integer | 0-6 | ✅ |
| IsMultiTrip | boolean | true/false | false | ✅ |

## 🔢 Common ID Values

### Booking Types
- `1` = Individual
- `2` = Family

### Gender
- `1` = Male
- `2` = Female

### Common Titles
- `4` = Dr
- `5` = Mr
- `6` = Mrs
- `7` = Ms

### Lagos State
- `25` = Lagos State

### Marital Status
- `1` = Single
- `2` = Married
- `3` = Divorced
- `4` = Widowed
- `5` = Separated

## ⚠️ Critical Rules

1. **Date Format**: Always use `DD-MMM-YYYY` (e.g., "14-Nov-2000")
2. **Multi-Trip**: Set to `true` if duration > 92 days
3. **Family Booking**: 
   - `NoOfPeople` must be 2
   - `NoOfChildren` must be 1-6
   - `BookingTypeId` must be 2
4. **Quote ID**: Save `QuoteRequestId` from quote response, use as `QuoteId` in purchase

## 🔗 API Endpoints

| Action | Method | Endpoint |
|--------|--------|----------|
| Get Countries | GET | `/api/lookup/GetCountry` |
| Get Travel Plans | GET | `/api/lookup/GetTravelPlan?countryId={id}` |
| Get Quote | POST | `/api/Quote` |
| Purchase Individual | POST | `/api/IndividualBooking` |
| Purchase Family | POST | `/api/FamilyBooking` |

## 📱 Your Backend Endpoints

| Action | Method | Your Endpoint |
|--------|--------|---------------|
| Get Countries | GET | `/api/v1/products/travel-insurance/lookup/countries` |
| Get Travel Plans | GET | `/api/v1/products/travel-insurance/lookup/travel-plans?countryId={id}` |
| Get Quote | POST | `/api/v1/products/travel-insurance/quote` |
| Purchase Individual | POST | `/api/v1/products/travel-insurance/purchase/individual` |
| Purchase Family | POST | `/api/v1/products/travel-insurance/purchase/family` |

