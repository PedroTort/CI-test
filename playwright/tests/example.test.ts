import { test, expect } from '@playwright/test';

test('should load the React app and display text', async ({ page }) => {
  // Navigate to the React app (ensure it's running on localhost:3000)
  await page.goto('https://www.google.com.br')
  await page.pause()
  // Wait for the page to load and check for the header text (replace as needed)
  page.getByLabel('Pesquisar', { exact: true })
});
