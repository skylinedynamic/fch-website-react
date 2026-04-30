import { SettingsResponse } from './types';

// Use the same base URL logic as the main cmsService
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1').replace(/\/+$/, '');

export const cmsService = {
  fetchSiteSettings: async (): Promise<SettingsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/website/settings`, {
        next: { revalidate: 60 },
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        console.warn(`Failed to fetch site settings: ${response.status}. Falling back to default.`);
        return { data: null } as any;
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return { data: null } as any;
    }
  },

  fetchSeoSettings: async (path: string): Promise<any> => {
    try {
      // Normalize path (ensure leading slash, no trailing slash unless it's just '/')
      const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
      
      const response = await fetch(`${API_BASE_URL}/website/seo?path=${encodeURIComponent(normalizedPath)}`, {
        next: { revalidate: 60 },
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        return { data: null };
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      return { data: null };
    }
  }
};
