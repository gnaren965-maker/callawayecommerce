# Playwright Test Plan: Place Order → BALLS Workflow

## Overview
End-to-end positive scenario testing for the Balls product ordering flow on Callaway Connect B2B platform.

**Test File:** `tests/US/us-place-balls-stock-order.spec.ts`
**Seed:** `tests/seed.spec.ts`
**Region:** US (hyqa-us.callawayconnect.com)

---

## Test Scenario: Complete Balls Order Workflow

### Prerequisites
- Test user credentials from `data/regions.json` (US region)
- Fresh browser context for each test run
- Network connectivity to staging environment

### Test Steps

#### Step 1: Login and Navigate to Homepage
**Objective:** Authenticate and access the B2B platform

**Actions:**
1. Navigate to login page: `{baseUrl}/login`
2. Fill email field with credentials from `regions.json` (US)
3. Fill password field with corresponding password
4. Click "Sign In" button
5. Wait for redirect to homepage

**Expected Results:**
- ✓ User successfully authenticated
- ✓ Current URL does not contain `/login`
- ✓ Homepage content is visible

---

#### Step 2: Navigate to Place Order Menu
**Objective:** Access Place Order primary navigation

**Actions:**
1. Locate and hover over "Place Order" in main navigation
2. Wait for submenu to expand

**Expected Results:**
- ✓ Place Order dropdown menu is visible
- ✓ Submenu displays all product categories: Clubs, Balls, Gear, OGIO GEAR
- ✓ Balls category is clearly displayed and clickable

---

#### Step 3: Click on BALLS Category
**Objective:** Navigate to Balls product listing

**Actions:**
1. Click on "Balls" category from Place Order submenu
2. Wait for page to load

**Expected Results:**
- ✓ Balls product listing page is displayed
- ✓ Page title contains "BALLS"
- ✓ Multiple ball products are listed (e.g., Chrome Soft, Supersoft, EXO)
- ✓ Each product displays Stock Order button
- ✓ Product images, names, and icons are visible

---

#### Step 4: Select a Balls Product and Click Stock Order
**Objective:** Initiate bulk order flow for a specific ball product

**Actions:**
1. Identify first available ball product
2. Click "Stock Order" button for the selected product
3. Wait for bulk order page to load

**Expected Results:**
- ✓ Bulk order page is displayed
- ✓ Page URL contains `/bulkOrder`
- ✓ Product name and image are displayed at top
- ✓ "Order Custom" link is available
- ✓ Product specifications table is displayed with columns:
  - Product Description
  - Quantity fields
  - Price (optional)

---

#### Step 5: Enter Quantities in Bulk Order Form
**Objective:** Add multiple quantities of the selected balls to order

**Actions:**
1. Locate first quantity input field in product table
2. Clear any existing value
3. Enter quantity value: `5`
4. Trigger change event (blur or dispatch change event)
5. Wait for order summary to update
6. If multiple product configurations exist, enter quantity `3` in second row
7. Wait for order summary to update again

**Expected Results:**
- ✓ Quantity value `5` is entered in first row
- ✓ Order summary section updates showing first product
- ✓ Quantity value `3` is entered in second row (if available)
- ✓ Order summary shows both products with quantities
- ✓ Total quantity and estimated total are calculated

---

#### Step 6: Review Order Summary Section
**Objective:** Verify selected products appear in order summary

**Actions:**
1. Scroll to Order Summary section at bottom of page
2. Verify all entered products are listed
3. Confirm quantities match what was entered
4. Verify "Add To Cart" button is visible and enabled

**Expected Results:**
- ✓ Order Summary section is visible
- ✓ Selected products with quantities are displayed
- ✓ Subtotal/Total is calculated
- ✓ "Add To Cart" button is present and enabled
- ✓ Button is responsive to hover state

---

#### Step 7: Click Add To Cart Button
**Objective:** Add selected products to shopping cart

**Actions:**
1. Scroll "Add To Cart" button into view if needed
2. Click "Add To Cart" button
3. Wait for page navigation or confirmation message
4. Handle both modal popup and page redirect scenarios

**Expected Results:**
- ✓ Page redirects to cart/checkout page OR
- ✓ Confirmation message appears
- ✓ Cart count in header updates (if visible)
- ✓ Cart contains the ordered ball products
- ✓ No JavaScript errors in console

---

#### Step 8: Proceed to Checkout - First Navigation
**Objective:** Navigate from cart to order review page

**Actions:**
1. Locate "Proceed to Checkout" button on cart page
2. Click the button
3. Wait for page load

**Expected Results:**
- ✓ Page navigates to checkout/order summary page
- ✓ Order summary information is displayed
- ✓ Products show quantity: 5 and 3 (as entered)
- ✓ Pricing information is visible

---

#### Step 9: Proceed to Checkout - Second Navigation
**Objective:** Navigate to secure checkout form page

**Actions:**
1. Locate second "Proceed to Checkout" button on order summary page
2. Click the button
3. Wait for secure checkout page to load

**Expected Results:**
- ✓ Page redirects to secure checkout page
- ✓ Page URL contains `/checkout` or similar
- ✓ Checkout form is displayed with:
  - P.O. Number field
  - Name field
  - Other required fields (Billing, Shipping - if applicable)
  - "Place Order" button (visible and enabled)

---

#### Step 10: Fill P.O. Number and Name Fields
**Objective:** Complete required checkout form fields

**Actions:**
1. Locate P.O. Number form field
2. Clear field if pre-populated
3. Enter value: `57643`
4. Verify value is entered correctly
5. Locate Name form field
6. Clear field if pre-populated
7. Enter value: `TesterOne`
8. Verify value is entered correctly
9. Scroll down to verify "Place Order" button is enabled

