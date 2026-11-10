import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '@/app/contact/page';
import { server, siteSettingsHandler } from '../../mocks/server';
import { renderWithProviders } from '../../test-utils';

vi.mock('react-google-recaptcha-v3', () => ({
  useGoogleReCaptcha: () => ({ executeRecaptcha: undefined }),
}));

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
