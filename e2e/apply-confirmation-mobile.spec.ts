import { expect, test, type FrameLocator } from '@playwright/test';
import { blockGoogleAnalytics, openApplyWithForm, submitForm } from './support/apply';

/**
 * SCRUM-435 S435-BUG-06: on a phone the Reference ID's badge was wider than the
 * form and was clipped, so the applicant could not read the whole ID.
 */
const REFERENCE_ID = '878e3768-049e-4625-88be-6ca584ca5adc';
const ACCEPTED = { status: 201, body: { status: true, data: { submission_uid: REFERENCE_ID } } };

const measure = (form: FrameLocator) =>
  form.locator('#successRefBadge').evaluate((badge) => {
    const box = badge.getBoundingClientRect();
    const screen = document.getElementById('successScreen')!.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(badge);
    return {
      inside: box.left >= screen.left && box.right <= screen.right,
      clipped: badge.scrollWidth > badge.clientWidth,
      pageScrolls: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      lines: range.getClientRects().length,
    };
  });

const submitted = async (page: Parameters<typeof submitForm>[0]) => {
  const form = await openApplyWithForm(page, ACCEPTED);
  await submitForm(page);
  await expect(form.locator('#successRefBadge')).toContainText(REFERENCE_ID);
  return form;
};

test.beforeEach(async ({ page }) => {
  await blockGoogleAnalytics(page);
});

test('on a phone the whole Reference ID shows inside the form', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const form = await submitted(page);

  const { inside, clipped, pageScrolls, lines } = await measure(form);

  expect(inside).toBe(true);
  expect(clipped).toBe(false);
  expect(pageScrolls).toBe(false);
  expect(lines).toBeGreaterThan(1);
});

test('on the narrowest common phone it still fits', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  const form = await submitted(page);

  const { inside, clipped, pageScrolls } = await measure(form);

  expect(inside).toBe(true);
  expect(clipped).toBe(false);
  expect(pageScrolls).toBe(false);
});

test('on a desktop the Reference ID stays on one line', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  const form = await submitted(page);

  const { inside, lines } = await measure(form);

  expect(inside).toBe(true);
  expect(lines).toBe(1);
});
