import { test, expect } from '@playwright/test';

test('não deve permitir registrar cliente com senhas diferentes', async ({ page }) => {
  await page.goto('http://127.0.0.90:5501/create-customer.html');

  const email = `kleberson_${Date.now()}@example.com`;

  await page.fill('#name', 'Kleberson dos Santos');
  await page.selectOption('#gender', 'MALE');
  await page.fill('#birth', '2000-01-01');
  await page.fill('#cpf', '123.456.789-04');
  await page.fill('#email', email);
  await page.fill('#ddd', '11');
  await page.fill('#phone', '987654321');
  await page.selectOption('#typePhone', 'MOBILE');

  await page.fill('#password', 'Senha@123');
  await page.fill('#confirmPassword', 'OutraSenha@123');

  page.once('dialog', async dialog => {
    console.log('Mensagem esperada (senhas diferentes):', dialog.message());
    expect(dialog.message()).toContain('password does not match confirm password'); 
  });

  await page.click('#submitBtn');
});
