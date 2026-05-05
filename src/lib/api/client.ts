const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fourcornerfunding.com/api/v1').replace(/\/+$/, '');

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
