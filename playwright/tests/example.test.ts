import { test, expect } from '@playwright/test';

test('should load the React app and display text', async ({ page }) => {
  // Navigate to the React app (ensure it's running on localhost:3000)
  // await page.goto('http://localhost:3000')
  await page.goto('www.google.com.br')
  // await page.goto('http://localhost:3000')
  // Wait for the page to load and check for the header text (replace as needed)
  page.getByRole('link', { name: 'Learn Reactson', exact: true })
});
