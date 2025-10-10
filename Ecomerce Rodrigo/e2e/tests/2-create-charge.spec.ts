import { test, expect } from '@playwright/test';

test('deve registrar novo endereço de entrega', async ({ page }) => {
  const customerId = '4d4f78cf-7840-48d6-af5d-2075a1aec2f4';
  await page.goto(`http://127.0.0.90:5501/create-charge.html?id=${customerId}`);

  await page.fill('#receiver', 'Kleberson dos Santos');
  await page.fill('#zipCode', '08795350');
  await page.fill('#typeResidence', 'House');
  await page.fill('#streetType', 'Street');
  await page.fill('#street', 'Flower Street');
  await page.fill('#number', '123');
  await page.fill('#neighborhood', 'Central');
  await page.fill('#observation', 'Perto da padaria');
  await page.fill('#city', 'Mogi das Cruzes');
  await page.fill('#state', 'SP');
  await page.fill('#country', 'Brazil');

  page.once('dialog', async dialog => {
    console.log('Mensagem do alert:', dialog.message());
    await dialog.dismiss();
  });

  await page.click('button[type="submit"]');

});
