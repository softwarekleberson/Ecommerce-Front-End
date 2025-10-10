import { test, expect } from '@playwright/test';

test('deve atualizar a senha do cliente sem token', async ({ page }) => {
  const clientId = '4d4f78cf-7840-48d6-af5d-2075a1aec2f4';

  await page.goto(`http://127.0.0.90:5501/update-password.html?id=${clientId}`);

  await page.waitForSelector('#password');

  await page.fill('#password', 'NovaSenha@123');
  await page.fill('#confirmPassword', 'NovaSenha@123');

  page.once('dialog', async dialog => {
    console.log('Mensagem do alert:', dialog.message());
    await dialog.dismiss();
  });

  await page.click('button[type="submit"]');

});