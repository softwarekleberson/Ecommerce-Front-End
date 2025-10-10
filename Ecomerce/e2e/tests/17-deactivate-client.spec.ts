import { test, expect } from '@playwright/test';

test('alterar status do cliente', async ({ page }) => {

  page.on('dialog', async dialog => {
    console.log('Alert:', dialog.message());
    await dialog.accept();
  });

  await page.goto('http://127.0.0.90:5502/status-customer.html');
  await page.fill('#customerId', 'c0d16057-cc25-45eb-a136-e98478664161');
  await page.click('button[type="submit"]');

  const response = await page.waitForResponse(
    resp =>
      resp.url().includes('/adm/customers/change-status') &&
      resp.request().method() === 'PUT'
  );

  expect(response.status()).toBe(204);

});
