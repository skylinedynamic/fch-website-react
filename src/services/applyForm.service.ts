import { fetchFromApi } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { ApplyFormDetails } from '@/lib/applyForm';

export const applyFormService = {
  /** The host's application form, or null when none is live. */
  fetchApplyForm: async (): Promise<ApplyFormDetails | null> => {
    const response = await fetchFromApi(API_ENDPOINTS.WEBSITE.APPLY_FORM);
    const data = response?.data;

    return data?.form_url ? { form_title: data.form_title, form_url: data.form_url } : null;
  },
};
