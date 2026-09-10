import { defineConfig } from '@playwright/test';

const externalBaseURL = process.env.BASE_URL;
const baseURL = externalBaseURL ?? 'http://127.0.0.1:8000';

export default defineConfig({
  testDir: './tests',

  webServer: externalBaseURL
    ? undefined
    : {
        command: 'npm --prefix .. run preview -- --host 127.0.0.1',
        url: baseURL,
        reuseExistingServer: true,
      },

  use: {
    baseURL,
    trace: 'retain-on-failure',
  },

  retries: process.env.CI ? 2 : 0,

  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : 'list',
});
