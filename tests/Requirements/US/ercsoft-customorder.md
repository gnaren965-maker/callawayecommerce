# ERC SOFT Custom Order Test Plan

## Application Overview

End-to-end positive scenario testing for ERC SOFT custom order workflow on Callaway Connect B2B platform. This plan covers the complete flow from login through order placement, confirmation, and order history verification for a custom (non-stock) order of ERC SOFT golf balls.

## Test Scenarios

### 1. ERC SOFT Custom Order Workflow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Complete ERC SOFT Custom Order: Login → Place Custom Order → Checkout → Confirmation → History

**File:** `tests/US/us-ercsoft-customorder.spec.ts`

**Steps:**
  1. Navigate to login page using base URL
    - expect: Login page is displayed
    - expect: Page URL contains '/login'
  2. Fill email/username field with valid credentials from regions.json (US region)
    - expect: Email field is populated with username
  3. Fill password field with corresponding password from regions.json
    - expect: Password field is populated
  4. Click 'Sign In' button and wait for redirect
    - expect: User is authenticated
    - expect: Page URL does not contain '/login'
    - expect: Homepage is displayed
  5. Locate and click 'Place Order' in main navigation menu
    - expect: Place Order dropdown menu appears
    - expect: Submenu displays all product categories
  6. Click on 'BALLS' category from Place Order submenu
    - expect: BALLS product listing page is displayed
    - expect: Page title contains 'BALLS'
    - expect: Multiple ball products are listed
    - expect: Each product has 'Stock Order' and 'Order Custom' buttons
  7. Search and locate ERC SOFT product in the balls listing
    - expect: ERC SOFT product is visible
    - expect: Product displays color options (e.g., Yellow, Blue, Pink)
    - expect: 'Order Custom' link/button is available for ERC SOFT
  8. Click 'Order Custom' button/link for ERC SOFT product
    - expect: Custom order page is loaded
    - expect: Product name 'ERC SOFT' is displayed at top
    - expect: Page URL contains 'custom' or similar indicator
  9. Verify custom order form is fully loaded with all product configurations
    - expect: Custom order form displays product variants
    - expect: Color options are visible (Yellow, Blue, Pink, etc.)
    - expect: Quantity input fields are present
    - expect: Product details and images are displayed
  10. Select first ERC SOFT color variant (e.g., Yellow) and enter quantity: 6
    - expect: Color variant is selected
    - expect: Quantity field shows value: 6
    - expect: Quantity is verified via inputValue()
  11. Select second ERC SOFT color variant (e.g., Blue) and enter quantity: 4
    - expect: Second color variant is selected
    - expect: Quantity field shows value: 4
    - expect: Quantity is verified via inputValue()
  12. Wait for product summary/order summary section to update with selected quantities
    - expect: Product summary shows selected variants with quantities
    - expect: Total quantity is calculated (6 + 4 = 10)
    - expect: Summary displays ERC SOFT product name
  13. Review order summary verifying product name, colors, and quantities
    - expect: Order summary section is visible
    - expect: ERC SOFT product is listed with both color variants
    - expect: Quantities match entered values (6 and 4)
    - expect: Subtotal or pricing is displayed
  14. Scroll 'Add To Cart' button into view and click it
    - expect: Add To Cart button is visible and enabled
    - expect: Click is successful
    - expect: Page navigates to cart or shows confirmation
  15. Verify cart page displays the added custom ERC SOFT order
    - expect: Cart page is loaded
    - expect: ERC SOFT product appears in cart
    - expect: Quantities match what was entered (6 and 4)
    - expect: Order summary shows total items
  16. Click 'Proceed to Checkout' button to navigate to order summary page
    - expect: Order summary/checkout page is displayed
    - expect: Order details are visible
    - expect: ERC SOFT custom order with correct quantities is shown
  17. On checkout page, click second 'Proceed to Checkout' button to navigate to secure checkout form
    - expect: Secure checkout page is loaded
    - expect: Page URL contains '/checkout' or similar
    - expect: Checkout form is displayed
  18. Locate and fill P.O. Number field with value: 89012
    - expect: P.O. Number field contains: 89012
    - expect: Value is verified via inputValue()
  19. Locate and fill Name field with value: QATesterTwo
    - expect: Name field contains: QATesterTwo
    - expect: Value is verified via inputValue()
  20. Verify both fields are filled and form validation passes
    - expect: No validation error messages appear
    - expect: Place Order button is enabled
    - expect: No required field warnings
  21. Click 'Place Order' button to submit the custom order
    - expect: Button click is successful
    - expect: Order is submitted to server
    - expect: Page navigates to confirmation page
  22. Wait for order confirmation page to fully load and verify order was placed
    - expect: Confirmation page is displayed
    - expect: Page contains 'Order Confirmed' or 'Thank You' message
    - expect: Order number/reference is visible
  23. Verify confirmation page displays order details matching submitted values
    - expect: ERC SOFT product is listed on confirmation
    - expect: Quantities match (6 and 4)
    - expect: P.O. Number shows: 89012
    - expect: Name shows: QATesterTwo
    - expect: Product color variants are displayed
  24. Navigate to order history/Check Status section to verify order appears
    - expect: Order history page is accessible
    - expect: Placed order appears in the list
    - expect: Order shows status: Confirmed or Processing
  25. Click on the order in history to view full order details
    - expect: Order details page is displayed
    - expect: Order contains ERC SOFT product with both color variants
    - expect: Quantities display correctly (6 and 4)
    - expect: P.O. Number: 89012 is shown
    - expect: Order timestamp is recent
  26. Locate and click logout button/menu in user profile section
    - expect: Logout option is found
    - expect: Click is successful
  27. Verify user is logged out and redirected to login page
    - expect: Page URL contains '/login'
    - expect: Login page is displayed
    - expect: Session is terminated
