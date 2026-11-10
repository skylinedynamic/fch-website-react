const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1').replace(/\/+$/, '');

export const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.';

/** The API refused a request, or could not be reached (`status` 0). */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * POSTs JSON for a form and returns the answer. Unlike `fetchFromApi`, which
 * turns every failure into `null` (fine for CMS content), this throws an
 * `ApiError` carrying the API's message, so a refused form is never shown as sent.
 */
export const postToApi = async (endpoint: string, body: unknown) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(GENERIC_ERROR_MESSAGE, 0);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof data?.message === 'string' && data.message ? data.message : GENERIC_ERROR_MESSAGE;
    throw new ApiError(message, response.status, data?.errors);
  }
  return data;
};

export const fetchFromApi = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // Ensure we don't duplicate /v1 if it's already in the base URL
    const url = `${API_BASE_URL}${path.replace('/v1', '')}`;


    const isGetOrHead = !options.method || ['GET', 'HEAD'].includes(options.method.toUpperCase());

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (!isGetOrHead && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 0 } // Default to no cache
    });

    if (!response.ok) {
      console.warn(`API error: ${response.status} at ${url}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return null;
  }
};
