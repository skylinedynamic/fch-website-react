'use client';

import { useCallback, useContext } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { LEAD_RECAPTCHA_ACTION, RecaptchaEnabledContext, RecaptchaNotReadyError } from '@/lib/recaptcha';

/**
 * Returns a function that gets a reCAPTCHA v3 token for a lead form.
 * - reCAPTCHA off (no site key): resolves `undefined`, so the form sends no token.
 * - on, script still loading: throws `RecaptchaNotReadyError`.
 * - on and loaded: resolves the token, made under `LEAD_RECAPTCHA_ACTION`.
 */
export function useRecaptchaToken() {
  const enabled = useContext(RecaptchaEnabledContext);
  const { executeRecaptcha } = useGoogleReCaptcha();

  return useCallback(async (): Promise<string | undefined> => {
    if (!enabled) return undefined;
    if (!executeRecaptcha) throw new RecaptchaNotReadyError();
    return executeRecaptcha(LEAD_RECAPTCHA_ACTION);
  }, [enabled, executeRecaptcha]);
}
