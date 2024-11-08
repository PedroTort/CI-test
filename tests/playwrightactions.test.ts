import { test, expect } from '@playwright/test';

const usernameData = "admin";
const passwordData = "password";

test('UI - Login User', { 
  tag: ['@ProjectName', '@Tests', '@LoginUser', '@UI', '@FrontendTest'] 
}, async ({ page }) => {
  const username = page.locator(`input[data-testid='username']`);
  const password = page.locator(`input[data-testid='password']`);
  const loginButton = page.locator(`button[type='submit']`);
  const navBarText = page.locator(`a.navbar-brand.mx-auto`);

  await page.goto(`/#/admin`);
  await username.type(usernameData);
  await password.type(passwordData);
  await loginButton.click();

  const expectedText = "B&B Booking Management";
  const actualText = await navBarText.textContent();

  // Assertion
  expect(actualText).toBe(expectedText);
});

test('Backend Test - Auth EP is up', { 
  tag: ['@ProjectName', '@Tests', '@AuthUser', '@API', '@BackendTest'] 
}, async ({ request }) => {
  const response = await request.get(`/auth/actuator/health`);
  const body = await response.json();

  // Assertion
  expect(response.status()).toBe(200);
  expect(body.status).toBe("UP");
});

test('Backend Test - Auth Login', { 
  tag: ['@ProjectName', '@Tests', '@AuthUser', '@Login', '@API', '@BackendTest'] 
}, async ({ request }) => {
  const response = await request.post("/auth/login", {
    data: {
      username: usernameData,
      password: passwordData
    },
  });

  // Assertion
  expect(response.status()).toBe(200);
});