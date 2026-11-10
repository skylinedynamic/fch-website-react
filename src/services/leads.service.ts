import { GENERIC_ERROR_MESSAGE, ApiError, postToApi } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { RecaptchaNotReadyError } from '@/lib/recaptcha';

export const leadsService = {
  /** Throws an `ApiError` with the API's message when the lead is refused. */
  submitLead: async (data: any) => {
    return postToApi(API_ENDPOINTS.LEADS.SUBMIT, data);
  }
};

/**
 * What a lead form shows when sending failed: the API's own reason, or the
 * "still loading" note, never a raw library or network error.
 */
export const leadErrorMessage = (error: unknown): string =>
  error instanceof ApiError || error instanceof RecaptchaNotReadyError ? error.message : GENERIC_ERROR_MESSAGE;
