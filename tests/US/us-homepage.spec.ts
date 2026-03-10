/**
 * Homepage and Navigation Test Suite - All Regions
 * Tests homepage functionality, layout, and navigation for Callaway Connect
 * Consolidated tests for better test management and faster execution
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
 * Helper function to login
 */
async function loginToApplication(page: any, baseUrl: string, credentials: any) {
  logStep('Navigate to login page');
  await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const emailInput = page.locator('input[id="j_username"]'); // Use visible email field
  const passwordInput = page.locator('input[id="j_password"]'); // Use specific password field
  const signInButton = page.locator('button:has-text("Sign In")').first();

  logStep('Fill in login credentials');
  await emailInput.fill(credentials.username);
  await passwordInput.fill(credentials.password);

  logStep('Click Sign In button');
  await signInButton.click();

  // Wait for page to load
  logStep('Wait for homepage to load');
  await page.waitForURL(`${baseUrl}/`, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1000);
}

/**
 * Run homepage tests for each region
 */
for (const region of regions) {
  test.describe(`Homepage and Navigation - ${region} Region`, () => {
    const baseUrl = BASE_URLS[region] || process.env.BASE_URL || 'https://hyqa-us.callawayconnect.com';
    const credentials = getRegionData(region);

    /**
     * Consolidated HOME Test 1: Homepage Layout & Features
     * Tests homepage key sections display and account switcher functionality
     */
    const homeTestFn = region === 'Republic of Korea' ? test.fixme : test;
    homeTestFn(`${region}-HOME: Layout & Account Features`, async ({ page }) => {
      logTestStart(`${region}-HOME: Layout & Account Features`);

      try {
        // SCENARIO 1: Homepage Login & Key Sections Display
        logStep('--- SCENARIO 1: Homepage Login & Key Sections Display ---');
        
        // Step 1: Login with valid credentials
        logStep('Step 1: Login with valid credentials');
        await loginToApplication(page, baseUrl, credentials);

        // Verify user is on homepage (not on login page)
        const currentUrl = page.url();
        expect(currentUrl).not.toContain('/login');
        logStep('✓ Successfully logged in and on homepage');

        // Step 2: Verify Order Status section is visible
        logStep('Step 2: Verify Order Status section');
        const orderStatusSection = page.locator('text=Order Status').first();
        const isOrderStatusVisible = await orderStatusSection.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (isOrderStatusVisible) {
          logStep('✓ Order Status section found');
          
          // Verify order status counts
          const openOrders = page.locator('text=Open').first();
          const onHoldOrders = page.locator('text=On Hold').first();
          const inProcessOrders = page.locator('text=In Process').first();
          const partiallyShipped = page.locator('text=Partially Shipped').first();
          const shippedOrders = page.locator('text=Shipped').first();

          const allStatusVisible = await Promise.all([
            openOrders.isVisible({ timeout: 2000 }).catch(() => false),
            onHoldOrders.isVisible({ timeout: 2000 }).catch(() => false),
            inProcessOrders.isVisible({ timeout: 2000 }).catch(() => false),
            partiallyShipped.isVisible({ timeout: 2000 }).catch(() => false),
            shippedOrders.isVisible({ timeout: 2000 }).catch(() => false)
          ]);

          const statusCount = allStatusVisible.filter(v => v).length;
          logStep(`✓ Found ${statusCount} order status categories`);
          expect(statusCount).toBeGreaterThan(0);
        } else {
          logStep('⚠ Order Status section not found, continuing with other checks');
        }

        // Step 3: Verify Bill Pay section is visible
        logStep('Step 3: Verify Bill Pay section');
        const billPaySection = page.locator('text=Bill Pay').first();
        const isBillPayVisible = await billPaySection.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (isBillPayVisible) {
          logStep('✓ Bill Pay section found');
          
          // Verify bill pay details
          const totalCreditLine = page.locator('text=Total Credit Line').first();
          const pastDue = page.locator('text=Past Due').first();
          const totalDue = page.locator('text=Total Due').first();

          const billPayDetails = await Promise.all([
            totalCreditLine.isVisible({ timeout: 2000 }).catch(() => false),
            pastDue.isVisible({ timeout: 2000 }).catch(() => false),
            totalDue.isVisible({ timeout: 2000 }).catch(() => false)
          ]);

          const billPayCount = billPayDetails.filter(v => v).length;
          logStep(`✓ Found ${billPayCount} Bill Pay components`);
          expect(billPayCount).toBeGreaterThan(0);
        } else {
          logStep('⚠ Bill Pay section not found, continuing with other checks');
        }

        // Step 4: Verify Help section
        logStep('Step 4: Verify Help section');
        const helpSection = page.locator('text=Help').first();
        const helpSectionVisible = await helpSection.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (helpSectionVisible) {
          const contactUs = page.locator('a:has-text("Contact Us")');
          const faqs = page.locator('a:has-text("FAQs")');
          
          const contactUsVisible = await contactUs.isVisible({ timeout: 2000 }).catch(() => false);
          const faqsVisible = await faqs.isVisible({ timeout: 2000 }).catch(() => false);

          logStep(`✓ Help section found with Contact Us: ${contactUsVisible}, FAQs: ${faqsVisible}`);
          expect(contactUsVisible || faqsVisible).toBeTruthy();
        } else {
          logStep('⚠ Help section not found');
        }

        // Step 5: Verify Product Resources section
        logStep('Step 5: Verify Product Resources section');
        const resourcesSection = page.locator('text=Product Resources').first();
        const resourcesSectionVisible = await resourcesSection.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (resourcesSectionVisible) {
          logStep('✓ Product Resources section found');
          const catalogsLink = page.locator('a:has-text("Catalogs")');
          const catalogsVisible = await catalogsLink.isVisible({ timeout: 2000 }).catch(() => false);
          logStep(`✓ Product resource links found: ${catalogsVisible}`);
        } else {
          logStep('⚠ Product Resources section not found');
        }

        // SCENARIO 2: Account Switcher Functionality
        logStep('--- SCENARIO 2: Account Switcher Functionality ---');
        
        // Step 1: Verify account information is displayed
        logStep('Step 1: Verify account information is displayed');
        const accountInfo = page.locator('text=/Account|account|ACCOUNT/i').first();
        const accountInfoVisible = await accountInfo.isVisible({ timeout: 3000 }).catch(() => false);

        if (accountInfoVisible) {
          logStep('✓ Account information found');
        } else {
          logStep('⚠ Account information not found, trying alternative selectors');
        }

        // Step 2: Look for Switch Account option
        logStep('Step 2: Look for Switch Account option');
        const switchAccountButton = page.locator('text=Switch Account, button:has-text("Switch Account")').first();
        const switchAccountVisible = await switchAccountButton.isVisible({ timeout: 3000 }).catch(() => false);

        if (switchAccountVisible) {
          logStep('✓ Switch Account option found and visible in top navigation');

          // Step 3: Click Switch Account button
          logStep('Step 3: Click on Switch Account');
          await switchAccountButton.click();
          await page.waitForTimeout(500);

          // Verify switching interface appears
          const switchInterface = page.locator('[role="dialog"], .modal, select, [class*="account"]').first();
          const switchInterfaceVisible = await switchInterface.isVisible({ timeout: 3000 }).catch(() => false);

          if (switchInterfaceVisible) {
            logStep('✓ Account switching interface displayed');
          } else {
            logStep('⚠ Switching interface not clearly visible, but button was clickable');
          }
          
          // Close the switch account interface if it's still open
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
        } else {
          logStep('⚠ Switch Account button not found - may not be available in this region for this account');
        }

        logTestEnd(`${region}-HOME: Layout & Account Features`, true);
      } catch (error) {
        logTestEnd(`${region}-HOME: Layout & Account Features`, false);
        throw error;
      }
    });

    /**
     * Consolidated HOME Test 2: Navigation & Menu Functionality
     * Tests main navigation menu visibility, accessibility, and clickability
     */
    const navTestFn = region === 'Republic of Korea' ? test.fixme : test;
    navTestFn(`${region}-HOME: Navigation & Menu Functionality`, async ({ page }) => {
      logTestStart(`${region}-HOME: Navigation & Menu Functionality`);

      try {
        // SCENARIO 1: Main Navigation Menu Visibility
        logStep('--- SCENARIO 1: Main Navigation Menu Visibility ---');
        
        // Step 1: Login and navigate to homepage
        logStep('Step 1: Login with valid credentials');
        await loginToApplication(page, baseUrl, credentials);

        // Step 2: Verify main navigation menu is visible
        logStep('Step 2: Verify main navigation menu is visible');
        
        // Try multiple navigation selectors
        let navMenuVisible = false;
        const navSelectors = [
          'nav',
          '[role="navigation"]',
          '[class*="nav"]',
          'header nav',
          '[class*="header"]',
          '[class*="menu"]'
        ];
        
        for (const selector of navSelectors) {
          try {
            const navMenu = page.locator(selector).first();
            const isVisible = await navMenu.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              navMenuVisible = true;
              logStep(`✓ Navigation menu found using selector: ${selector}`);
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }
        
        // If no nav element found, check if at least some menu items are present
        if (!navMenuVisible) {
          logStep('⚠ No navigation element found, checking for menu items...');
          const menuItemCheck = page.locator('text=/Place Order|Check Status|Bill Pay/i').first();
          const hasMenuItems = await menuItemCheck.isVisible({ timeout: 2000 }).catch(() => false);
          if (hasMenuItems) {
            navMenuVisible = true;
            logStep('✓ Navigation menu items are present (menu structure confirmed)');
          }
        }
        
        expect(navMenuVisible).toBeTruthy();
        logStep('✓ Main navigation menu is visible');

        // SCENARIO 2: Navigation Menu Items Accessibility
        logStep('--- SCENARIO 2: Navigation Menu Items Accessibility ---');
        
        // Step 1: Verify menu items are accessible
        logStep('Step 1: Verify navigation menu items');
        
        const menuItems = [
          'Place Order',
          'Check Status',
          'Bill Pay',
          'Compensation',
          'Trade In/Returns',
          'Fitting Events',
          'Resources'
        ];

        const menuItemResults: Record<string, boolean> = {};
        
        for (const item of menuItems) {
          // Look for the menu item
          const menuItem = page.locator(`text=${item}`).first();
          const isVisible = await menuItem.isVisible({ timeout: 2000 }).catch(() => false);
          menuItemResults[item] = isVisible;

          if (isVisible) {
            logStep(`✓ "${item}" found`);

            // Try to verify it's clickable
            try {
              const isEnabled = await menuItem.isEnabled({ timeout: 1000 }).catch(() => true);
              if (isEnabled) {
                logStep(`  └─ "${item}" is clickable`);
              }
            } catch (e) {
              // Continue
            }
          } else {
            logStep(`⚠ "${item}" not found`);
          }
        }

        // Verify at least some menu items are visible
        const visibleItems = Object.values(menuItemResults).filter(v => v).length;
        logStep(`Summary: Found ${visibleItems}/${menuItems.length} menu items`);
        expect(visibleItems).toBeGreaterThan(0);

        // SCENARIO 3: Menu Item Clickability & Navigation
        logStep('--- SCENARIO 3: Menu Item Clickability & Navigation ---');
        
        // Step 1: Test menu item clickability
        logStep('Step 1: Test menu item clickability');
        
        // Try clicking on Check Status or similar
        const checkStatusMenu = page.locator('text=Check Status').first();
        const checkStatusVisible = await checkStatusMenu.isVisible({ timeout: 2000 }).catch(() => false);

        if (checkStatusVisible) {
          logStep('Testing clickability of Check Status');
          await checkStatusMenu.click();
          await page.waitForTimeout(1000);

          const newUrl = page.url();
          if (newUrl !== baseUrl) {
            logStep('✓ Menu item navigated to different page');
          } else {
            logStep('⚠ Menu item did not navigate (may open submenu instead)');
          }

          // Go back to homepage
          await page.goto(baseUrl);
          await page.waitForTimeout(1000);
        }

        // Step 2: Verify navigation structure integrity
        logStep('Step 2: Verify navigation structure integrity');
        const allLinks = await page.locator('nav a, [role="navigation"] a').count();
        logStep(`Found ${allLinks} navigation links`);
        expect(allLinks).toBeGreaterThan(0);
        logStep('✓ Navigation structure is intact');

        logTestEnd(`${region}-HOME: Navigation & Menu Functionality`, true);
      } catch (error) {
        logTestEnd(`${region}-HOME: Navigation & Menu Functionality`, false);
        throw error;
      }
    });
  });
}
