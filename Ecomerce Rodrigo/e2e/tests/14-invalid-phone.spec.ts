import { test, expect } from '@playwright/test';

test('não deve permitir cadastrar cliente com telefone inválido', async ({ page }) => {

  await page.goto('http://127.0.0.90:5501/create-customer.html');

  const timestamp = Date.now();
  const email = `kleberson${timestamp}@example.com`;

  await page.fill('#name', 'Kleberson dos Santos');
  await page.selectOption('#gender', 'MALE');
  await page.fill('#birth', '2000-01-01');
  await page.fill('#cpf', '123.456.789-04');

  await page.fill('#email', email);
  await page.fill('#ddd', '11');
  await page.fill('#phone', '123'); 
  await page.selectOption('#typePhone', 'MOBILE');

  await page.fill('#password', 'Senha@123');
  await page.fill('#confirmPassword', 'Senha@123');

  page.once('dialog', async dialog => {
  console.log('Mensagem do alert:', dialog.message());
  expect(dialog.message()).toContain('Phone must have 8 or 9 digits.');
});

  await page.click('#submitBtn');
});
