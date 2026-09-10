import { expect, test } from '@playwright/test';

test('WEB-DEPLOY-01 application shell loads', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);

  await expect(page.getByRole('link', { name: 'Tägliches Deutsch' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Practice' })).toBeVisible();
});
