import { test, expect } from '@playwright/test';

test('não deve permitir injeção de script em nenhum campo do formulário', async ({ page }) => {
  await page.goto('http://127.0.0.90:5501/create-customer.html');

  const maliciousScript = `<script>alert('XSS')</script>`;
  const email = `kleberson_${Date.now()}@example.com`;

  await page.fill('#name', maliciousScript);
  await page.selectOption('#gender', 'MALE'); 
  await page.fill('#birth', '2000-01-01');
  await page.fill('#cpf', maliciousScript); 
  await page.fill('#email', email);
  await page.fill('#ddd', '11');
  await page.fill('#phone', maliciousScript); 
  await page.selectOption('#typePhone', 'MOBILE');
  await page.fill('#password', 'Senha@123');
  await page.fill('#confirmPassword', 'Senha@123');

  const content = await page.content();
  expect(content).not.toContain(maliciousScript);

  page.once('dialog', async dialog => {
    console.log('Mensagem exibida (opcional):', dialog.message());
    expect(
      dialog.message().toLowerCase()
    ).toMatch(/campo inválido|needs this format/i);
  });

  await page.click('#submitBtn');
});
