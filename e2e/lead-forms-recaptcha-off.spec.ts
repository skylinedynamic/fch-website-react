import { expect, test, type Locator, type Page } from '@playwright/test';
import { blockGoogleAnalytics } from './support/apply';

/**
 * The /contact form and the home "Need Help For Project!" form with reCAPTCHA
 * not set up (no site key in Site Settings, as on the local API): the lead goes
 * out without a token, and a refusal from the API is shown, never a thank-you.
 * POST /website/leads is answered in the browser, so no real lead is created.
 */
type Reply = { status: number; body: Record<string, unknown> };
const CREATED: Reply = { status: 200, body: { status: true, message: 'Lead created successfully.', data: { id: 1 } } };
const NEEDS_RECAPTCHA: Reply = {
  status: 422,
  body: {
    message: 'Please complete the reCAPTCHA verification.',
    errors: { recaptcha_token: ['Please complete the reCAPTCHA verification.'] },
  },
};

const answerLeads = async (page: Page, reply: Reply) => {
  const sent: Record<string, unknown>[] = [];
  await page.route('**/api/v1/website/leads', async (route) => {
    if (route.request().method() === 'OPTIONS') {
      return route.fulfill({
        status: 204,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-headers': '*',
          'access-control-allow-methods': 'POST, OPTIONS',
        },
      });
    }
    sent.push(route.request().postDataJSON());
    return route.fulfill({ status: reply.status, json: reply.body, headers: { 'access-control-allow-origin': '*' } });
  });
  return sent;
};

/**
 * The forms fade in (theme WOW animation) only once scrolled into view, a block
 * at a time. Smooth scrolling and the pinned partner panels on the home page can
 * stop a single scroll short, so scroll instantly and retry until it shows.
 */
const reveal = async (page: Page, target: Locator) => {
  await expect(async () => {
    await target.evaluate((element) => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.mouse.wheel(0, 1);
    await expect(target).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 20000 });
};

const fillAndSubmit = async (page: Page, form: string) => {
  const scope = page.locator(form);
  const name = scope.getByPlaceholder('Your Name*');
  await reveal(page, name);

  await name.pressSequentially('E2E Lead');
  await scope.getByPlaceholder('Email Address*').pressSequentially('e2e.lead@example.com');
  await scope.getByPlaceholder('Enter Your Message here').pressSequentially('Testing the form');
  await expect(name).toHaveValue('E2E Lead');

  const submit = scope.locator('button[type="submit"]');
  await reveal(page, submit);
  await expect(submit).toHaveText('Submit Now');
  await submit.click();
};

const FORMS = [
  { name: '/contact form', path: '/contact', form: '#contact_form', thanks: 'Thank you for reaching out! Your message has been sent.' },
  { name: 'home "Need Help For Project!" form', path: '/', form: 'form.custom-contact-form', thanks: 'Thank you! Your message has been sent successfully.' },
];

test.beforeEach(async ({ page }) => {
  await blockGoogleAnalytics(page);
});

for (const { name, path, form, thanks } of FORMS) {
  test(`the ${name} sends the lead without a token when reCAPTCHA is not set up`, async ({ page }) => {
    const sent = await answerLeads(page, CREATED);
    await page.goto(path);

    await fillAndSubmit(page, form);

    await expect(page.getByText(thanks)).toBeVisible();
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({ contact_person: 'E2E Lead', email: 'e2e.lead@example.com' });
    expect(sent[0]).not.toHaveProperty('recaptcha_token');
    await expect(page.getByText(/GoogleReCaptcha Context/)).toHaveCount(0);
  });

  test(`the ${name} shows the API's refusal instead of a thank-you`, async ({ page }) => {
    await answerLeads(page, NEEDS_RECAPTCHA);
    await page.goto(path);

    await fillAndSubmit(page, form);

    await expect(page.locator(form).getByText('Please complete the reCAPTCHA verification.')).toBeVisible();
    await expect(page.getByText(thanks)).toHaveCount(0);
  });
}
