import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const API_BASE = 'http://api.test/api/v1';

/** GET /website/settings as the API sends it. */
export const siteSettingsHandler = (data: Record<string, unknown> = {}) =>
  http.get(`${API_BASE}/website/settings`, () => HttpResponse.json({ status: true, data }));

export const server = setupServer(siteSettingsHandler());
