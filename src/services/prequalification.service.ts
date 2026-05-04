import { fetchFromApi } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const prequalificationService = {
  submitPrequalification: async (data: any) => {
    return fetchFromApi(API_ENDPOINTS.LEADS.PRE_QUALIFICATION, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
