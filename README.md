# Ecommerce Playwright Framework

Enterprise-grade test automation framework for e-commerce application using Playwright and TypeScript.

## Features

- ✅ Multi-browser testing (Chromium, Firefox, WebKit)
- ✅ Multi-region support (7 regions with region-specific credentials)
- ✅ Comprehensive test reporting (HTML, JSON, JUnit)
- ✅ Screenshots and video capture on failure
- ✅ TypeScript support with strict type checking
- ✅ Organized test structure with fixtures and utilities
- ✅ GitHub Actions CI/CD integration
- ✅ Structured logging and error reporting

## Supported Regions

1. **US** - United States
2. **Canada** - Canada
3. **Japan** - Japan
4. **Europe** - Europe
5. **South Pacific** - South Pacific
6. **Latin America and Other** - Latin America and Other
7. **Republic of Korea** - Republic of Korea

## Project Structure

```
ecommerce-playwright-framework/
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies
├── .env                          # Environment variables
│
├── data/
│   └── regions.json              # Region credentials
│
├── fixtures/
│   └── authFixture.ts            # Authentication fixture
│
├── utils/
│   ├── logger.ts                 # Logging utility
│   ├── elementHelper.ts          # Element interaction helper
│   └── testDataHelper.ts         # Test data management
│
├── tests/
│   ├── login.test.ts             # Login test suite
│   ├── home.test.ts              # Home page test suite
│   └── logout.test.ts            # Logout test suite
│
├── reports/
│   ├── html/                     # HTML test reports
│   ├── artifacts/                # Screenshots, videos, logs
│   └── test-results.json         # JSON test results
│
└── .github/
    └── workflows/
        └── playwright.yml        # GitHub Actions workflow
```

