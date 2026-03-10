# US Region Comprehensive Test Specification

## Application Overview

Callaway Connect is a B2B e-commerce platform designed for business customers to order golf products and manage their accounts. It provides functionality for placing orders (both stock and custom), checking order status, managing invoices and payments, attending fitting events, and accessing various resources and support materials. The application supports multiple regions and languages.

## Test Scenarios

### 1. Authentication and Access Control

**Seed:** `tests/seed.spec.ts`

#### 1.1. US-AUTH-001: Successful Login with Valid Credentials

**File:** `tests/US/us-authentication.spec.ts`

**Steps:**
  1. Navigate to the US region login page (https://hyqa-us.callawayconnect.com/login)
    - expect: Login form is displayed with Email Address and Password fields
    - expect: Sign In button is visible
    - expect: Forgot your password? link is visible
    - expect: Want Access? Sign Up Here link is visible
  2. Enter valid email (hyqa_us_sravan@yopmail.com) in the Email Address field
    - expect: Email address is populated in the field
  3. Enter valid password (1234) in the Password field
    - expect: Password is masked/hidden in the field
  4. Click the Sign In button
    - expect: User is redirected to the homepage
    - expect: Home dashboard is displayed showing Order Status and Bill Pay sections
    - expect: Account name 'CALLAWAY SALES TEST ACC-0000044444' is displayed in the top navigation

#### 1.2. US-AUTH-002: Login with Invalid Email Format

**File:** `tests/US/us-authentication.spec.ts`

**Steps:**
  1. Navigate to the US region login page
    - expect: Login form is displayed
  2. Enter an invalid email format (e.g., 'invalidemail') in the Email Address field
    - expect: Email address is entered in the field
  3. Enter a password in the Password field
    - expect: Password is entered
  4. Click the Sign In button
    - expect: An error message is displayed indicating invalid email format or authentication failure
    - expect: User remains on the login page

#### 1.3. US-AUTH-003: Login with Incorrect Password

**File:** `tests/US/us-authentication.spec.ts`

**Steps:**
  1. Navigate to the US region login page
    - expect: Login form is displayed
  2. Enter a valid email address in the Email Address field
    - expect: Email is populated
  3. Enter an incorrect password in the Password field
    - expect: Password is entered and masked
  4. Click the Sign In button
    - expect: An error message is displayed indicating incorrect username or password
    - expect: User remains on the login page

#### 1.4. US-AUTH-004: Forgot Password Recovery Flow

**File:** `tests/US/us-authentication.spec.ts`

**Steps:**
  1. Navigate to the US region login page
    - expect: Login page is displayed
  2. Click on the 'Forgot your password?' link
    - expect: A password reset modal dialog appears
    - expect: Message displays: 'Please enter your account email address. Instructions on how to Reset your Password will be sent to this address.'
    - expect: Email Address field is visible
    - expect: Reset Password button is visible
  3. Enter a valid email address in the Email Address field
    - expect: Email address is populated in the field
  4. Click the Reset Password button
    - expect: A confirmation message is displayed indicating an email has been sent
    - expect: Modal closes and user is returned to login page

#### 1.5. US-AUTH-005: Logout Functionality

**File:** `tests/US/us-authentication.spec.ts`

**Steps:**
  1. Log in with valid credentials and navigate to the homepage
    - expect: User is logged in and on the homepage
    - expect: Account information displayed in top navigation
  2. Locate and click the logout option (typically in account dropdown or navigation menu)
    - expect: User is logged out
    - expect: User is redirected to the login page
    - expect: Session is terminated

### 2. Homepage and Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. US-HOME-001: Homepage Displays All Key Sections

**File:** `tests/US/us-homepage.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: Homepage is displayed after successful login
  2. Verify the presence of all main sections on the homepage
    - expect: Order Status section is visible with count of Open, On Hold, In Process, Partially Shipped, and Shipped orders
    - expect: Bill Pay section is visible showing Total Credit Line, Past Due amount, and Total Due amount
    - expect: Help section is visible with Contact Us and FAQs links
    - expect: Legal section is visible with policy links
    - expect: Product Resources section is visible

#### 2.2. US-HOME-002: Account Switcher Functionality

**File:** `tests/US/us-homepage.spec.ts`

**Steps:**
  1. Log in and navigate to the homepage
    - expect: Account information displayed: 'CALLAWAY SALES TEST ACC-0000044444'
    - expect: 'Switch Account' option is visible in the top navigation
  2. Click on 'Switch Account'
    - expect: Account switching interface is displayed or modal appears
    - expect: Options to select different accounts are available (if the user has multiple accounts)

#### 2.3. US-HOME-003: Navigation Menu Accessibility

**File:** `tests/US/us-homepage.spec.ts`

**Steps:**
  1. Log in and navigate to the homepage
    - expect: Main navigation menu is visible
  2. Verify that all menu items are accessible: Place Order, Check Status, Bill Pay, Compensation, Trade In/Returns, Fitting Events, Resources
    - expect: All menu items are clickable and accessible
    - expect: No broken links or missing menu items

### 3. Place Order - Product Browsing and Selection

**Seed:** `tests/seed.spec.ts`

#### 3.1. US-ORDER-001: Browse Product Categories

**File:** `tests/US/us-place-order.spec.ts`

**Steps:**
  1. Log in and navigate to the homepage
    - expect: User is logged in
  2. Click on 'Place Order' in the main navigation
    - expect: Place Order submenu expands displaying product categories: Clubs, Balls, Gear, OGIO GEAR
  3. Hover over or click 'Clubs' category
    - expect: Clubs subcategory menu expands showing: Drivers, Fairway Woods, Hybrids, Irons, Combo Sets, Complete Sets, Wedges, Odyssey Putters, Shafts

#### 3.2. US-ORDER-002: View Product Listing with Sorting and Filtering

**File:** `tests/US/us-place-order.spec.ts`

**Steps:**
  1. Navigate to Place Order > Clubs > Drivers
    - expect: Drivers product listing page is displayed
    - expect: Page title shows 'DRIVERS | CLUBS | Place Order | Callaway US Site'
    - expect: Multiple driver products are listed
  2. Verify product listing features
    - expect: Sorting dropdown is available with options: Relevance (default), Name, and others
    - expect: Retail Mode toggle is visible
    - expect: Retail Pricing toggle is available
    - expect: Each product displays: product image, product name, Stock Order button, Custom Order button
  3. Change sort order from 'Relevance' to 'Name'
    - expect: Product list is re-sorted alphabetically by product name

#### 3.3. US-ORDER-003: Toggle Retail Pricing Mode

**File:** `tests/US/us-place-order.spec.ts`

**Steps:**
  1. Navigate to a product listing page (e.g., Drivers)
    - expect: Product listing is displayed
    - expect: Retail Mode toggle is visible
    - expect: Retail Pricing toggle showing current state (on/off)
  2. Click on the Retail Pricing toggle to switch from on to off (or vice versa)
    - expect: Product pricing is updated to reflect the selected pricing mode
    - expect: Page updates without requiring a full refresh

### 4. Place Order - Stock and Custom Orders

**Seed:** `tests/seed.spec.ts`

#### 4.1. US-ORDER-004: Stock Order Bulk Purchase

**File:** `tests/US/us-place-order.spec.ts`

**Steps:**
  1. Navigate to a product page (e.g., Drivers category)
    - expect: Product listing is displayed
  2. Click on 'Stock Order' button for a specific product (e.g., ELYTE NIGHT EDITION DRIVER)
    - expect: Bulk order page is displayed for the selected product
    - expect: Page title matches the product name
    - expect: Product image and name are displayed
    - expect: 'Order Custom' link is available for custom orders
    - expect: A table is displayed with pre-configured product specifications
  3. Verify the structure of the bulk order table
    - expect: Table columns show: Hand, Loft, Shaft Flex, Shaft Model, and Quantity
    - expect: Multiple pre-configured combination rows are displayed
    - expect: Each row has a Quantity field for input

#### 4.2. US-ORDER-005: Add Items to Cart from Stock Order

**File:** `tests/US/us-place-order.spec.ts`

**Steps:**
  1. Navigate to a stock order page for a product
    - expect: Bulk order page is displayed with product configurations table
  2. Enter quantity (e.g., 5) in the Quantity field for the first row
    - expect: Quantity value is entered in the field
  3. Enter quantity for additional rows as needed
    - expect: Multiple quantities are entered for different configurations
  4. Review the Order Summary section at the bottom
    - expect: Order Summary shows selected products and quantities
    - expect: Add To Cart button is visible
    - expect: Button state changes based on whether products are selected
  5. Click the 'Add To Cart' button
    - expect: Items are added to the shopping cart
    - expect: Confirmation message may be displayed
    - expect: Cart count in the header updates to reflect new items if visible

#### 4.3. US-ORDER-006: Custom Order Configuration

**File:** `tests/US/us-place-order.spec.ts`

**Steps:**
  1. Navigate to a product page (e.g., Drivers listing)
    - expect: Product listing is displayed
  2. Click on 'Custom Order' button for a specific product
    - expect: User is directed to a product configurator page
    - expect: Page allows customization of product specifications (such as hand, loft, shaft, grip, color, etc.)
    - expect: Customization options are presented in the interface
  3. Configure the product with desired specifications
    - expect: Selected specifications are reflected in the configurator
    - expect: Price may update based on selected options
  4. Complete the custom order process
    - expect: User can add the customized product to cart or place the order

### 5. Order Status and Management

**Seed:** `tests/seed.spec.ts`

#### 5.1. US-STATUS-001: View Order Status Page

**File:** `tests/US/us-order-status.spec.ts`

**Steps:**
  1. Log in and navigate to 'Check Status' from the main menu
    - expect: Order Status page is displayed
    - expect: Page title shows 'Order Status Page | Check Status | Callaway US Site'
    - expect: Ship To Account dropdown is visible with the current account selected
  2. Verify order status summary section
    - expect: Summary cards display: Open (count), On Hold (count), In Process (count), Partially Shipped (count), Shipped (count)
    - expect: Counts reflect actual orders in the system

#### 5.2. US-STATUS-002: Filter Orders by Status

**File:** `tests/US/us-order-status.spec.ts`

**Steps:**
  1. On the Order Status page, locate the status filter options
    - expect: Order status filters are visible at the top of the orders table
  2. Click on a specific status (e.g., 'Open')
    - expect: Orders table is filtered to show only orders with the selected status

#### 5.3. US-STATUS-003: Filter Orders by Date Range

**File:** `tests/US/us-order-status.spec.ts`

**Steps:**
  1. On the Order Status page, locate the Request Date filter
    - expect: Date range picker fields are visible (from and to dates)
  2. Enter or select a date range (e.g., from 01/31/2026 to 05/01/2026)
    - expect: Orders table displays only orders within the specified date range

#### 5.4. US-STATUS-004: Search Orders by Order Number

**File:** `tests/US/us-order-status.spec.ts`

**Steps:**
  1. On the Order Status page, locate the Order Number search field
    - expect: Search field is visible in the Order Number column
  2. Enter an order number to search (e.g., HY03297925)
    - expect: Orders table is filtered to show matching order
    - expect: The specified order is displayed in the results

#### 5.5. US-STATUS-005: Filter Orders by Type

**File:** `tests/US/us-order-status.spec.ts`

**Steps:**
  1. On the Order Status page, locate the Type dropdown filter
    - expect: Type dropdown is visible with options: All, Standard Order, Custom/Logo Order
  2. Select 'Standard Order' from the Type dropdown
    - expect: Orders table is filtered to show only Standard Orders
  3. Select 'Custom/Logo Order' from the Type dropdown
    - expect: Orders table is filtered to show only Custom/Logo Orders

#### 5.6. US-STATUS-006: Export Orders to Excel

**File:** `tests/US/us-order-status.spec.ts`

**Steps:**
  1. On the Order Status page, locate the 'Export To Excel' button
    - expect: Export button is visible at the top of the orders table
  2. Click the 'Export To Excel' button
    - expect: An Excel file is downloaded containing the current filtered order data
    - expect: File can be opened and contains all order columns and data

### 6. Bill Pay and Invoice Management

**Seed:** `tests/seed.spec.ts`

#### 6.1. US-BILLPAY-001: View Bill Pay Dashboard

**File:** `tests/US/us-bill-pay.spec.ts`

**Steps:**
  1. Log in and navigate to 'Bill Pay' from the main menu
    - expect: Bill Pay page is displayed
    - expect: Page title shows 'Bill Pay | Callaway US Site'
  2. Verify the Bill Pay summary section
    - expect: Total Credit Line amount is displayed
    - expect: Past Due amount is displayed
    - expect: Total Due amount is displayed
    - expect: All financial information is current and accurate

#### 6.2. US-BILLPAY-002: Payment Method Selection

**File:** `tests/US/us-bill-pay.spec.ts`

**Steps:**
  1. On the Bill Pay page, verify payment method options
    - expect: Payment method tabs are visible: 'Pay By Credit Card' and 'Pay By ACH'
    - expect: 'Add/Edit Payment Method' link is available
    - expect: Message indicates: 'Please choose a payment method before selecting invoices for payment'
  2. Click on the 'Pay By Credit Card' tab
    - expect: Credit card payment tab is selected
  3. Click on the 'Pay By ACH' tab
    - expect: ACH payment tab is selected
    - expect: ACH Payment Profile dropdown is visible

#### 6.3. US-BILLPAY-003: Add/Edit Payment Method

**File:** `tests/US/us-bill-pay.spec.ts`

**Steps:**
  1. On the Bill Pay page, click the 'Add/Edit Payment Method' link
    - expect: User is navigated to the payment details management page (/my-account/payment-details)
    - expect: Payment methods management interface is displayed

#### 6.4. US-BILLPAY-004: ACH Payment Profile Selection

**File:** `tests/US/us-bill-pay.spec.ts`

**Steps:**
  1. On the Bill Pay page, select 'Pay By ACH' tab
    - expect: ACH tab is active
    - expect: ACH Payment Profile dropdown is visible with the label 'Select an ACH Payment Profile *'
  2. Click on the ACH Payment Profile dropdown
    - expect: Dropdown expands showing available ACH payment profiles: 'Account Ending in 6789', 'Account Ending in 9009'
  3. Select an ACH account from the dropdown
    - expect: Selected ACH account is displayed in the dropdown field

#### 6.5. US-BILLPAY-005: View and Filter Invoices

**File:** `tests/US/us-bill-pay.spec.ts`

**Steps:**
  1. On the Bill Pay page, scroll to the invoices table
    - expect: Invoices table is displayed with columns: Status, Invoice Date, Due Date, Payment Terms, Invoice Number, Original Invoice, Order Number, PO Number, Reference, Invoice Amount, Pay, Print
  2. Filter invoices by Status using the Status filter (Open/Closed)
    - expect: Invoice table is filtered to show invoices matching the selected status
  3. Filter invoices by Invoice Date using the date range picker
    - expect: Invoice table is filtered to show invoices within the selected date range
  4. Search for an invoice using the search fields
    - expect: Specific invoice is found and displayed in the table

#### 6.6. US-BILLPAY-006: Select Invoices for Payment

**File:** `tests/US/us-bill-pay.spec.ts`

**Steps:**
  1. On the Bill Pay page, ensure a payment method is selected (Credit Card or ACH with profile)
    - expect: Payment method is active and ready for use
  2. In the invoices table, check the 'Select All' checkbox to select all visible invoices (or individual invoices)
    - expect: Invoices are selected as indicated by checkmark in the 'Pay' column
  3. Review the selected invoices and total amount
    - expect: Selected invoices are highlighted or marked
    - expect: Total amount to be paid is calculated and displayed

### 7. Fitting Events

**Seed:** `tests/seed.spec.ts`

#### 7.1. US-FITTING-001: Access Fitting Events Page

**File:** `tests/US/us-fitting-events.spec.ts`

**Steps:**
  1. Log in and navigate to 'FITTING EVENTS' from the main menu
    - expect: Fitting Events page is displayed
    - expect: Page title shows 'Fitting Summary Page | Callaway US Site'
    - expect: Fitting tool interface is loaded (may be an embedded iframe)

#### 7.2. US-FITTING-002: Verify Fitting Tool Interface

**File:** `tests/US/us-fitting-events.spec.ts`

**Steps:**
  1. On the Fitting Events page, verify the fitting tool is loaded
    - expect: Fitting tool is displayed and functional
    - expect: Tool includes features for managing fitting appointments or events (exact features depend on the tool implementation)

### 8. Footer Links and Resources

**Seed:** `tests/seed.spec.ts`

#### 8.1. US-RESOURCES-001: Access Legal Documents

**File:** `tests/US/us-resources.spec.ts`

**Steps:**
  1. Scroll to the footer section of any page
    - expect: Footer is visible with various document links
  2. In the LEGAL section, verify all links are present and functional: Terms & Conditions, MAP / NPIP Policy, Internet Policy, Privacy Policy, Ad and Cookie Policy, Off-Premises Sales Policy, Sustainability, Seller Policy
    - expect: All legal links are clickable and functional
    - expect: Clicking a link opens the respective document

#### 8.2. US-RESOURCES-002: Access Product Resources

**File:** `tests/US/us-resources.spec.ts`

**Steps:**
  1. Scroll to the footer section
    - expect: Footer with resource links is visible
  2. In the Product Resources section, verify all links are present: Custom Club Availability, Logo Guide, Catalogs, Wholesale Price List, Marketing Assets, Product Setup Sheets & UPC Lists
    - expect: All product resource links are clickable and functional

#### 8.3. US-RESOURCES-003: Contact Us and Support

**File:** `tests/US/us-resources.spec.ts`

**Steps:**
  1. Locate the Help section in the footer
    - expect: Help section is visible with links to Contact Us and FAQs
  2. Click on 'Contact Us' link
    - expect: Contact Us page is displayed with contact form or contact information
  3. Click on 'FAQs' link
    - expect: FAQs page is displayed with common questions and answers

### 9. Responsive Design and Browser Compatibility

**Seed:** `tests/seed.spec.ts`

#### 9.1. US-RESPONSIVE-001: Mobile Layout

**File:** `tests/US/us-responsive-design.spec.ts`

**Steps:**
  1. Access the application on a mobile device (or resize browser to mobile viewport size, e.g., 375x812)
    - expect: Layout is responsive and adapts to mobile viewport
    - expect: Navigation menu is accessible (e.g., hamburger menu or collapsible menu)
    - expect: Content is readable and properly formatted for mobile screens

#### 9.2. US-RESPONSIVE-002: Tablet Layout

**File:** `tests/US/us-responsive-design.spec.ts`

**Steps:**
  1. Access the application on a tablet device (or resize browser to tablet viewport size, e.g., 768x1024)
    - expect: Layout is responsive and adapts to tablet viewport
    - expect: All content is readable and properly formatted
    - expect: Navigation and interactive elements are accessible

#### 9.3. US-RESPONSIVE-003: Desktop Layout

**File:** `tests/US/us-responsive-design.spec.ts`

**Steps:**
  1. Access the application on desktop (standard resolution 1920x1080 or similar)
    - expect: Full layout is displayed with all features visible
    - expect: Navigation menu is fully expanded
    - expect: All content and features are accessible

### 10. Error Handling and Validation

**Seed:** `tests/seed.spec.ts`

#### 10.1. US-ERROR-001: Validation on Login Form

**File:** `tests/US/us-error-handling.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Login form is displayed
  2. Attempt to submit the form without entering any data (click Sign In with empty fields)
    - expect: Validation error messages are displayed for required fields
    - expect: Email and Password fields are marked as required

#### 10.2. US-ERROR-002: Session Timeout Handling

**File:** `tests/US/us-error-handling.spec.ts`

**Steps:**
  1. Log in successfully and navigate to a page
    - expect: User is logged in and on a page
  2. Wait for the session to expire or manually expire the session (if applicable)
    - expect: User is automatically redirected to the login page or receives a session expired message
    - expect: User is prompted to log in again

#### 10.3. US-ERROR-003: Not Found Page (404)

**File:** `tests/US/us-error-handling.spec.ts`

**Steps:**
  1. Navigate to a non-existent page (e.g., /invalid-page)
    - expect: A 404 error page is displayed
    - expect: Message indicates the page was not found
    - expect: Navigation options are provided to return to the site
