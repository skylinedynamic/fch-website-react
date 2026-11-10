import { describe, expect, it } from 'vitest';
import { ApiError } from '@/lib/api/client';
import { RecaptchaNotReadyError } from '@/lib/recaptcha';
import { leadErrorMessage } from '@/services/leads.service';

describe('leadErrorMessage', () => {
  it("shows the API's own reason", () => {
    expect(leadErrorMessage(new ApiError('Please complete the reCAPTCHA verification.', 422))).toBe(
      'Please complete the reCAPTCHA verification.',
    );
  });

  it('shows the "still loading" note', () => {
    expect(leadErrorMessage(new RecaptchaNotReadyError())).toBe(
      'The security check is still loading. Please try again in a moment.',
    );
  });

  it('hides any other error behind a plain message', () => {
    expect(leadErrorMessage(new Error('GoogleReCaptcha Context has not yet been implemented'))).toBe(
      'Something went wrong. Please try again.',
    );
    expect(leadErrorMessage('boom')).toBe('Something went wrong. Please try again.');
  });
});
