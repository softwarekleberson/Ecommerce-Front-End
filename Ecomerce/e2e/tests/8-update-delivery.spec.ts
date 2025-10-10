import { test, expect } from '@playwright/test';

test('deve atualizar endereço de entrega existente', async ({ page }) => {

  const customerId = '4d4f78cf-7840-48d6-af5d-2075a1aec2f4';
  const deliveryId = '64737b6d-97f9-4262-8aaf-f76cc4882b2a';
  await page.goto(`http://127.0.0.90:5501/update-delivery.html?id=${customerId}&entregaId=${deliveryId}`);

  await page.fill('#receiver', 'João da Silva');
  await page.fill('#typeResidence', 'Apartment');
  await page.fill('#streetType', 'Avenue');
  await page.fill('#street', 'Paulista');
  await page.fill('#number', '1000');
  await page.fill('#neighborhood', 'Bela Vista');
  await page.fill('#observation', 'Entregar na portaria');
  await page.fill('#city', 'São Paulo');
  await page.fill('#state', 'SP');
  await page.fill('#deliveryPhrase', 'Deixar na caixa de correio');
  await page.fill('#country', 'Brazil');

  page.once('dialog', async dialog => {
    console.log('Mensagem do alert:', dialog.message());
    await dialog.dismiss();
  });

  await page.click('button[type="submit"]');

});
