/**
 * Logout Test Suite
 * Tests logout functionality for all supported regions
 */

import { test, expect } from '@playwright/test';
import { getAllRegions, TEST_SELECTORS, TEST_TIMEOUTS } from '../utils/testDataHelper';
import { logStep, logTestStart, logTestEnd } from '../utils/logger';
import { loginAndSelectRegion, logout } from '../fixtures/authFixture';

// Get regions for testing - Use REGION env variable or default to Canada
// Usage: REGION=US npx playwright test (for US)
//        REGION=all npx playwright test (for all regions)
//        npx playwright test (default: Canada)
const selectedRegion = process.env.REGION || 'Canada';
const regions = selectedRegion.toLowerCase() === 'all'
  ? getAllRegions()
  : getAllRegions().filter(region => region === selectedRegion);

/**
 * Run logout tests for Canada region only
 */
for (const region of regions) {
  test.describe(`Logout flow - ${region}`, () => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';

    test(`should logout from ${region} session`, async ({ page }) => {
      logTestStart(`Logout from ${region} session`);

      try {
        // Login and select region
        await loginAndSelectRegion(page, region, baseUrl);

        // Logout
        await logout(page);

        // Verify logout success - should be back at login page
        logStep('Verifying return to login page');
        await expect(page.locator(TEST_SELECTORS.LOGIN_HEADER)).toBeVisible({
          timeout: TEST_TIMEOUTS.MEDIUM,
        });

        logTestEnd(`Logout from ${region} session`, true);
      } catch (error) {
        logTestEnd(`Logout from ${region} session`, false);
        throw error;
      }
    });

    test(`should clear session data after logout for ${region}`, async ({ page }) => {
      logTestStart(`Verify session clear for ${region}`);

      try {
        // Login and select region
        await loginAndSelectRegion(page, region, baseUrl);

        logStep('Capturing welcome message');
        const welcomeLocator = page.locator(TEST_SELECTORS.WELCOME_MESSAGE);
        await expect(welcomeLocator).toBeVisible({ timeout: TEST_TIMEOUTS.SHORT });

        // Logout
        await logout(page);

        // Verify session is cleared
        logStep('Verifying welcome message is no longer visible');
        await expect(welcomeLocator).not.toBeVisible({ timeout: TEST_TIMEOUTS.SHORT });

        logTestEnd(`Verify session clear for ${region}`, true);
      } catch (error) {
        logTestEnd(`Verify session clear for ${region}`, false);
        throw error;
      }
    });

    test(`should require re-login after logout for ${region}`, async ({ page }) => {
      logTestStart(`Verify re-login required after logout for ${region}`);

      try {
        // Login and select region
        await loginAndSelectRegion(page, region, baseUrl);
        logStep('User logged in successfully');

        // Logout
        await logout(page);
        logStep('User logged out');

        // Verify login page is displayed
        logStep('Verifying login page is displayed');
        await expect(page.locator(TEST_SELECTORS.LOGIN_HEADER)).toBeVisible({
          timeout: TEST_TIMEOUTS.SHORT,
        });

        // Verify login form elements are accessible
        logStep('Verifying login form elements are accessible');
        await expect(page.locator(TEST_SELECTORS.USERNAME_INPUT)).toBeVisible({
          timeout: TEST_TIMEOUTS.SHORT,
        });
        await expect(page.locator(TEST_SELECTORS.PASSWORD_INPUT)).toBeVisible({
          timeout: TEST_TIMEOUTS.SHORT,
        });
        await expect(page.locator(TEST_SELECTORS.SUBMIT_BUTTON)).toBeVisible({
          timeout: TEST_TIMEOUTS.SHORT,
        });

        logTestEnd(`Verify re-login required after logout for ${region}`, true);
      } catch (error) {
        logTestEnd(`Verify re-login required after logout for ${region}`, false);
        throw error;
      }
    });
  });
}

/**
 * General logout tests
 */
test.describe('Logout - General', () => {
  test('should have logout button visible on home page', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';
    logTestStart('Verify logout button is visible');

    try {
      await loginAndSelectRegion(page, 'US', baseUrl);

      logStep('Verifying logout button is visible');
      await expect(page.locator(TEST_SELECTORS.LOGOUT_LINK)).toBeVisible({
        timeout: TEST_TIMEOUTS.SHORT,
      });

      logTestEnd('Verify logout button is visible', true);
    } catch (error) {
      logTestEnd('Verify logout button is visible', false);
      throw error;
    }
  });

  test('should handle multiple logout attempts gracefully', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';
    logTestStart('Verify multiple logout handling');

    try {
      await loginAndSelectRegion(page, 'US', baseUrl);

      // First logout
      logStep('Performing first logout');
      await logout(page);

      // Try to logout again - should fail gracefully
      logStep('Attempting second logout (should redirect to login)');
      try {
        await page.click(TEST_SELECTORS.LOGOUT_LINK);
      } catch {
        // Expected - logout link won't exist on login page
      }

      // Verify we're at login page
      await expect(page.locator(TEST_SELECTORS.LOGIN_HEADER)).toBeVisible({
        timeout: TEST_TIMEOUTS.SHORT,
      });

      logTestEnd('Verify multiple logout handling', true);
    } catch (error) {
      logTestEnd('Verify multiple logout handling', false);
      throw error;
    }
  });

  test('should preserve user session during active use', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';
    logTestStart('Verify session persistence');

    try {
      await loginAndSelectRegion(page, 'US', baseUrl);

      logStep('Verifying welcome message is visible');
      const welcomeLocator = page.locator(TEST_SELECTORS.WELCOME_MESSAGE);
      await expect(welcomeLocator).toBeVisible({ timeout: TEST_TIMEOUTS.SHORT });

      // Wait a bit to ensure session is maintained
      logStep('Waiting to verify session is maintained');
      await page.waitForTimeout(2000);

      // Verify session still exists
      logStep('Verifying session is still active');
      await expect(welcomeLocator).toBeVisible({ timeout: TEST_TIMEOUTS.SHORT });

      logTestEnd('Verify session persistence', true);
    } catch (error) {
      logTestEnd('Verify session persistence', false);
      throw error;
    }
  });
});
