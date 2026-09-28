import { expect, test } from '@playwright/test';

test('renders the frontend map and route examples', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: /un starter que explica dónde va cada cosa/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /abrir ejemplo/i })).toHaveCount(
    3,
  );
});

test('reuses the public layout and enters the dashboard demo', async ({
  page,
}) => {
  await page.goto('/login');

  await expect(page.getByRole('banner')).toContainText('Modular Starter');
  await expect(page.getByRole('contentinfo')).toContainText(
    'Modular Frontend Starter',
  );
  await expect(
    page.getByRole('heading', {
      name: /una página pequeña dentro del layout público/i,
    }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Ingresar' }).click();

  await expect(page).toHaveURL('/dashboard');
  await expect(
    page.getByRole('heading', { name: 'Dashboard de arquitectura' }),
  ).toBeVisible();
});

test('supports keyboard access to the main content', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', {
    name: /saltar al contenido principal/i,
  });
  await expect(skipLink).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page.locator('#main-content')).toBeFocused();
});

test('shares the private layout across dashboard and profile', async ({
  page,
}) => {
  await page.goto('/dashboard');

  await expect(
    page.getByRole('heading', { name: 'Dashboard de arquitectura' }),
  ).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'Navegación privada' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Profile' }).click();

  await expect(page).toHaveURL('/profile');
  await expect(
    page.getByRole('heading', { name: 'Perfil de ejemplo' }),
  ).toBeVisible();
});
