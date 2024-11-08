import { test, expect } from '@playwright/test';

test('should load the React app and display text', async ({ page }) => {
  test.setTimeout(5000)
  // Navigate to the React app (ensure it's running on localhost:3000)
  await page.goto('https://www.google.com.br')
  // await page.pause()
  // Wait for the page to load and check for the header text (replace as needed)
  await page.getByLabel('falha', { exact: true }).click()
});
