import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const API_BASE = 'http://api.test/api/v1';

/** GET /website/settings as the API sends it. */
export const siteSettingsHandler = (data: Record<string, unknown> = {}) =>
  http.get(`${API_BASE}/website/settings`, () => HttpResponse.json({ status: true, data }));

export const server = setupServer(siteSettingsHandler());

/**
 * POST /website/leads. Each body the form sent is pushed to `sent`; the
 * answer is a created lead, or `reply` when given (e.g. a 422).
 */
export const leadsHandler = (
  sent: Record<string, unknown>[],
  reply?: { status: number; body: Record<string, unknown> },
) =>
  http.post(`${API_BASE}/website/leads`, async ({ request }) => {
    sent.push((await request.json()) as Record<string, unknown>);
    if (reply) return HttpResponse.json(reply.body, { status: reply.status });
    return HttpResponse.json({ status: true, message: 'Lead created successfully.', data: { id: 1 } });
  });
