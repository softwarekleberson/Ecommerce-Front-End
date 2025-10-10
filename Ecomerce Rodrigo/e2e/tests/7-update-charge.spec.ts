import { test, expect } from '@playwright/test';

test('deve atualizar endereço de cobrança com sucesso', async ({ page }) => {
  const clienteId = '4d4f78cf-7840-48d6-af5d-2075a1aec2f4';
  const entregaId = 'e65ebd05-e704-4d92-9c57-6944753edc3f';

  await page.goto(`http://127.0.0.90:5501/update-charge.html?id=${clienteId}&entregaId=${entregaId}`);

  await page.fill('#receiver', 'Novo Recebedor');
  await page.fill('#typeResidence', 'Apartment');
  await page.fill('#streetType', 'Avenue');
  await page.fill('#street', 'Rua Francisco Gabriel Sobrinho ');
  await page.fill('#number', '456');
  await page.fill('#neighborhood', 'Jardim Residencial São José');
  await page.fill('#observation', 'Próximo ao mercado');
  await page.fill('#city', 'Rondonópolis');
  await page.fill('#state', 'MT');
  await page.fill('#country', 'Brazil');

  page.once('dialog', async dialog => {
    console.log('Mensagem do alert:', dialog.message());
    await dialog.dismiss();
  });

  await page.click('button[type="submit"]');

});
