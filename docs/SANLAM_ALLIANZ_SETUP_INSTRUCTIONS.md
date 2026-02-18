# SanlamAllianz API Integration - Setup Instructions

## Current Status

The SanlamAllianz Travel Insurance API integration has been configured with the correct API structure based on the official documentation. However, **actual API credentials are still needed** to complete the integration.

## What Has Been Done

1. ✅ Updated `backend/.env` with correct base URLs:
   - `SANLAM_ALLIANZ_TRAVEL_BASE_URL=https://api.sanlam-allianz.com.ng/Travel`
   - `SANLAM_ALLIANZ_INSTANT_PLAN_BASE_URL=https://api.sanlam-allianz.com.ng/Travel`
   - `SANLAM_ALLIANZ_AUTH_BASE_URL=https://api.sanlam-allianz.com.ng/Travel`

2. ✅ Updated `backend/v1/services/allianzService.js` to match API documentation:
   - Authentication endpoint: `/token` (OAuth2 format)
   - Authentication method: `application/x-www-form-urlencoded`
   - Token format: OAuth2 `access_token` with `expires_in`

3. ✅ Created comprehensive test script: `backend/test-sanlam-allianz-integration.js`

4. ✅ Integrated with controllers: `backend/v1/controllers/productController.js`

## What Still Needs to Be Done

### 1. Obtain API Credentials

The documentation states: **"An authentication token will be used to access any of the services provided in this document by sending a post request to BaseUrl/token"**

However, the actual username and password credentials are not included in the documentation. You need to:

- Contact SanlamAllianz to obtain:
  - API Username
  - API Password
  - Confirm the base URL is correct
  - Verify if this is a test/sandbox environment or production

### 2. Update Environment Variables

Once you have the credentials, update `backend/.env`:

```env
# Replace these placeholder values with actual credentials
SANLAM_ALLIANZ_API_USERNAME=your_actual_username_here
SANLAM_ALLIANZ_API_PASSWORD=your_actual_password_here
```

### 3. Test the Integration

Run the test script to verify everything works:

```bash
cd backend
node test-sanlam-allianz-integration.js
```

This will test:
- ✓ Authentication
- ✓ Lookup endpoints (Countries, Gender, Title, States, etc.)
- ✓ Travel Plan lookup
- ✓ Individual quote generation
- ✓ Family quote generation
- ✓ Individual purchase (commented out to avoid creating real policies)

### 4. Test Through Your Application

Once the test script passes, test through your actual application endpoints:

1. **Get Countries**: `GET /api/v1/products/travel-insurance/lookup/countries`
2. **Get Quote**: `POST /api/v1/products/travel-insurance/quote`
3. **Purchase Individual**: `POST /api/v1/products/travel-insurance/purchase/individual`
4. **Purchase Family**: `POST /api/v1/products/travel-insurance/purchase/family`

## API Documentation Summary

### Authentication
- **Endpoint**: `POST {baseUrl}/token`
- **Method**: Form-urlencoded
- **Parameters**:
  - `username`: Your API username
  - `password`: Your API password
  - `grant_type`: "password"
- **Response**: OAuth2 token with `access_token` and `expires_in`

### Lookup Endpoints
- **Countries**: `GET {baseUrl}/api/lookup/GetCountry`
- **Gender**: `GET {baseUrl}/api/lookup/GetGender`
- **Title**: `GET {baseUrl}/api/lookup/GetTitle`
- **States**: `GET {baseUrl}/api/lookup/GetState`
- **Marital Status**: `GET {baseUrl}/api/lookup/GetMaritalStatus`
- **Booking Type**: `GET {baseUrl}/api/lookup/GetBookingType`
- **Travel Plan**: `GET {baseUrl}/api/lookup/GetTravelPlan?countryId={id}`

### Quote Endpoint
- **Endpoint**: `POST {baseUrl}/api/Quote`
- **Request Body**: See documentation for full structure
- **Response**: Quote with `QuoteRequestId`, `Amount`, `ProductVariantId`

### Purchase Endpoints
- **Individual**: `POST {baseUrl}/api/IndividualBooking`
- **Family**: `POST {baseUrl}/api/FamilyBooking`
- **Response**: `{ "ContractNo": "AZNNG7000000134" }`

## Date Format Requirements

All dates must be formatted as: **DD-MMM-YYYY**
- Example: `14-Nov-2000`
- Day: 2 digits
- Month: 3 characters
- Year: 4 digits

## Important Notes

1. **Test Environment**: The documentation mentions "You would be advised a separate encryption key when going live" - this suggests the current setup is for testing.

2. **Encryption Key**: A test RSA public key is provided in the documentation but not currently used in the integration. Verify with SanlamAllianz if encryption is required.

3. **Fallback Behavior**: The current implementation tries the real API first, then falls back to mock data if the API fails. Once credentials are configured, you should see "Successfully fetched ... from Allianz API" in the logs instead of "Using fallback mock data".

4. **Error Handling**: The service includes comprehensive error handling, retry logic, and token caching for production use.

## Contact Information

To obtain credentials, contact SanlamAllianz:
- Reference the API documentation version 1.3 (dated 20/06/2025)
- Mention you're integrating the Travel Insurance API
- Request test/sandbox credentials first before production

## Next Steps

1. ⏳ Contact SanlamAllianz for API credentials
2. ⏳ Update `.env` file with actual credentials
3. ⏳ Run `node test-sanlam-allianz-integration.js`
4. ⏳ Test through application endpoints
5. ⏳ Monitor logs for successful API calls
6. ⏳ Remove mock data fallback once API is stable
