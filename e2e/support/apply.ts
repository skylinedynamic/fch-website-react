import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';

const BACKEND_PATH = resolve(process.env.E2E_BACKEND_PATH ?? '../fch-api');
const API_BASE = 'http://127.0.0.1:8000';

/** The local host partner's form key. Only reads the database. */
const hostFormKey = (): string => {
  const code = [
    "$config = App\\Models\\EmbedForm\\EmbedFormConfig::whereHas('partner', fn ($q) => $q->where('is_host', 1))->first();",
    "echo 'KEY=' . $config->public_key;",
  ].join(' ');
  const output = execFileSync('php', ['artisan', 'tinker', `--execute=${code}`], {
    cwd: BACKEND_PATH,
    encoding: 'utf8',
  });
  const key = /KEY=(\S+)/.exec(output)?.[1];
  if (!key) throw new Error(`No host form key from fch-api: ${output}`);
  return key;
};

/** Events the page has given to gtag(), read back from window.dataLayer. */
export const gaEvents = (page: Page) =>
  page.evaluate(() =>
    ((window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer ?? [])
      .map((entry) => Array.from(entry))
      .filter((entry) => entry[0] === 'event')
      .map((entry) => ({ name: entry[1] as string, params: entry[2] as Record<string, string> | undefined })),
  );

/** Keeps test runs out of the real GA4 property; gtag() still fills dataLayer. */
export const blockGoogleAnalytics = async (page: Page) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, (route) => route.abort());
};

/**
 * /apply showing the real form from the local API, in its iframe.
 * - The local site settings have no embed code and the host's allowed domains
 *   exclude localhost, so the settings answer and the form's framing header are
 *   adjusted in the browser only.
 * - The submit answer is supplied here, so no application is stored or mailed.
 */
export const openApplyWithForm = async (page: Page, submitAnswer: { status: number; body: unknown }) => {
  const formUrl = `${API_BASE}/form/${hostFormKey()}`;

  await page.route('**/api/v1/website/settings', async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.data.apply_form_embed_code = `<iframe src="${formUrl}" title="Application" width="100%" height="800"></iframe>`;
    await route.fulfill({ response, json, headers: { ...response.headers(), 'access-control-allow-origin': '*' } });
  });

  await page.route(`${formUrl}*`, async (route) => {
    const response = await route.fetch();
    const headers = { ...response.headers() };
    delete headers['content-security-policy'];
    delete headers['x-frame-options'];
    await route.fulfill({ response, headers });
  });

  await page.route('**/v1/embed/submit/**', (route) =>
    route.fulfill({
      status: submitAnswer.status,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify(submitAnswer.body),
    }),
  );

  await page.goto('/apply');

  const form = page.frameLocator('iframe[title="Application"]');
  await form.locator('#loanAppForm').waitFor({ state: 'attached' });
  return form;
};

/**
 * Sends the form as its submit button would, past the field checks: filling all
 * 8 steps is not what these specs are about. The form's own submit handler,
 * success branch and message to the page all run unchanged.
 */
export const submitForm = async (page: Page) => {
  const frame = page.frames().find((candidate) => candidate.url().includes('/form/'));
  if (!frame) throw new Error('The form iframe is not loaded');
  await frame.evaluate(() => {
    (window as unknown as { validateStep: () => boolean }).validateStep = () => true;
    (document.getElementById('loanAppForm') as HTMLFormElement).requestSubmit();
  });
};
