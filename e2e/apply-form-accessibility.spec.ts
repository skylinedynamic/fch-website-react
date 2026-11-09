import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { hostFormUrl } from './support/apply';

/**
 * SCRUM-435 S435-BUG-04: a screen reader must be able to name every field on
 * all 8 steps of the application, including the ones only shown conditionally.
 * Only the naming rules are run, so this spec stays about that one defect.
 */
const NAMING_RULES = [
  'label',
  'select-name',
  'aria-input-field-name',
  'aria-toggle-field-name',
  'form-field-multiple-labels',
];

const showStep = (page: Page, step: number) =>
  page.evaluate((target) => {
    (window as unknown as { showStep: (step: number, scroll: boolean) => void }).showStep(target, false);
  }, step);

const openForm = async (page: Page) => {
  await page.goto(hostFormUrl());
  await page.waitForFunction(() => document.querySelector('.select2-container') !== null);
};

for (const step of [1, 2, 3, 4, 5, 6, 7, 8]) {
  test(`step ${step}: every field has a name`, async ({ page }) => {
    await openForm(page);
    await showStep(page, step);
    // The fields shown only for certain answers ("Other", a Yes, and so on).
    await page.evaluate(() => {
      document.querySelectorAll<HTMLElement>('[id$="Wrap"]').forEach((wrap) => {
        wrap.style.display = 'block';
      });
    });

    const { violations } = await new AxeBuilder({ page })
      .include(`#tab-${step}`)
      .withRules(NAMING_RULES)
      .analyze();

    expect(violations.flatMap((rule) => rule.nodes.map((node) => `${rule.id}: ${node.target}`))).toEqual([]);
  });
}

test('a co-borrower card has a name on every field', async ({ page }) => {
  await openForm(page);
  await showStep(page, 2);
  await page.locator('button[onclick="addCoBorrower()"]').click();
  const card = page.locator('.co-borrower-card');
  await expect(card.getByLabel('First Name')).toBeVisible();
  await expect(card.getByLabel('Date of Birth')).toBeVisible();

  const { violations } = await new AxeBuilder({ page })
    .include('.co-borrower-card')
    .withRules(NAMING_RULES)
    .analyze();

  expect(violations.flatMap((rule) => rule.nodes.map((node) => `${rule.id}: ${node.target}`))).toEqual([]);
});

test('fields are announced by the label the applicant sees', async ({ page }) => {
  await openForm(page);

  await expect(page.getByRole('textbox', { name: 'Business Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Business Phone' })).toHaveAttribute('id', 'business_phone_no');
  // select2 draws its own box in place of the <select>.
  await expect(page.locator('#tab-1').getByRole('combobox', { name: 'State' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Business phone country' })).toBeVisible();

  await showStep(page, 2);
  // The date picker's visible box stands in for the hidden field that posts.
  await expect(page.getByRole('textbox', { name: 'Date of Birth' })).toBeVisible();

  await showStep(page, 4);
  await expect(page.getByRole('spinbutton', { name: 'Requested Amount' })).toBeVisible();

  await showStep(page, 7);
  const question = page.getByRole('radiogroup', { name: 'Are you currently on parole or probation?' });
  await expect(question.getByRole('radio', { name: 'Yes' })).toBeVisible();
});

test('a multi-select and a searchable dropdown are named by their labels', async ({ page }) => {
  await openForm(page);

  await showStep(page, 4);
  await expect(page.getByRole('searchbox', { name: 'Additional Funding Types' }).or(
    page.getByRole('textbox', { name: 'Additional Funding Types' }),
  )).toBeVisible();

  await showStep(page, 2);
  // Long lists open with a search box, drawn outside the form.
  await page.getByRole('combobox', { name: 'Country' }).click();
  await expect(page.locator('.select2-search--dropdown .select2-search__field')).toHaveAttribute('aria-labelledby', /country/);
});

test('clicking a label puts the cursor in its field', async ({ page }) => {
  await openForm(page);

  await page.locator('label[for="business_email"]').click();

  await expect(page.locator('#business_email')).toBeFocused();
});

test('the date of birth label opens the calendar', async ({ page }) => {
  await openForm(page);
  await showStep(page, 2);

  await page.locator('#tab-2 label', { hasText: 'Date of Birth' }).click();

  await expect(page.locator('.flatpickr-calendar.open')).toBeVisible();
});

test('a required select2 field still reports its error after the naming change', async ({ page }) => {
  await openForm(page);

  await page.locator('#btnNext').click();

  await expect(page.locator('#tab-1 .select2-container.is-invalid').first()).toBeVisible();
  await expect(page.locator('#full_name')).toHaveAttribute('aria-invalid', 'true');
});
