import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import PartnerSection from '@/components/ui/PartnerSection';
import { homeConfig } from '@/data/home';
import { renderWithProviders } from '../../test-utils';

describe('Home partner panels', () => {
  it.each(['Apply to Become a Partner', 'Request White-Label Information'])(
    '"%s" opens the contact page in the same tab',
    (name) => {
      renderWithProviders(<PartnerSection data={homeConfig} />);

      const link = screen.getByRole('link', { name });

      expect(link).toHaveAttribute('href', '/contact');
      expect(link).not.toHaveAttribute('target');
    },
  );

  it('still opens an outside address in a new tab', () => {
    const data = {
      ...homeConfig,
      partner: {
        ...homeConfig.partner,
        panels: [
          {
            ...homeConfig.partner.panels[0],
            cta: { text: 'Partner Sign In', link: 'https://partner.example.com/login' },
          },
        ],
      },
    };
    renderWithProviders(<PartnerSection data={data} />);

    const link = screen.getByRole('link', { name: 'Partner Sign In' });

    expect(link).toHaveAttribute('href', 'https://partner.example.com/login');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
