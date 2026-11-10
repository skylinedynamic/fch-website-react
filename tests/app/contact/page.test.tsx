import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '@/app/contact/page';
import ReCaptchaProvider from '@/components/providers/ReCaptchaProvider';
import { leadsHandler, server, siteSettingsHandler } from '../../mocks/server';
import { LIBRARY_DEFAULT_ERROR, outsideProvider, recaptchaMock } from '../../mocks/recaptcha';
import { renderWithProviders } from '../../test-utils';

vi.mock('react-google-recaptcha-v3', async () => (await import('../../mocks/recaptcha')).recaptchaModule);

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', '');
  recaptchaMock.executeRecaptcha = outsideProvider;
});

const MAP = '<iframe src="https://maps.test/embed" title="Office map"></iframe>';

describe('/contact map', () => {
  it('keeps the map from the site settings loaded while the visitor types in the form', async () => {
    server.use(siteSettingsHandler({ map_iframe: MAP }));
    const { container } = renderWithProviders(<ContactPage />);

    const map = await waitFor(() => {
      // The default map shows until the settings arrive; wait for the CMS one.
      const element = container.querySelector('.google-map iframe[src="https://maps.test/embed"]');
      expect(element).not.toBeNull();
      return element as HTMLIFrameElement;
    });

    await userEvent.type(screen.getByPlaceholderText('Your Name*'), 'Jane');
    await userEvent.type(screen.getByPlaceholderText('Enter Your Message here'), 'Hi');

    // A new iframe element means the browser loaded the map again.
    expect(container.querySelector('.google-map iframe')).toBe(map);
  });

  it('keeps the default map loaded while the visitor types in the form', async () => {
    server.use(siteSettingsHandler({}));
    const { container } = renderWithProviders(<ContactPage />);

    const map = container.querySelector('.google-map iframe');
    expect(map).not.toBeNull();

    await userEvent.type(screen.getByPlaceholderText('Your Name*'), 'Jane');

    expect(container.querySelector('.google-map iframe')).toBe(map);
  });
});

/** The page as the layout wraps it: with the reCAPTCHA provider only when a site key is set. */
const renderPage = (siteKey?: string) =>
  renderWithProviders(siteKey ? <ReCaptchaProvider siteKey={siteKey}><ContactPage /></ReCaptchaProvider> : <ContactPage />);

/** Picks an answer to "What brings you here today?" (the custom dropdown). */
const chooseInterest = async (label: string) => {
  await userEvent.click(screen.getByText('What brings you here today?*'));
  await userEvent.click(screen.getByText(label));
};

const fillAndSubmit = async (interest: string | null = 'Explore becoming a client') => {
  await userEvent.type(screen.getByPlaceholderText('Your Name*'), 'Jane Doe');
  await userEvent.type(screen.getByPlaceholderText('Email Address*'), 'jane@example.com');
  if (interest) await chooseInterest(interest);
  await userEvent.type(screen.getByPlaceholderText('Enter Your Message here'), 'Hello');
  await userEvent.click(screen.getByRole('button', { name: 'Submit Now' }));
};

describe('/contact form and reCAPTCHA', () => {
  it('sends the lead without a token when reCAPTCHA is not set up in Site Settings', async () => {
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderPage();

    await fillAndSubmit();

    expect(await screen.findByText('Thank you for reaching out! Your message has been sent.')).toBeInTheDocument();
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({ contact_person: 'Jane Doe', email: 'jane@example.com' });
    expect(sent[0]).not.toHaveProperty('recaptcha_token');
    expect(screen.queryByText(LIBRARY_DEFAULT_ERROR)).not.toBeInTheDocument();
  });

  it('sends a reCAPTCHA token when reCAPTCHA is set up', async () => {
    const execute = vi.fn().mockResolvedValue('token-123');
    recaptchaMock.executeRecaptcha = execute;
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderPage('site-key');

    await fillAndSubmit();

    expect(await screen.findByText('Thank you for reaching out! Your message has been sent.')).toBeInTheDocument();
    expect(execute).toHaveBeenCalledWith('contact_form');
    expect(sent[0]).toMatchObject({ recaptcha_token: 'token-123' });
  });

  it('asks the visitor to try again while the reCAPTCHA script is still loading', async () => {
    recaptchaMock.executeRecaptcha = undefined;
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderPage('site-key');

    await fillAndSubmit();

    expect(await screen.findByText('The security check is still loading. Please try again in a moment.')).toBeInTheDocument();
    expect(sent).toHaveLength(0);
  });

  it('shows a plain message, never the library error, when the reCAPTCHA check itself fails', async () => {
    recaptchaMock.executeRecaptcha = vi.fn().mockRejectedValue(new Error('grecaptcha blew up'));
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderPage('site-key');

    await fillAndSubmit();

    expect(await screen.findByText('Something went wrong. Please try again.')).toBeInTheDocument();
    expect(screen.queryByText('grecaptcha blew up')).not.toBeInTheDocument();
    expect(sent).toHaveLength(0);
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
    renderPage();

    await fillAndSubmit();

    expect(await screen.findByText('Please complete the reCAPTCHA verification.')).toBeInTheDocument();
    expect(screen.queryByText(/Thank you/)).not.toBeInTheDocument();
  });
});

describe('/contact "What brings you here today?"', () => {
  it.each([
    ['Explore becoming a client', 'Borrower'],
    ['Explore partnership opportunities', 'Partner'],
  ])('sends "%s" as interest "%s"', async (label, code) => {
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderPage();

    await fillAndSubmit(label);

    expect(await screen.findByText('Thank you for reaching out! Your message has been sent.')).toBeInTheDocument();
    expect(sent[0]).toMatchObject({ interest: code });
  });

  it('shows the chosen answer in the field', async () => {
    renderPage();

    await chooseInterest('Explore partnership opportunities');

    expect(screen.queryByText('What brings you here today?*')).not.toBeInTheDocument();
    expect(screen.getByText('Explore partnership opportunities')).toBeInTheDocument();
  });

  it('asks for an answer under the field, and sends nothing, when none is chosen', async () => {
    const sent: Record<string, unknown>[] = [];
    server.use(leadsHandler(sent));
    renderPage();

    await fillAndSubmit(null);

    expect(await screen.findByText('Please choose what brings you here today.')).toBeInTheDocument();
    expect(sent).toHaveLength(0);

    // Choosing one clears the message.
    await chooseInterest('Explore becoming a client');
    expect(screen.queryByText('Please choose what brings you here today.')).not.toBeInTheDocument();
  });
});
