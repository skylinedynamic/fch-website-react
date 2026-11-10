import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { ApiError, postToApi } from '@/lib/api/client';
import { API_BASE, server } from '../../mocks/server';

describe('postToApi', () => {
  it('posts JSON and returns the answer', async () => {
    let body: unknown;
    server.use(
      http.post(`${API_BASE}/website/leads`, async ({ request }) => {
        body = await request.json();
        return HttpResponse.json({ status: true, data: { id: 7 } });
      }),
    );

    const answer = await postToApi('/website/leads', { email: 'jane@example.com' });

    expect(body).toEqual({ email: 'jane@example.com' });
    expect(answer).toEqual({ status: true, data: { id: 7 } });
  });

  it('throws the API message and field errors when the API refuses', async () => {
    server.use(
      http.post(`${API_BASE}/website/leads`, () =>
        HttpResponse.json(
          { message: 'The email field is required.', errors: { email: ['The email field is required.'] } },
          { status: 422 },
        ),
      ),
    );

    const error = await postToApi('/website/leads', {}).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      message: 'The email field is required.',
      status: 422,
      errors: { email: ['The email field is required.'] },
    });
  });

  it('throws a plain message when the API answers without one', async () => {
    server.use(http.post(`${API_BASE}/website/leads`, () => new HttpResponse('Bad gateway', { status: 502 })));

    const error = await postToApi('/website/leads', {}).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ message: 'Something went wrong. Please try again.', status: 502 });
  });

  it('throws a plain message when the API cannot be reached', async () => {
    server.use(http.post(`${API_BASE}/website/leads`, () => HttpResponse.error()));

    const error = await postToApi('/website/leads', {}).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ message: 'Something went wrong. Please try again.', status: 0 });
  });
});
