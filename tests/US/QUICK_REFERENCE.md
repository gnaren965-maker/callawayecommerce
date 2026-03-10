# Quick Reference Guide - Login & Homepage Tests

## Test Files
- **Authentication Tests:** `tests/US/us-authentication.spec.ts` (5 scenarios × 7 regions)
- **Homepage Tests:** `tests/US/us-homepage.spec.ts` (3 scenarios × 7 regions)
- **Total Tests:** 56 (35 auth + 21 homepage)

## Quick Commands

### Run All Tests
```bash
npm test tests/US/
```

### Run Authentication Tests Only
```bash
npx playwright test tests/US/us-authentication.spec.ts
```

### Run Homepage Tests Only
```bash
npx playwright test tests/US/us-homepage.spec.ts
```

## Region-Specific Commands

### US Region
```bash
npx playwright test tests/US/ --grep "^Authentication - US Region"
npx playwright test tests/US/ --grep "^Homepage and Navigation - US Region"
```

### Canada Region
```bash
npx playwright test tests/US/ --grep "Canada Region"
```

### Japan Region
```bash
npx playwright test tests/US/ --grep "Japan Region"
```

### Europe Region
```bash
npx playwright test tests/US/ --grep "Europe Region"
```

### South Pacific Region
```bash
npx playwright test tests/US/ --grep "South Pacific Region"
```

### Latin America
```bash
npx playwright test tests/US/ --grep "Latin America and Other Region"
```

### Republic of Korea
```bash
npx playwright test tests/US/ --grep "Republic of Korea Region"
```

## By Test Scenario

### US-AUTH-001: Successful Login
```bash
npx playwright test tests/US/us-authentication.spec.ts --grep "AUTH-001"
```

### US-AUTH-002: Invalid Email
```bash
npx playwright test tests/US/us-authentication.spec.ts --grep "AUTH-002"
```

### US-AUTH-003: Wrong Password
```bash
npx playwright test tests/US/us-authentication.spec.ts --grep "AUTH-003"
```

### US-AUTH-004: Password Reset
```bash
npx playwright test tests/US/us-authentication.spec.ts --grep "AUTH-004"
```

### US-AUTH-005: Logout
```bash
npx playwright test tests/US/us-authentication.spec.ts --grep "AUTH-005"
```

### US-HOME-001: Homepage Sections
```bash
npx playwright test tests/US/us-homepage.spec.ts --grep "HOME-001"
```

### US-HOME-002: Account Switcher
```bash
npx playwright test tests/US/us-homepage.spec.ts --grep "HOME-002"
```

### US-HOME-003: Navigation Menu
```bash
npx playwright test tests/US/us-homepage.spec.ts --grep "HOME-003"
```

## Browser-Specific Commands

### Chromium Only
```bash
npx playwright test tests/US/ --project=chromium
```

### Firefox Only
```bash
npx playwright test tests/US/ --project=firefox
```

### WebKit (Safari) Only
```bash
npx playwright test tests/US/ --project=webkit
```

### Mobile Chrome
```bash
npx playwright test tests/US/ --project="Mobile Chrome"
```

### Mobile Safari (iPhone)
```bash
npx playwright test tests/US/ --project="Mobile Safari"
```

## Interactive Test Modes

### Debug Mode (Step Through)
```bash
npm run test:debug tests/US/us-authentication.spec.ts
```

### Headed Mode (See Browser)
```bash
npm run test:headed tests/US/us-authentication.spec.ts
```

### UI Mode (Interactive Dashboard)
```bash
npm run test:ui tests/US/
```

## Reporting

### View HTML Report
```bash
npm run test:report
```

### Generate Detailed Report
```bash
npm test tests/US/
npm run test:report
```

## Multiple Conditions Examples

### Run AUTH-001 for all regions with Chromium
```bash
npx playwright test tests/US/us-authentication.spec.ts \
  --grep "AUTH-001" \
  --project=chromium
```

