import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import ApplyPage from '@/app/apply/page';
import { server, siteSettingsHandler } from '../../mocks/server';
import { renderWithProviders } from '../../test-utils';

const FORM_ORIGIN = 'https://forms.test';
const CODE = `<iframe src="${FORM_ORIGIN}/form/key" title="Application"></iframe>`;

describe('/apply page tracking', () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('counts a submission confirmed by the form loaded from the site settings', async () => {
    server.use(siteSettingsHandler({ apply_form_embed_code: CODE }));
    const { container } = renderWithProviders(<ApplyPage />);

    const frame = await waitFor(() => {
      const element = container.querySelector('iframe');
      expect(element).not.toBeNull();
      return element as HTMLIFrameElement;
    });

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: { source: 'fch-embed-form', type: 'submitted' },
          origin: FORM_ORIGIN,
          source: frame.contentWindow,
        }),
      );
    });

    expect(window.gtag).toHaveBeenCalledOnce();
    expect(window.gtag).toHaveBeenCalledWith('event', 'application_submitted');
  });

  // SCRUM-435 S435-BUG-03: decided behaviour, which the CMS help text now states.
  it('with no embed code it shows the "not available" notice and no form or link', async () => {
    const { container } = renderWithProviders(<ApplyPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent('The application is not available right now.');
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.queryByRole('link', { name: /Open Application in a New Tab/ })).toBeNull();
  });

  it('sends nothing just for opening the page', async () => {
    server.use(siteSettingsHandler({ apply_form_embed_code: CODE }));
    const { container } = renderWithProviders(<ApplyPage />);

    await waitFor(() => expect(container.querySelector('iframe')).not.toBeNull());

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('does not count "Start My Application"', async () => {
    renderWithProviders(<ApplyPage />);

    screen.getByRole('link', { name: /Start My Application/ }).click();

    expect(window.gtag).not.toHaveBeenCalled();
  });
});
