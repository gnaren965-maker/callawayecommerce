/**
 * Authentication fixture for Playwright tests
 * Provides pre-authenticated page context for tests
 */

import { test as baseTest, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { ElementHelper, createElementHelper } from '../utils/elementHelper';
import { getRegionData, TEST_SELECTORS } from '../utils/testDataHelper';
import { logStep } from '../utils/logger';

export interface AuthFixtureContext {
  authenticatedPage: Page;
  elementHelper: ElementHelper;
}

/**
 * Custom test fixture that provides an authenticated page
 */
export const test = baseTest.extend<AuthFixtureContext>({
  authenticatedPage: async ({ page }, use) => {
    // Fixture setup - authenticate before test runs
    // This can be used by tests that require pre-authentication
    await use(page);
    // Cleanup after test
    await page.close();
  },

  elementHelper: async ({ page }, use) => {
    const helper = createElementHelper(page);
    await use(helper);
  },
});

/**
 * Helper function to authenticate and select region
 */
export async function loginAndSelectRegion(
  page: Page,
  region: string,
  baseUrl?: string
): Promise<void> {
  const url = baseUrl || process.env.BASE_URL || 'https://ecommerce-app.example.com';

  logStep(`Navigating to base URL: ${url}`);
  await page.goto(url);

  const regionData = getRegionData(region);

  logStep(`Logging in with ${region} credentials`);
  await page.fill(TEST_SELECTORS.USERNAME_INPUT, regionData.username);
  await page.fill(TEST_SELECTORS.PASSWORD_INPUT, regionData.password);
  await page.click(TEST_SELECTORS.SUBMIT_BUTTON);

  // Wait for login to complete
  await page.waitForNavigation({ timeout: 5000 }).catch(() => {
    // Navigation might not happen in some cases, that's ok
  });

  logStep(`Selecting region: ${region}`);
  await page.selectOption(TEST_SELECTORS.REGION_DROPDOWN, { label: region });

  logStep('Verifying login success');
  await expect(page.locator(TEST_SELECTORS.WELCOME_MESSAGE)).toBeVisible({ timeout: 5000 });
}

/**
 * Helper function to logout
 */
export async function logout(page: Page): Promise<void> {
  logStep('Logging out');
  await page.click(TEST_SELECTORS.LOGOUT_LINK);
  await expect(page.locator(TEST_SELECTORS.LOGIN_HEADER)).toBeVisible({ timeout: 5000 });
}

export { expect };
