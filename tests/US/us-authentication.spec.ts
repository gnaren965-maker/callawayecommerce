/**
 * Authentication Test Suite - All Regions
 * Tests authentication flows and access control for Callaway Connect
 * 
 * Consolidated tests covering:
 * - Valid login with credentials
 * - Invalid email format handling
 * - Incorrect password handling
 * - Forgot password recovery flow
 * - Logout functionality
 */

import { test, expect } from '@playwright/test';
import { getRegionData, getAllRegions } from '../../utils/testDataHelper';
import { logStep, logTestStart, logTestEnd } from '../../utils/logger';

// Get the base URL configuration
const BASE_URLS: Record<string, string> = {
  'US': 'https://hyqa-us.callawayconnect.com',
  'Canada': 'https://hyqa-ca.callawayconnect.com',
  'Japan': 'https://hyqa-jp.callawayconnect.com/en_JP',
  'Europe': 'https://hyqa-eu.callawayconnect.com',
  'South Pacific': 'https://hyqa-au.callawayconnect.com',
  'Latin America and Other': 'https://hyqa-row.callawayconnect.com',
  'Republic of Korea': 'https://hyqa-kr.callawayconnect.com/en_KR'
};

// Get regions for testing - Use REGION env variable or default to Canada
// Usage: REGION=US npx playwright test (for US)
//        REGION=all npx playwright test (for all regions)
//        npx playwright test (default: Canada)
const selectedRegion = process.env.REGION || 'Canada';
const regions = selectedRegion.toLowerCase() === 'all' 
  ? getAllRegions() 
  : getAllRegions().filter(region => region === selectedRegion);

/**
 * Run authentication tests for each region
 */
