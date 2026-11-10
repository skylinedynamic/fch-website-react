import { createContext } from 'react';

/**
 * The reCAPTCHA v3 action every website lead form runs as. fch-api's
 * StoreLeadRequest checks the token against this same action
 * (`new ReCaptcha('contact_form')`), so a token made under another name fails.
 */
export const LEAD_RECAPTCHA_ACTION = 'contact_form';

export const RECAPTCHA_NOT_READY_MESSAGE = 'The security check is still loading. Please try again in a moment.';

/** reCAPTCHA is on (a site key is set) but its script has not loaded yet. */
export class RecaptchaNotReadyError extends Error {
  constructor() {
    super(RECAPTCHA_NOT_READY_MESSAGE);
    this.name = 'RecaptchaNotReadyError';
  }
}

/**
 * Whether a site key is set, so the reCAPTCHA provider is mounted. Outside the
 * provider the library's hook hands out a function that only throws, so forms
 * must know this before asking it for a token.
 */
export const RecaptchaEnabledContext = createContext(false);
