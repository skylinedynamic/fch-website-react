import type { ReactNode } from 'react';

/**
 * A stand-in for react-google-recaptcha-v3, for `vi.mock`. Tests set
 * `recaptchaMock.executeRecaptcha` to model the three states a page can be in:
 * - outside the provider (reCAPTCHA off): the library's own default, a function
 *   that throws "GoogleReCaptcha Context has not yet been implemented..."
 * - inside the provider, script still loading: `undefined`
 * - inside the provider, script loaded: a function resolving a token
 */
export const LIBRARY_DEFAULT_ERROR =
  'GoogleReCaptcha Context has not yet been implemented, if you are using useGoogleReCaptcha hook, make sure the hook is called inside component wrapped by GoogleRecaptchaProvider';

export const outsideProvider = () => {
  throw new Error(LIBRARY_DEFAULT_ERROR);
};

export const recaptchaMock: { executeRecaptcha: ((action?: string) => Promise<string>) | undefined } = {
  executeRecaptcha: outsideProvider,
};

export const recaptchaModule = {
  GoogleReCaptchaProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  useGoogleReCaptcha: () => ({ executeRecaptcha: recaptchaMock.executeRecaptcha }),
};
