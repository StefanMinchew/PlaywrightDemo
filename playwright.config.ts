import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(__filename);
export const STORAGE_STATE_E2E = path.join(
  __dirname,
  'playwright/auth/e2eStorageState.json',
);

const requiredEnvVariables = [
  'BASE_URL',
  'USER_STANDARD_USERNAME',
  'USER_STANDARD_PASSWORD',
  'USER_LOCKEDOUT_USERNAME',
  'USER_LOCKEDOUT_PASSWORD',
  'USER_PROBLEM_USERNAME',
  'USER_PROBLEM_PASSWORD',
  'USER_PERFORMANCEGLITCH_USERNAME',
  'USER_PERFORMANCEGLITCH_PASSWORD',
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './playwright/tests/',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['allure-playwright']],
  /* Maximum time one test can run for */
  timeout: 20 * 1000,
  /* Maximum time expect() should wait for condition to be met */
  expect: {
    timeout: 10 * 1000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL!,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: './playwright',
      testMatch: '*login.setup.ts',
      use: {
        storageState: { cookies: [], origins: [] },
      },
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        storageState: STORAGE_STATE_E2E,
      },
    },

    {
      name: 'firefox',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        storageState: STORAGE_STATE_E2E,
      },
    },

    {
      name: 'webkit',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
        storageState: STORAGE_STATE_E2E,
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'android',
      dependencies: ['setup'],
      use: { ...devices['Pixel 5'], storageState: STORAGE_STATE_E2E },
    },
    {
      name: 'ios',
      dependencies: ['setup'],
      use: { ...devices['iPhone 12'], storageState: STORAGE_STATE_E2E },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