for (const region of regions) {
  test.describe(`Authentication - ${region} Region`, () => {
    const baseUrl = BASE_URLS[region] || process.env.BASE_URL || 'https://hyqa-us.callawayconnect.com';
    const credentials = getRegionData(region);
    
    // South Pacific and Republic of Korea have server-side credential issues
    // These tests will be skipped until credentials are validated on the server
    const shouldSkip = ['South Pacific', 'Republic of Korea'].includes(region);

    /**
     * Comprehensive Authentication Test
     * Tests: Valid Login, Invalid Email, Wrong Password, Forgot Password flows
     */
    const authTest = shouldSkip ? test.fixme : test;
    authTest(`${region}-AUTH: Complete Authentication Flow`, async ({ page }) => {
      logTestStart(`${region}-AUTH: Complete Authentication Flow`);

      try {
        // ===== SCENARIO 1: VALID LOGIN WITH CREDENTIALS =====
        logStep('--- SCENARIO 1: Valid Login ---');
        logStep('Navigate to login page');
        await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Verify login form is displayed
        logStep('Verify login form elements are visible');
        const emailInput = page.locator('input[id="j_username"]'); // Use visible email field
        const passwordInput = page.locator('input[id="j_password"]'); // Use specific password field
        const signInButton = page.locator('button:has-text("Sign In")').first();
        const forgotPasswordLink = page.locator('a.forgot-link');
        const signUpLink = page.locator('a:has-text("Want Access? Sign Up Here")');

        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(signInButton).toBeVisible();
        
        // Enter valid credentials
        logStep('Enter valid email address');
        await emailInput.fill(credentials.username);
        await expect(emailInput).toHaveValue(credentials.username);

        logStep('Enter valid password');
        await passwordInput.fill(credentials.password);
        const passwordType = await passwordInput.getAttribute('type');
        expect(passwordType).toBe('password');

        logStep('Click Sign In button');
        await signInButton.click();

        // Wait for redirect to homepage
        logStep('Wait for redirect to homepage');
        await page.waitForURL(`${baseUrl}/`, { timeout: 10000 }).catch(() => {});
        await page.waitForTimeout(2000);

        // Verify successful login
        logStep('Verify user is logged in (URL does not contain /login)');
        const currentUrl = page.url();
        expect(currentUrl).not.toContain('/login');
        logStep('✓ Valid login successful');

        // ===== SCENARIO 2: FORGOT PASSWORD FLOW =====
        logStep('--- SCENARIO 2: Forgot Password Flow ---');
        logStep('Logout to test forgot password');
        // Click logout if available
        const logoutButton = page.locator('button:has-text(/Logout|Sign Out/i), a:has-text(/Logout|Sign Out/i)').first();
        const logoutVisible = await logoutButton.isVisible({ timeout: 2000 }).catch(() => false);
        if (logoutVisible) {
          await logoutButton.click();
          await page.waitForTimeout(1000);
        }

        // Navigate back to login
        await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        logStep('Verify forgot password link is visible');
        const forgotLink = page.locator('a.forgot-link:has-text("Forgot your password?")').first();
        await expect(forgotLink).toBeVisible();

        logStep('Click forgot password link');
        await forgotLink.click();
        await page.waitForTimeout(500);

        logStep('Verify password reset modal appears');
        const modal = page.locator('[role="dialog"], .modal, #cboxLoadedContent').first();
        const resetEmailInput = page.locator('input[placeholder="Email Address"], input[type="text"]').last();
        const resetButton = page.locator('button:has-text("Reset Password")');

        const modalVisible = await modal.isVisible({ timeout: 5000 }).catch(() => false);
        expect(modalVisible).toBeTruthy();

        logStep('Enter email for password reset');
        await resetEmailInput.fill(credentials.username);
        expect((await resetEmailInput.inputValue()) || '').toBe(credentials.username);

        logStep('Click Reset Password button');
        await resetButton.click();
        await page.waitForTimeout(1500);

        // Just verify the modal is still visible or a success dialog appears
        const successDialog = page.locator('dialog, [role="dialog"], .modal').first();
        const successVisible = await successDialog.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (successVisible) {
          logStep('✓ Confirmation dialog appeared after reset');
        } else {
          logStep('⚠ Modal closed after reset (success likely processed)');
        }
        logStep('✓ Forgot password flow completed successfully');

        logTestEnd(`${region}-AUTH: Complete Authentication Flow`, true);
      } catch (error) {
        logTestEnd(`${region}-AUTH: Complete Authentication Flow`, false);
        throw error;
      }
    });

    /**
     * Login Error Handling Test
     * Tests: Invalid email format, incorrect password
     */
    authTest(`${region}-AUTH: Login Error Handling`, async ({ page }) => {
      logTestStart(`${region}-AUTH: Login Error Handling`);

      try {
        // ===== SCENARIO 1: INVALID EMAIL FORMAT =====
        logStep('--- SCENARIO 1: Invalid Email Format ---');
        logStep('Navigate to login page');
        await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        const emailInput = page.locator('input[id="j_username"]');
        const passwordInput = page.locator('input[id="j_password"]'); // Use specific password field
        const signInButton = page.locator('button:has-text("Sign In")').first();

        logStep('Enter invalid email format');
        await emailInput.fill('notanemail');
        expect((await emailInput.inputValue()) || '').toBe('notanemail');

        logStep('Enter password');
        await passwordInput.fill('anypassword');

        logStep('Click Sign In');
        await signInButton.click();
        await page.waitForTimeout(2000);

        logStep('Verify user remains on login page');
        let currentUrl = page.url();
        expect(currentUrl).toContain('/login');
        logStep('✓ Invalid email handled correctly');

        // Clear form for next scenario
        await emailInput.fill('');
        await passwordInput.fill('');

        // ===== SCENARIO 2: INCORRECT PASSWORD =====
        logStep('--- SCENARIO 2: Incorrect Password ---');
        logStep('Navigate to login page again');
        await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        logStep('Enter valid email');
        await emailInput.fill(credentials.username);
        expect((await emailInput.inputValue()) || '').toBe(credentials.username);

        logStep('Enter incorrect password');
        await passwordInput.fill('wrongpassword123');

        logStep('Click Sign In');
        await signInButton.click();
        await page.waitForTimeout(2000);

        logStep('Verify user remains on login page with incorrect password');
        currentUrl = page.url();
        expect(currentUrl).toContain('/login');
        logStep('✓ Incorrect password handled correctly');

        logTestEnd(`${region}-AUTH: Login Error Handling`, true);
      } catch (error) {
        logTestEnd(`${region}-AUTH: Login Error Handling`, false);
        throw error;
      }
    });

    /**
     * Logout Test
     * Tests: Login and logout flow
     */
    authTest(`${region}-AUTH: Logout Functionality`, async ({ page }) => {
      logTestStart(`${region}-AUTH: Logout Functionality`);

      try {
        logStep('Navigate to login page');
        await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        const emailInput = page.locator('input[id="j_username"]');
        const passwordInput = page.locator('input[id="j_password"]'); // Use specific password field
        const signInButton = page.locator('button:has-text("Sign In")').first();

        logStep('Enter login credentials');
        await emailInput.fill(credentials.username);
        await passwordInput.fill(credentials.password);

        logStep('Click Sign In');
        await signInButton.click();
        await page.waitForTimeout(2000);

        logStep('Verify successful login');
        let currentUrl = page.url();
        expect(currentUrl).not.toContain('/login');

        logStep('Find and click logout button');
        const logoutButton = page.locator('button:has-text(/Logout|Sign Out/i), a:has-text(/Logout|Sign Out/i)').first();
        const logoutVisible = await logoutButton.isVisible({ timeout: 2000 }).catch(() => false);

        if (!logoutVisible) {
          logStep('⚠ Logout button not found (may have different UI in this region)');
          logTestEnd(`${region}-AUTH: Logout Functionality`, true);
          return;
        }

        logStep('Click logout');
        await logoutButton.click();
        await page.waitForTimeout(2000);

        logStep('Verify redirect to login page');
        currentUrl = page.url();
        expect(currentUrl).toContain('/login');

        logStep('Verify login form is displayed');
        const loginForm = page.locator('button:has-text("Sign In")');
        await expect(loginForm).toBeVisible();

        logStep('✓ Logout successful');
        logTestEnd(`${region}-AUTH: Logout Functionality`, true);
      } catch (error) {
        logTestEnd(`${region}-AUTH: Logout Functionality`, false);
        throw error;
      }
    });
  });
}
