import { test, expect } from '@playwright/test';

import data from './data/data.json';

data.datapacks.forEach((packs: Record<string, any>) => {
  test(`search data pack : ${packs.country}`, async ({ page }) => {
  await page.goto('https://www.airalo.com/');
  await page.getByRole('button',{name: 'ACCEPT'}).waitFor({state: 'visible', timeout: 1500})
  await page.getByTestId('search-input').pressSequentially(packs.country)
  await page.locator(`span[data-testid="${packs.country}-name"]`).click()
  await page.getByText('BUY NOW').first().click()
  await expect(page.getByTestId('package-detail')).toBeVisible();
  await expect(page.getByTestId('sim-detail-operator-title')).toHaveText(packs.operator)
  await expect(page.locator('div[data-testid="sim-detail-header"] [data-testid="COVERAGE-value"]')).toHaveText(packs.country)
  await expect(page.locator('div[data-testid="sim-detail-header"] [data-testid="DATA-value"]')).toHaveText(packs.data)
  await expect(page.locator('div[data-testid="sim-detail-header"] [data-testid="VALIDITY-value"]')).toHaveText(packs.validity)
  await expect(page.locator('div[data-testid="sim-detail-header"] [data-testid="PRICE-value"]')).toHaveText(packs.price)
    });
  });

