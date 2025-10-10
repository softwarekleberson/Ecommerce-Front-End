import { test, expect } from '@playwright/test';

test('deve registrar novo endereço de entrega', async ({ page }) => {
  const customerId = '4d4f78cf-7840-48d6-af5d-2075a1aec2f4';
  await page.goto(`http://127.0.0.90:5501/create-delivery.html?id=${customerId}`);

  const fields = {
    '#receiver': 'Kleberson dos Santos',
    '#zipCode': '12345678',
    '#typeResidence': 'House',
    '#streetType': 'Street',
    '#street': 'Flower Street',
    '#number': '123',
    '#neighborhood': 'Central',
    '#observation': 'Perto da padaria',
    '#city': 'Mogi das Cruzes',
    '#state': 'SP',
    '#country': 'Brazil',
    '#deliveryPhrase': 'Deixar na portaria'
  };

  for (const [selector, value] of Object.entries(fields)) {
    await page.locator(selector).fill(value);
  }

  const submitButton = page.locator('button[type="submit"]');

  await submitButton.waitFor({ state: 'visible' });
  await expect(submitButton).toBeEnabled();

  await page.waitForTimeout(300);

  const overlays = page.locator('.overlay, .modal, .spinner'); 
  if (await overlays.count() > 0) {
    for (let i = 0; i < await overlays.count(); i++) {
      const overlay = overlays.nth(i);
      if (await overlay.isVisible()) {
        await overlay.evaluate(el => el.remove());
      }
    }
  }

  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),
    submitButton.click(),
  ]);

  console.log('Mensagem do alert:', dialog.message());
  await dialog.accept();
});
