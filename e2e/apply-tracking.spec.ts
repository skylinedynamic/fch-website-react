import { expect, test } from '@playwright/test';
import { blockGoogleAnalytics, gaEvents, openApplyWithForm, submitForm } from './support/apply';

test.beforeEach(async ({ page }) => {
  await blockGoogleAnalytics(page);
});

const applyNowClicks = async (page: Parameters<typeof gaEvents>[0]) =>
  (await gaEvents(page)).filter((event) => event.name === 'apply_now_click');

test('the header Apply Now button is tracked and opens /apply', async ({ page }) => {
  await page.goto('/faq');

  await page.locator('.header-lower .apply-now-btn').click();

  await expect(page).toHaveURL(/\/apply$/);
  expect(await applyNowClicks(page)).toEqual([{ name: 'apply_now_click', params: { location: 'header' } }]);
});

test('the sticky header Apply Now button is tracked', async ({ page }) => {
  await page.goto('/faq');
  await page.mouse.wheel(0, 800);
  await expect(page.locator('.sticky-header.fixed-header')).toBeVisible();

  await page.locator('.sticky-header .apply-now-btn').click();

  await expect(page).toHaveURL(/\/apply$/);
  expect(await applyNowClicks(page)).toEqual([{ name: 'apply_now_click', params: { location: 'sticky' } }]);
});

test('the mobile menu Apply Now button is tracked', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/faq');

  await page.locator('.header-lower .mobile-nav-toggler').click();
  await page.locator('.mobile-menu .apply-now-btn').click();

  await expect(page).toHaveURL(/\/apply$/);
  expect(await applyNowClicks(page)).toEqual([{ name: 'apply_now_click', params: { location: 'mobile' } }]);
});

test('a confirmed submission is tracked once, with no applicant data', async ({ page }) => {
  const form = await openApplyWithForm(page, {
    status: 201,
    body: { status: true, data: { submission_uid: 'e2e-reference-id' } },
  });

  await submitForm(page);

  await expect(form.getByRole('heading', { name: 'Application Submitted!' })).toBeVisible();
  // SCRUM-435 S435-BUG-02: the next step, with no response-time promise.
  const confirmation = form.locator('#successScreen');
  // The host's own site name in the local database, not its company name.
  await expect(confirmation).toContainText('Thank you for applying with Four Corner Funding.');
  await expect(confirmation).toContainText('will review it');
  await expect(confirmation).toContainText('does not guarantee approval or funding');
  await expect(confirmation).not.toContainText('shortly');
  await expect
    .poll(async () => (await gaEvents(page)).filter((event) => event.name === 'application_submitted'))
    .toEqual([{ name: 'application_submitted' }]);
  expect(JSON.stringify(await gaEvents(page))).not.toContain('e2e-reference-id');
});

test('a rejected submission is not tracked', async ({ page }) => {
  const form = await openApplyWithForm(page, {
    status: 422,
    body: { status: false, message: 'The given data was invalid.' },
  });

  await submitForm(page);

  await expect(form.locator('#errorScreen')).toBeVisible();
  expect((await gaEvents(page)).filter((event) => event.name === 'application_submitted')).toEqual([]);
});