**Expected Results:**
- ✓ P.O. Number field contains: `57643`
- ✓ Name field contains: `TesterOne`
- ✓ Form validation passes (no error messages)
- ✓ "Place Order" button is enabled and clickable
- ✓ Button does not show loading or disabled state

---

#### Step 11: Click Place Order Button
**Objective:** Submit order for processing

**Actions:**
1. Verify "Place Order" button is visible and enabled
2. Click "Place Order" button
3. Wait for page navigation and server processing
4. Handle any loading states or confirmation modals

**Expected Results:**
- ✓ Button click is successful
- ✓ Page redirects to order confirmation page
- ✓ No error messages appear
- ✓ Order is processed (HTTP 200-299 status)

---

#### Step 12: Verify Order Confirmation Page
**Objective:** Confirm successful order placement

**Actions:**
1. Wait for confirmation page to fully load
2. Check URL for confirmation indicators
3. Look for confirmation message containing:
   - "Order Confirmed" or "Thank You"
   - Order number/reference
4. Verify product details are displayed:
   - Ball product names
   - Quantities (5 and 3)
   - P.O. Number: `57643`
   - Name: `TesterOne`

**Expected Results:**
- ✓ Confirmation page is displayed
- ✓ Page contains "Order Confirmed" or "Thank You" message
- ✓ Order number/reference is visible
- ✓ Order details match what was submitted:
  - Products: Balls (with correct quantity)
  - P.O. Number: `57643`
  - Name: `TesterOne`
- ✓ No error or warning messages

---

#### Step 13: Verify Order in Order History (Optional)
**Objective:** Confirm order appears in user's order history

**Actions:**
1. Navigate to account/order history section
2. Search for or locate the order placed in step 11
3. Click to view order details

**Expected Results:**
- ✓ Order appears in order history list
- ✓ Order has status: "Confirmed" or "Placed"
- ✓ Order details match submitted values:
  - Products: Balls
  - Quantities: 5 and 3
  - P.O. Number: `57643`
  - Order timestamp is recent

---

#### Step 14: Logout (Optional)
**Objective:** End session cleanly

**Actions:**
1. Locate logout button/menu in user profile section
2. Click logout
3. Wait for redirect to login page

**Expected Results:**
- ✓ User is successfully logged out
- ✓ Page redirects to login page
- ✓ Session is terminated

---

## Selectors Reference

| Element | Selector | Fallback |
|---------|----------|----------|
| Username Input | `input[id="j_username"]` | `input[name="username"]` |
| Password Input | `input[id="j_password"]` | `input[name="password"]` |
| Sign In Button | `button:has-text("Sign In")` | `button[type="submit"]` |
| Place Order Nav | `a, button` filtered by `/place order/i` | `[data-nav="placeOrder"]` |
| Balls Category | `a, button` filtered by `/balls/i` | `[data-category="balls"]` |
| Stock Order Button | `button:has-text("Stock Order")` | `a[href*="/bulkOrder"]` |
| Quantity Input | `input[class*="qty"], input[class*="quantity"]` | `input[placeholder*="Qty"]` |
| Add To Cart | `button:has-text("Add to Cart")` | `#addToCartBulkOrder` |
| Proceed to Checkout | `button:has-text(/proceed|checkout/i)` | `a[href*="/checkout"]` |
| P.O. Number Field | `input[placeholder*="P.O"], input[name*="po"]` | `input[aria-label*="P.O"]` |
| Name Field | `input[placeholder*="Name"], input[name*="name"]` | `input[aria-label*="Name"]` |
| Place Order Button | `button:has-text("Place Order")` | `button[type="submit"]` |
| Confirmation Message | `text=/order.*confirmed|thank you/i` | `text=/order received/i` |

---

## Test Data

| Field | Value | Notes |
|-------|-------|-------|
| Email | hyqa_us_sravan@yopmail.com | From `regions.json` |
| Password | 1234 | From `regions.json` |
| Product Category | BALLS | Fixed for this scenario |
| Quantity 1 | 5 | Example quantity |
| Quantity 2 | 3 | Example quantity (if 2nd row exists) |
| P.O. Number | 57643 | Fixed test value |
| Name | TesterOne | Fixed test value |

---

## Success Criteria

✅ All 14 steps execute without errors
✅ Order is successfully placed for Balls products
✅ Quantities entered (5 and 3) are preserved through checkout
✅ P.O. Number (57643) is submitted correctly
✅ Name (TesterOne) is submitted correctly
✅ Confirmation page displays with order details
✅ Order appears in order history
✅ No JavaScript errors in browser console

---

## Notes for Automation Implementation

1. **Reuse Login Helper:** Use `getRegionData()` from `utils/testDataHelper.ts` instead of duplicating credential loading
2. **Base URL:** Use `BASE_URLS['US']` for region consistency
3. **Logging:** Use `logStep()` for clear step tracking and debugging
4. **Error Handling:** Wrap navigations in `.catch()` to handle timing variations
5. **Assertions:** Keep assertions on critical user-facing elements only
6. **Waits:** Use `waitForLoadState()` instead of fixed timeouts where possible
7. **Selectors:** Prefer XPath patterns with `has-text()` for resilience to UI changes
8. **Test Structure:** Follow pattern from `us-place-stock-order-new.spec.ts` for consistency

---

## Test Execution

Run test:
```bash
npx playwright test tests/US/us-place-balls-stock-order.spec.ts --project=chromium