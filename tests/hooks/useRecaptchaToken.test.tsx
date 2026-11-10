import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { useRecaptchaToken } from '@/hooks/useRecaptchaToken';
import { RecaptchaEnabledContext, RecaptchaNotReadyError } from '@/lib/recaptcha';
import { outsideProvider, recaptchaMock } from '../mocks/recaptcha';

vi.mock('react-google-recaptcha-v3', async () => (await import('../mocks/recaptcha')).recaptchaModule);

const withRecaptcha = (enabled: boolean) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <RecaptchaEnabledContext.Provider value={enabled}>{children}</RecaptchaEnabledContext.Provider>;
  };

describe('useRecaptchaToken', () => {
  beforeEach(() => {
    recaptchaMock.executeRecaptcha = outsideProvider;
  });

  it('gives no token, and never calls the library, when reCAPTCHA is off', async () => {
    const { result } = renderHook(() => useRecaptchaToken(), { wrapper: withRecaptcha(false) });

    await expect(result.current()).resolves.toBeUndefined();
  });

  it('says the check is still loading when reCAPTCHA is on but its script is not ready', async () => {
    recaptchaMock.executeRecaptcha = undefined;
    const { result } = renderHook(() => useRecaptchaToken(), { wrapper: withRecaptcha(true) });

    await expect(result.current()).rejects.toBeInstanceOf(RecaptchaNotReadyError);
  });

  it('gets a token under the lead action when reCAPTCHA is on and loaded', async () => {
    const execute = vi.fn().mockResolvedValue('token-123');
    recaptchaMock.executeRecaptcha = execute;
    const { result } = renderHook(() => useRecaptchaToken(), { wrapper: withRecaptcha(true) });

    await expect(result.current()).resolves.toBe('token-123');
    expect(execute).toHaveBeenCalledWith('contact_form');
  });
});
