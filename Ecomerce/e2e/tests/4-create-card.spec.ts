import { test, expect } from '@playwright/test';

test('deve registrar novo cartão para cliente existente', async ({ page }) => {

  const customerId = '4d4f78cf-7840-48d6-af5d-2075a1aec2f4';
  await page.goto(`http://127.0.0.90:5501/create-card.html?id=${customerId}`);

  await page.check('#main'); 
  await page.fill('#printedName', 'Kleberson dos Santos Silva');
  await page.fill('#numberCard', '3574487357752566');
  await page.fill('#code', '123');
  await page.fill('#expirationDate', '2030-12-31');
  await page.selectOption('#flag', 'VISA');

  page.once('dialog', async dialog => {
    console.log('Mensagem do alert:', dialog.message());
    await dialog.dismiss(); 
  });

  await page.click('button[type="submit"]');

});