## Installation

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ecommerce-playwright-framework
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npm run install:browsers
   ```

   Or manually:

   ```bash
   npx playwright install --with-deps
   ```

4. **Configure environment variables**

   Update `.env` file with your settings:

   ```env
   BASE_URL=https://your-ecommerce-app.com
   HEADLESS=true
   DEBUG=false
   TIMEOUT=30000
   RETRIES=2
   WORKERS=4
   LOG_LEVEL=info
   CAPTURE_SCREENSHOTS=true
   CAPTURE_VIDEOS=true
   ```

5. **Update region credentials**

   Edit `data/regions.json` with actual credentials for each region:

   ```json
   {
     "US": {
       "username": "your_us_username",
       "password": "your_us_password"
     },
     // ... other regions
   }
   ```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in a specific browser

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Run tests with UI mode

```bash
npm run test:ui
```

### Run tests in headed mode

```bash
npm run test:headed
```

### Run specific test file

```bash
npx playwright test tests/login.test.ts
```

### Run tests with a specific pattern

```bash
npx playwright test --grep "US"
```

## Test Reports

### View HTML report

```bash
npm run test:report
```

The HTML report will be generated in `reports/html/index.html` after test execution.

### Report Types

- **HTML Report**: `reports/html/` - Interactive test results with screenshots
- **JSON Results**: `reports/test-results.json` - Machine-readable test data
- **JUnit XML**: `reports/junit.xml` - CI/CD integration format
- **Artifacts**: `reports/artifacts/` - Screenshots and videos on failure

## Code Style

### Format code

```bash
npm run format
```

### Check code format

```bash
npm run format:check
```

### Lint code

```bash
npm run lint
```

## Configuration

### playwright.config.ts

Key configuration options:

- **testDir**: Directory containing test files (./tests)
- **fullyParallel**: Run tests in parallel
- **retries**: Number of retries on CI
- **reporter**: Test reporters configuration
- **timeout**: Global test timeout (30s)
- **screenshot**: Capture screenshots on failure
- **video**: Capture videos on failure
- **trace**: Enable tracing for debugging

### tsconfig.json

- TypeScript version: 5.6.3
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Path aliases configured:
  - `@utils/*` → `utils/*`
  - `@data/*` → `data/*`
  - `@fixtures/*` → `fixtures/*`
  - `@tests/*` → `tests/*`

### .env

Environment variables:

- `BASE_URL`: Application base URL
- `HEADLESS`: Run in headless mode
- `DEBUG`: Enable debug logging
- `TIMEOUT`: Test timeout in milliseconds
- `RETRIES`: Number of retries
- `WORKERS`: Number of parallel workers
- `LOG_LEVEL`: Logging level (debug, info, warn, error)

## Utilities

### Logger (utils/logger.ts)

Structured logging utility:

```typescript
import { logStep, logTestStart, logTestEnd, logError, logData } from '@utils/logger';

logStep('Filling in username field');
logData('User credentials', { username: 'test_user' });
logError('Test failed', error);
```

### Element Helper (utils/elementHelper.ts)

Simplified element interaction:

```typescript
import { createElementHelper } from '@utils/elementHelper';

const elementHelper = createElementHelper(page);
await elementHelper.fillInput('input[name="username"]', 'testuser');
await elementHelper.click('button[type="submit"]');
await elementHelper.waitForElement('text=Welcome');
```

### Test Data Helper (utils/testDataHelper.ts)

Region data management:

```typescript
import { getRegionData, getAllRegions } from '@utils/testDataHelper';

const regionData = getRegionData('US');
const allRegions = getAllRegions();
```

### Auth Fixture (fixtures/authFixture.ts)

Pre-built authentication helpers:

```typescript
import { loginAndSelectRegion, logout } from '@fixtures/authFixture';

await loginAndSelectRegion(page, 'US');
// ... perform test actions
await logout(page);
```

## GitHub Actions CI/CD

The framework includes GitHub Actions workflow for automated testing:

### Workflow Features

- Triggers on push to main/develop and pull requests
- Matrix strategy for multi-browser and multi-region testing
- Parallel test execution
- Artifact upload (reports and screenshots)
- PR comments with test results

### Environment Variables

Set the following secrets in GitHub repository settings:

- `BASE_URL` - Application URL (defaults to https://ecommerce-app.example.com)

### Workflow File

Location: `.github/workflows/playwright.yml`

### Running Workflow

Tests run automatically on:
- Push to main or develop branches
- Pull requests to main or develop branches

## Best Practices

1. **Use fixtures** for common setup/teardown operations
2. **Leverage element helper** for consistent element interactions
3. **Log steps** using logStep() for better test visibility
4. **Use region-specific data** through testDataHelper
5. **Keep tests focused** - one logical assertion per test
6. **Use meaningful test names** that describe what's being tested
7. **Handle errors gracefully** with try-catch blocks
8. **Clean up resources** in test teardown

## Test Writing Examples

### Simple Login Test

```typescript
import { test, expect } from '@playwright/test';
import { loginAndSelectRegion } from '@fixtures/authFixture';
import { logStep } from '@utils/logger';

test('should login and select region', async ({ page }) => {
  await loginAndSelectRegion(page, 'US');
  logStep('Verifying welcome message');
  await expect(page.locator('text=Welcome')).toBeVisible();
});
```

### Region Loop Test

```typescript
import { getAllRegions } from '@utils/testDataHelper';

const regions = getAllRegions();

for (const region of regions) {
  test(`should work for ${region}`, async ({ page }) => {
    // Test implementation
  });
}
```

## Troubleshooting

### Tests fail with timeout

- Increase `TIMEOUT` in .env
- Check BASE_URL is correct
- Verify network connectivity

### Screenshots not captured

- Ensure `CAPTURE_SCREENSHOTS=true` in .env
- Check `reports/` folder has write permissions

### Region credentials invalid

- Verify credentials in `data/regions.json`
- Test each region manually
- Check if credentials need region-specific formatting

### Tests fail locally but pass in CI

- Check environment variables
- Verify browser installations
- Compare local and CI dependencies versions

## Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright GitHub](https://github.com/microsoft/playwright)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: March 2, 2026
**Framework Version**: 1.0.0
**Playwright Version**: 1.48.1+
