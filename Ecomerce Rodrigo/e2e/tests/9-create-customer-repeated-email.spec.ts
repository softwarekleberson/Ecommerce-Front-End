import { test, expect } from '@playwright/test';

test('deve registrar cliente com email único', async ({ page }) => {
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
  await page.fill('#confirmPassword', 'Senha@123');

  page.once('dialog', async dialog => {
    console.log('Mensagem esperada (sucesso):', dialog.message());
    expect(dialog.message()).toContain('Customer created'); 
  });

  await page.click('#submitBtn');
});

test('não deve permitir registrar cliente com email repetido', async ({ page }) => {
  await page.goto('http://127.0.0.90:5501/create-customer.html');

  const email = 'kleberson_teste@example.com'; 

  await page.fill('#name', 'Outro Nome');
  await page.selectOption('#gender', 'MALE');
  await page.fill('#birth', '2001-02-02');
  await page.fill('#cpf', '987.654.321-00');
  await page.fill('#email', email);
  await page.fill('#ddd', '11');
  await page.fill('#phone', '123456789');
  await page.selectOption('#typePhone', 'MOBILE');
  await page.fill('#password', 'Senha@123');
  await page.fill('#confirmPassword', 'Senha@123');

  page.once('dialog', async dialog => {
    console.log('Mensagem esperada (erro duplicidade):', dialog.message());
    expect(dialog.message()).toContain('This email is not available.'); 
  });

  await page.click('#submitBtn');
});
