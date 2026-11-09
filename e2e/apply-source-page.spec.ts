import { expect, test } from '@playwright/test';
import {
  blockGoogleAnalytics,
  hostFormUrl,
  openApplyWithForm,
  originPageOfNextSubmit,
  submitForm,
} from './support/apply';

/**
 * SCRUM-435 S435-BUG-05: an application must say which page it came from, so one
 * from /apply can be told apart from one sent through the direct link. The API's
 * side (keeping only the address, storing it) is in fch-api's
 * EmbedFormSourcePageTest.
 */
const ACCEPTED = { status: 201, body: { status: true, data: { submission_uid: 'e2e-reference-id' } } };

test.beforeEach(async ({ page }) => {
  await blockGoogleAnalytics(page);
});

test('a form on /apply, at its published address, reports the /apply page', async ({ page }) => {
  await openApplyWithForm(page, ACCEPTED, { publishedAddress: true });

  const source = await originPageOfNextSubmit(page, () => submitForm(page));

  expect(source).toBe('http://localhost:3100/apply');
});

test('a form framed from another site reports that site', async ({ page }) => {
  await openApplyWithForm(page, ACCEPTED);

  const source = await originPageOfNextSubmit(page, () => submitForm(page));

  expect(source).toBe('http://localhost:3100/');
});

test('a form opened by its direct link reports no page', async ({ page }) => {
  await page.route('**/v1/embed/submit/**', (route) =>
    route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(ACCEPTED.body) }),
  );
  await page.goto(hostFormUrl());
  await page.waitForFunction(() => document.querySelector('.select2-container') !== null);

  const source = await originPageOfNextSubmit(page, () => submitForm(page));

  expect(source).toBeNull();
});
