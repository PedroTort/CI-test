import { test, expect } from '@playwright/test';

test('should load the React app and display text', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // await page.goto('www.google.com.br')
  page.getByRole('link', { name: 'Learn Reactson', exact: true })
});
