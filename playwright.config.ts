import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 60000,
  reporter: [
    ['list'],                                    // console output
    ['html', { outputFolder: 'reports/html' }],  // HTML report
    ['allure-playwright']                        // Allure report
  ],
  use: {
    trace: 'on-first-retry',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: false },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: false },
    },
  ],
});
