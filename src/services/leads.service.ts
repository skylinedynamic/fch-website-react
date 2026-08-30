import { fetchFromApi } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const leadsService = {
  submitLead: async (data: any) => {
    return fetchFromApi(API_ENDPOINTS.LEADS.SUBMIT, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
