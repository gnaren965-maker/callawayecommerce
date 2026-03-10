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