### Run all tests for Canada in Firefox
```bash
npx playwright test tests/US/ \
  --grep "Canada" \
  --project=firefox
```

### Run HOME-001 for all regions in headed mode
```bash
npx playwright test tests/US/us-homepage.spec.ts \
  --grep "HOME-001" \
  --headed
```

### Run AUTH tests for US in debug mode
```bash
npm run test:debug tests/US/us-authentication.spec.ts \
  --grep "^Authentication - US"
```

## Test Configuration

### Increase Timeout (in .env)
```env
TIMEOUT=60000
```

### Change Log Level
```env
LOG_LEVEL=debug
```

### Run Tests Sequentially (no parallel)
```bash
npx playwright test tests/US/ --workers=1
```

### Run with Specific Workers
```bash
npx playwright test tests/US/ --workers=4
```

## Expected Output Examples

### Successful Run
```
✓ Authentication - US Region » US-AUTH-001: Login successfully with valid credentials (3.2s)
✓ Authentication - US Region » US-AUTH-002: Login with invalid email format (2.1s)
✓ Authentication - US Region » US-AUTH-003: Login with incorrect password (2.3s)
✓ Authentication - US Region » US-AUTH-004: Forgot password recovery flow (3.5s)
✓ Authentication - US Region » US-AUTH-005: Logout functionality (2.8s)

✓ Homepage and Navigation - US Region » US-HOME-001: Homepage displays all key sections (2.1s)
✓ Homepage and Navigation - US Region » US-HOME-002: Account switcher functionality (1.9s)
✓ Homepage and Navigation - US Region » US-HOME-003: Navigation menu accessibility (2.5s)

8 passed (18.4s)
```

### View Artifacts
```bash
# Screenshots and videos from failed tests
ls -la reports/artifacts/

# Test logs
cat reports/artifacts/*.log
```

## Troubleshooting Commands

### Run with Verbose Output
```bash
npx playwright test tests/US/ --reporter=verbose
```

### Run with List Output
```bash
npx playwright test tests/US/ --reporter=list
```

### Save Test Trace for Debugging
```bash
npx playwright test tests/US/ --trace=on
```

### Show Browser Console Messages
```bash
npx playwright test tests/US/ --debug
```

## Continuous Integration

### Run in CI Mode (with matrix)
```bash
# Set environment for CI
CI=true npm test tests/US/
```

### Check if Tests Would Pass
```bash
npx playwright test tests/US/ --dry-run
```

## Environment Variables

```bash
# Set base URL
BASE_URL=https://hyqa-us.callawayconnect.com npm test tests/US/

# Set headless mode
HEADLESS=true npm test tests/US/

# Set timeout
TIMEOUT=45000 npm test tests/US/

# Enable debugging
DEBUG=true npm test tests/US/
```

## Report Formats

After running tests, view reports:
```bash
# HTML Report (interactive, with screenshots)
npm run test:report

# JSON Report (machine readable)
cat reports/test-results.json

# JUnit XML (for CI systems)
cat reports/junit.xml
```

## Filtering by Test Name

```bash
# Run tests with "valid" in name
npx playwright test tests/US/ --grep "valid|Valid"

# Run tests excluding logout
npx playwright test tests/US/ --grep "(?!logout)"

# Run tests matching specific pattern
npx playwright test tests/US/ --grep "US-AUTH-(001|002)"
```

## Test Parameters

```bash
# Max retries for each test
npx playwright test tests/US/ --retries=2

# Timeout for entire test suite
npx playwright test tests/US/ --timeout=120000

# Exit code on soft assertion failure
npx playwright test tests/US/ --update-snapshots
```

---

For complete documentation, see:
- `TEST_IMPLEMENTATION_SUMMARY.md` - Detailed implementation info
- `README_MULTI_REGION_TESTS.md` - Multi-region testing guide
- Test files - `us-authentication.spec.ts`, `us-homepage.spec.ts`
