import { expect, test, type Page } from '@playwright/test';
import sharp from 'sharp';

/**
 * The header's Apply Now button sits on the dark tab in the hero's top-right
 * corner (part of hero-bg.png). The tab must be wider than the button at every
 * desktop width and hero height, or the button hangs off it onto the page
 * background ("Apply Now section not responsive").
 */

const DESKTOP_WIDTHS = [1200, 1280, 1366, 1440, 1536, 1680, 1920, 2560];
// Tall hero (home), medium (faq), short fixed 400px (terms).
const PAGES = ['/', '/faq', '/terms'];
const SAMPLE_GAP = 6;
const MAX_TAB_LUMINANCE = 110;

const luminanceAt = async (page: Page, x: number, y: number): Promise<number> => {
  const png = await page.screenshot({ clip: { x: Math.round(x), y: Math.round(y), width: 1, height: 1 } });
  const { data } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return 0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2];
};

// The header button is hidden below 1200px, so the header must switch to the
// mobile menu there — not keep the desktop links, wrapped onto two rows.
for (const width of [1024, 1100, 1199]) {
  test(`below 1200px (${width}px) Apply Now is reached through the mobile menu`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/faq', { waitUntil: 'networkidle' });

    await expect(page.locator('.header-lower .main-menu')).toBeHidden();
    await page.locator('.header-lower .mobile-nav-toggler').click();
    await expect(page.locator('.mobile-menu .apply-now-btn')).toBeVisible();
  });

  test(`below 1200px (${width}px) the sticky header uses the mobile menu toggle`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/faq', { waitUntil: 'networkidle' });
    await page.mouse.wheel(0, 800);
    await expect(page.locator('.sticky-header.fixed-header')).toBeVisible();

    await expect(page.locator('.sticky-header .main-menu')).toBeHidden();
    await expect(page.locator('.sticky-header .mobile-nav-toggler')).toBeVisible();
  });
}

for (const path of PAGES) {
  for (const width of DESKTOP_WIDTHS) {
    test(`Apply Now sits inside the hero tab on ${path} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: 'networkidle' });

      const button = page.locator('.header-lower .apply-now-btn');
      await expect(button).toBeVisible();
      const box = await button.boundingBox();
      if (!box) throw new Error('Apply Now has no bounding box');
      const centerY = box.y + box.height / 2;

      const left = await luminanceAt(page, box.x - SAMPLE_GAP, centerY);
      const right = await luminanceAt(page, box.x + box.width + SAMPLE_GAP, centerY);

      expect(left, 'left of the button is the dark tab').toBeLessThan(MAX_TAB_LUMINANCE);
      expect(right, 'right of the button is the dark tab').toBeLessThan(MAX_TAB_LUMINANCE);
    });
  }
}
