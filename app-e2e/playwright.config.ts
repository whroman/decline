import { defineConfig } from '@playwright/test';
import output from '../tasks/checks/output.cjs';

const externalBaseURL = process.env.BASE_URL;
const baseURL = externalBaseURL ?? process.env.CHECKS_BASE_URL ?? 'http://127.0.0.1:8000';
const artifactDir = process.env.CHECKS_SUITE_DIR || output.nativeOutput('playwright');

export default defineConfig({
  testDir: './tests',
  projects: [{ name: 'chromium' }],
  forbidOnly: true,
  outputDir: `${artifactDir}/test-results`,

  webServer: externalBaseURL
    ? undefined
    : {
        command: process.env.CHECKS_PREVIEW_COMMAND || 'pnpm --dir .. run preview --host 127.0.0.1',
        url: baseURL,
        reuseExistingServer: !process.env.CHECKS_SUITE_DIR,
      },

  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  retries: process.env.CI ? 2 : 0,

  reporter: [
    [process.env.CI ? 'github' : 'list'],
    ['html', { open: 'never', outputFolder: `${artifactDir}/playwright-report` }],
    ['allure-playwright', { resultsDir: `${artifactDir}/allure-results` }],
  ],
});
