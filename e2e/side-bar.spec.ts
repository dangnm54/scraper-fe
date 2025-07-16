import { test, expect } from '@playwright/test';


test('page first load', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  // sidebar is visible
  await expect(page.locator('#sidebar-main')).toBeVisible()
  
  // run scraper button is selected
  const runScraperButton = page.locator('button:has-text("Run Scraper")');
  await expect(runScraperButton).toHaveClass(/.*text-blue-800.*/);
  
  // file section is hidden
  await expect(page.locator('#sidebar-file-group')).toBeHidden();

  // RunPage is visible
  await expect(page.locator('#card-main')).toBeVisible();
  
});

