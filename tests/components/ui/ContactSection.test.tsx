import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactElement } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactSection from '@/components/ui/ContactSection';
import ReCaptchaProvider from '@/components/providers/ReCaptchaProvider';
import { homeConfig } from '@/data/home';
import { leadsHandler, server } from '../../mocks/server';
import { LIBRARY_DEFAULT_ERROR, outsideProvider, recaptchaMock } from '../../mocks/recaptcha';
import { renderWithProviders } from '../../test-utils';

vi.mock('react-google-recaptcha-v3', async () => (await import('../../mocks/recaptcha')).recaptchaModule);

/** The home page "Need Help For Project!" form, with or without a site key in Site Settings. */
const renderForm = (siteKey?: string): ReturnType<typeof renderWithProviders> => {
  const form: ReactElement = <ContactSection data={homeConfig} />;
  return renderWithProviders(siteKey ? <ReCaptchaProvider siteKey={siteKey}>{form}</ReCaptchaProvider> : form);
};

const fillAndSubmit = async () => {
  await userEvent.type(screen.getByPlaceholderText('Your Name*'), 'Jane Doe');
  await userEvent.type(screen.getByPlaceholderText('Email Address*'), 'jane@example.com');
  await userEvent.type(screen.getByPlaceholderText('Enter Your Message here'), 'Need funding');
  await userEvent.click(screen.getByRole('button', { name: 'Submit Now' }));
};

describe('Home "Need Help For Project!" form', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', '');
    recaptchaMock.executeRecaptcha = outsideProvider;
  });

  it('sends the lead without a token when reCAPTCHA is not set up', async () => {
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderForm();

    await fillAndSubmit();

    expect(await screen.findByText('Thank you! Your message has been sent successfully.')).toBeInTheDocument();
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({ contact_person: 'Jane Doe', email: 'jane@example.com' });
    expect(sent[0]).not.toHaveProperty('recaptcha_token');
  });

  it('sends a reCAPTCHA token, under the action the API checks, when reCAPTCHA is set up', async () => {
    const execute = vi.fn().mockResolvedValue('token-123');
    recaptchaMock.executeRecaptcha = execute;
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderForm('site-key');

    await fillAndSubmit();

    expect(await screen.findByText('Thank you! Your message has been sent successfully.')).toBeInTheDocument();
    expect(execute).toHaveBeenCalledWith('contact_form');
    expect(sent[0]).toMatchObject({ recaptcha_token: 'token-123' });
  });

  it('shows the reason the API refused the lead, not a thank-you', async () => {
    const sent: Record<string, unknown>[] = [];
    server.use(
      leadsHandler(sent, {
        status: 422,
        body: {
          message: 'Please complete the reCAPTCHA verification.',
          errors: { recaptcha_token: ['Please complete the reCAPTCHA verification.'] },
        },
      }),
    );
    renderForm();

    await fillAndSubmit();

    expect(await screen.findByText('Please complete the reCAPTCHA verification.')).toBeInTheDocument();
    expect(screen.queryByText(/Thank you/)).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name*')).toHaveValue('Jane Doe');
  });

  it('asks the visitor to try again while the reCAPTCHA script is still loading', async () => {
    recaptchaMock.executeRecaptcha = undefined;
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderForm('site-key');

    await fillAndSubmit();

    expect(await screen.findByText('The security check is still loading. Please try again in a moment.')).toBeInTheDocument();
    expect(sent).toHaveLength(0);
    expect(screen.queryByText(LIBRARY_DEFAULT_ERROR)).not.toBeInTheDocument();
  });
});
