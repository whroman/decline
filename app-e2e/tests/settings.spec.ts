import { expect, test } from '@playwright/test';

test('saves adjective settings and restores them after reload @allure.label.story:adjectives.settings @allure.id:settings.save-reload', async ({ page }) => {
  await page.goto('/#/practice/adjective-declension/settings');
  await expect(page.getByRole('heading', { name: 'Configure' })).toBeVisible();

  const gender = page.locator('.dropdown').filter({ has: page.getByText('Genus', { exact: true }) });
  await gender.locator('.Dropdown-control').click();
  await gender.getByText('Feminin', { exact: true }).click();
  await page.getByText('Save & Create', { exact: true }).click();
  await expect(page).toHaveURL(/#\/practice\/adjective-declension(?:\?|$)/);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('conjugate')!))).toMatchObject({
    gender: '1', kasus: 'nominative', nounKategorie: null, adjectiveKategorie: '0',
  });

  await page.goto('/#/practice/adjective-declension/settings');
  await page.reload();
  await expect(gender.locator('.Dropdown-control')).toHaveText('Feminin');
});
