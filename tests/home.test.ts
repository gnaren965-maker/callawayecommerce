/**
 * Home Page Test Suite
 * Tests home page functionality after login
 */

import { test, expect } from '@playwright/test';
import { getAllRegions, TEST_SELECTORS, TEST_TIMEOUTS } from '../utils/testDataHelper';
import { logStep, logTestStart, logTestEnd } from '../utils/logger';
import { loginAndSelectRegion } from '../fixtures/authFixture';

// Get regions for testing - Use REGION env variable or default to Canada
// Usage: REGION=US npx playwright test (for US)
//        REGION=all npx playwright test (for all regions)
//        npx playwright test (default: Canada)
const selectedRegion = process.env.REGION || 'Canada';
const regions = selectedRegion.toLowerCase() === 'all'
  ? getAllRegions()
  : getAllRegions().filter(region => region === selectedRegion);

/**
 * Run home page tests for Canada region only
 */
for (const region of regions) {
  test.describe(`Home page - ${region}`, () => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';

    test.beforeEach(async ({ page }) => {
      // Login and select region before each test
      await loginAndSelectRegion(page, region, baseUrl);
    });

    test(`should display welcome message for ${region}`, async ({ page }) => {
      logTestStart(`Verify welcome message for ${region}`);

      try {
        logStep('Verifying welcome message is visible');
        await expect(page.locator(TEST_SELECTORS.WELCOME_MESSAGE)).toBeVisible({
          timeout: TEST_TIMEOUTS.SHORT,
        });

        logTestEnd(`Verify welcome message for ${region}`, true);
      } catch (error) {
        logTestEnd(`Verify welcome message for ${region}`, false);
        throw error;
      }
    });

    test(`should display region name ${region} on home page`, async ({ page }) => {
      logTestStart(`Verify region ${region} is displayed`);

      try {
        logStep(`Verifying ${region} region is displayed`);
        await expect(page.locator(`text=${region}`)).toBeVisible({
          timeout: TEST_TIMEOUTS.SHORT,
        });

        logTestEnd(`Verify region ${region} is displayed`, true);
      } catch (error) {
        logTestEnd(`Verify region ${region} is displayed`, false);
        throw error;
      }
    });

    test(`should have functional navigation for ${region}`, async ({ page }) => {
      logTestStart(`Verify navigation for ${region}`);

      try {
        logStep('Verifying navigation menu is visible');
        const navElement = page.locator('nav');
        await expect(navElement).toBeVisible({ timeout: TEST_TIMEOUTS.SHORT });

        logStep('Verifying navigation contains expected links');
        const links = await page.locator('nav a').count();
        expect(links).toBeGreaterThan(0);

        logTestEnd(`Verify navigation for ${region}`, true);
      } catch (error) {
        logTestEnd(`Verify navigation for ${region}`, false);
        throw error;
      }
    });

    test(`should allow region switching from home page for ${region}`, async ({ page }) => {
      logTestStart(`Verify region switching for ${region}`);

      try {
        logStep('Verifying region dropdown is visible');
        await expect(page.locator(TEST_SELECTORS.REGION_DROPDOWN)).toBeVisible({
          timeout: TEST_TIMEOUTS.SHORT,
        });

        logStep('Getting dropdown value');
        const selectedRegion = await page.locator(TEST_SELECTORS.REGION_DROPDOWN).inputValue();
        expect(selectedRegion).toBe(region);

        logTestEnd(`Verify region switching for ${region}`, true);
      } catch (error) {
        logTestEnd(`Verify region switching for ${region}`, false);
        throw error;
      }
    });
  });
}

/**
 * General home page tests
 */
test.describe('Home Page - General', () => {
  test('should load home page with correct title', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';
    logTestStart('Verify page title');

    try {
      await loginAndSelectRegion(page, 'US', baseUrl);
      logStep('Verifying page title');
      const title = await page.title();
      expect(title).toBeTruthy();

      logTestEnd('Verify page title', true);
    } catch (error) {
      logTestEnd('Verify page title', false);
      throw error;
    }
  });

  test('should have responsive design', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://ecommerce-app.example.com';
    logTestStart('Verify responsive design');

    try {
      await loginAndSelectRegion(page, 'US', baseUrl);

      // Test mobile viewport
      logStep('Testing mobile viewport');
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator(TEST_SELECTORS.WELCOME_MESSAGE)).toBeVisible();

      // Test tablet viewport
      logStep('Testing tablet viewport');
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator(TEST_SELECTORS.WELCOME_MESSAGE)).toBeVisible();

      // Test desktop viewport
      logStep('Testing desktop viewport');
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator(TEST_SELECTORS.WELCOME_MESSAGE)).toBeVisible();

      logTestEnd('Verify responsive design', true);
    } catch (error) {
      logTestEnd('Verify responsive design', false);
      throw error;
    }
  });
});
