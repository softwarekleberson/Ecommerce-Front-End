import { test, expect } from '@playwright/test';

test('não deve permitir registrar cliente com data de nascimento futura', async ({ page }) => {
  await page.goto('http://127.0.0.90:5501/create-customer.html');

  const email = `kleberson_${Date.now()}@example.com`;

  await page.fill('#name', 'Kleberson dos Santos');
  await page.selectOption('#gender', 'MALE');

  const dataFutura = '2100-01-01';
  await page.fill('#birth', dataFutura);

  await page.fill('#cpf', '123.456.789-04');
  await page.fill('#email', email);
  await page.fill('#ddd', '11');
  await page.fill('#phone', '987654321');
  await page.selectOption('#typePhone', 'MOBILE');
  await page.fill('#password', 'Senha@123');
  await page.fill('#confirmPassword', 'Senha@123');

  page.once('dialog', async dialog => {
    console.log('Mensagem esperada (data futura):', dialog.message());
    expect(dialog.message()).toContain('Date of birth cannot be in the future'); 
  });

  await page.click('#submitBtn');
});
