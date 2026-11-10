import { expect, test } from '@playwright/test';
import { blockGoogleAnalytics } from './support/apply';

/**
 * Typing in the /contact form must not reload the office map beside it. The
 * map comes from the site settings' embed code; the settings are answered in
 * the browser so the spec needs no API and loads no Google page.
 */
const MAP_URL = 'https://maps.e2e.test/embed';
let mapLoads = 0;

test.beforeEach(async ({ page }) => {
  mapLoads = 0;
  await blockGoogleAnalytics(page);
  await page.route('**/api/v1/website/settings', (route) =>
    route.fulfill({
      json: { status: true, data: { map_iframe: `<iframe src="${MAP_URL}" title="Office map"></iframe>` } },
      headers: { 'access-control-allow-origin': '*' },
    }),
  );
  await page.route(`${MAP_URL}**`, (route) => {
    mapLoads += 1;
    return route.fulfill({ contentType: 'text/html', body: '<p>map</p>' });
  });
});

test('typing in the contact form leaves the map loaded once', async ({ page }) => {
  await page.goto('/contact');
  const map = page.locator('.google-map iframe[title="Office map"]');
  await expect(map).toBeAttached();
  await expect.poll(() => mapLoads).toBe(1);
  // Tag the element: a reload replaces the iframe, and the tag goes with it.
  await map.evaluate((element) => element.setAttribute('data-e2e-first', 'yes'));

  // The form fades in (theme WOW animation) only once it is scrolled into view.
  const name = page.getByPlaceholder('Your Name*');
  await name.evaluate((element) => element.scrollIntoView({ block: 'center' }));
  await page.mouse.wheel(0, 1);
  await expect(name).toBeVisible();

  await name.pressSequentially('Jane Doe');
  await page.getByPlaceholder('Email Address*').pressSequentially('jane@example.com');
  await page.getByPlaceholder('Enter Your Message here').pressSequentially('Hello there');
  await expect(name).toHaveValue('Jane Doe');

  // Give any reload a moment to show up before counting.
  await page.waitForTimeout(500);
  await expect(page.locator('.google-map iframe[data-e2e-first="yes"]')).toHaveCount(1);
  expect(mapLoads).toBe(1);
});
