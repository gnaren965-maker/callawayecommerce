/**
 * Login Test Suite
 * Tests login functionality for all supported regions
 */

import { test, expect } from '@playwright/test';
import { getRegionData, getAllRegions, TEST_SELECTORS, TEST_TIMEOUTS } from '../utils/testDataHelper';
import { logStep, logTestStart, logTestEnd } from '../utils/logger';
import { createElementHelper } from '../utils/elementHelper';

// Get regions for testing - Use REGION env variable or default to Canada
// Usage: REGION=US npx playwright test (for US)
//        REGION=all npx playwright test (for all regions)
//        npx playwright test (default: Canada)
const selectedRegion = process.env.REGION || 'Canada';
const regions = selectedRegion.toLowerCase() === 'all'
  ? getAllRegions()
  : getAllRegions().filter(region => region === selectedRegion);

/**
 * Run login tests for Canada region only
 */
for (const region of regions) {
  test.describe(`Login flow - ${region}`, () => {
    const regionData = getRegionData(region);
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';

    test(`should login with ${region} credentials`, async ({ page }) => {
      logTestStart(`Login with ${region} credentials`);
      const elementHelper = createElementHelper(page);

      try {
        // Navigate to login page
        logStep('Navigating to base URL');
        await page.goto(baseUrl);

        // Verify login page is visible
        await expect(page.locator(TEST_SELECTORS.LOGIN_HEADER)).toBeVisible({
          timeout: TEST_TIMEOUTS.SHORT,
        });

        // Enter credentials
        logStep(`Logging in with ${region} credentials`);
        await elementHelper.fillInput(TEST_SELECTORS.USERNAME_INPUT, regionData.username);
        await elementHelper.fillInput(TEST_SELECTORS.PASSWORD_INPUT, regionData.password);

        // Submit login form
        await elementHelper.click(TEST_SELECTORS.SUBMIT_BUTTON);

        // Wait for navigation
        await page.waitForNavigation({ timeout: TEST_TIMEOUTS.MEDIUM }).catch(() => {
          // Navigation might not always occur
        });

        // Verify successful login by checking for region dropdown
        await expect(page.locator(TEST_SELECTORS.REGION_DROPDOWN)).toBeVisible({
          timeout: TEST_TIMEOUTS.MEDIUM,
        });

        logTestEnd(`Login with ${region} credentials`, true);
      } catch (error) {
        logTestEnd(`Login with ${region} credentials`, false);
        throw error;
      }
    });

    test(`should login and select region ${region}`, async ({ page }) => {
      logTestStart(`Login and select region ${region}`);
      const elementHelper = createElementHelper(page);

      try {
        // Navigate to login page
        logStep('Navigating to base URL');
        await page.goto(baseUrl);

        // Enter credentials
        logStep(`Logging in with ${region} credentials`);
        await elementHelper.fillInput(TEST_SELECTORS.USERNAME_INPUT, regionData.username);
        await elementHelper.fillInput(TEST_SELECTORS.PASSWORD_INPUT, regionData.password);
        await elementHelper.click(TEST_SELECTORS.SUBMIT_BUTTON);

        // Wait for page to load
        await page.waitForNavigation({ timeout: TEST_TIMEOUTS.MEDIUM }).catch(() => {
          // Navigation might not always occur
        });

        // Select region from dropdown
        logStep(`Selecting region: ${region}`);
        await elementHelper.selectOption(TEST_SELECTORS.REGION_DROPDOWN, { label: region });

        // Verify region selection and successful login
        logStep('Verifying home page');
        await expect(page.locator(TEST_SELECTORS.WELCOME_MESSAGE)).toBeVisible({
          timeout: TEST_TIMEOUTS.MEDIUM,
        });

        logTestEnd(`Login and select region ${region}`, true);
      } catch (error) {
        logTestEnd(`Login and select region ${region}`, false);
        throw error;
      }
    });
  });
}

/**
 * Test invalid credentials
 */
test.describe('Login validation', () => {
  test('should reject invalid username', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';
    const elementHelper = createElementHelper(page);

    logStep('Navigating to login page');
    await page.goto(baseUrl);

    logStep('Entering invalid username');
    await elementHelper.fillInput(TEST_SELECTORS.USERNAME_INPUT, 'invalid_user');
    await elementHelper.fillInput(TEST_SELECTORS.PASSWORD_INPUT, 'any_password');
    await elementHelper.click(TEST_SELECTORS.SUBMIT_BUTTON);

    // Verify error message appears
    await expect(page.locator('text=Invalid credentials')).toBeVisible({
      timeout: TEST_TIMEOUTS.SHORT,
    });
  });

  test('should reject invalid password', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';
    const elementHelper = createElementHelper(page);
    const regionData = getRegionData('US');

    logStep('Navigating to login page');
    await page.goto(baseUrl);

    logStep('Entering valid username but invalid password');
    await elementHelper.fillInput(TEST_SELECTORS.USERNAME_INPUT, regionData.username);
    await elementHelper.fillInput(TEST_SELECTORS.PASSWORD_INPUT, 'wrong_password');
    await elementHelper.click(TEST_SELECTORS.SUBMIT_BUTTON);

    // Verify error message appears
    await expect(page.locator('text=Invalid credentials')).toBeVisible({
      timeout: TEST_TIMEOUTS.SHORT,
    });
  });
});
