import { expect, test } from '@playwright/test';
import { blockGoogleAnalytics } from './support/apply';

/**
 * The two partner panels on the home page ("For Partners" and "White-label
 * solutions") send visitors to the contact page, in the same tab - not to the
 * partner portal sign-in.
 */
test.beforeEach(async ({ page }) => {
  await blockGoogleAnalytics(page);
});

for (const name of ['Apply to Become a Partner', 'Request White-Label Information']) {
  test(`"${name}" on the home page opens /contact in the same tab`, async ({ page }) => {
    await page.goto('/');

    const link = page.getByRole('link', { name });
    await expect(link).toHaveAttribute('href', '/contact');
    await expect(link).not.toHaveAttribute('target', /.+/);

    // The stacking-panel animation pins the panels, so the click is sent straight to the link.
    await link.dispatchEvent('click');

    await expect(page).toHaveURL(/\/contact$/);
  });
}
