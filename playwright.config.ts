import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 60000,
  reporter: [
    ['list'],                                    // console output in Jenkins logs
    ['html', { outputFolder: 'reports/html' }],  // Playwright HTML report (optional)
    ['allure-playwright']                        // Allure results for Jenkins plugin
  ],
  use: {
    trace: 'on-first-retry',
    headless: process.env.HEAD_MODE !== 'headed', // toggle via Jenkins parameter
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: process.env.HEAD_MODE !== 'headed' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: process.env.HEAD_MODE !== 'headed' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: process.env.HEAD_MODE !== 'headed' },
    },
  ],
});
