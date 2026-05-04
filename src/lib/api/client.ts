const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1').replace(/\/+$/, '');

export const fetchFromApi = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Ensure we don't duplicate /v1 if it's already in the base URL
    const url = `${API_BASE_URL}${path.replace('/v1', '')}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
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
