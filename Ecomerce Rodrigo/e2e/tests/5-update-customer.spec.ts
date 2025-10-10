import { test, expect } from '@playwright/test';

test('deve atualizar dados de cliente existente sem token', async ({ page }) => {

  const clientId = '4d4f78cf-7840-48d6-af5d-2075a1aec2f4';
  await page.goto(`http://127.0.0.90:5501/update-customer.html?id=${clientId}`);

  await page.waitForSelector('#name');

  await page.fill('#name', 'Kleberson dos Santos Atualizado');
  await page.fill('#birth', '2000-12-12');
  await page.fill('#ddd', '11');
  await page.fill('#phone', '999888777');
  await page.selectOption('#typePhone', 'MOBILE');

  page.once('dialog', async dialog => {
    console.log('Mensagem do alert:', dialog.message());
    await dialog.dismiss();
  });

  await page.click('button[type="submit"]');
});