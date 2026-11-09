import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/layout/Header';
import { renderWithProviders } from '../../test-utils';

// The links would navigate, which jsdom cannot do; only the click matters here.
const stopNavigation = (event: Event) => event.preventDefault();

const applyNowIn = (selector: string) => {
  const link = screen
    .getAllByRole('link', { name: 'Apply Now', hidden: true })
    .find((element) => element.closest(selector));
  if (!link) throw new Error(`No Apply Now link inside ${selector}`);
  return link;
};

describe('Header Apply Now tracking', () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    document.addEventListener('click', stopNavigation);
  });

  afterEach(() => {
    delete window.gtag;
    document.removeEventListener('click', stopNavigation);
  });

  it.each([
    ['.header-lower', 'header'],
    ['.sticky-header', 'sticky'],
    ['.mobile-menu', 'mobile'],
  ])('a click on the button in %s is sent as location "%s"', async (selector, location) => {
    renderWithProviders(<Header />);

    await userEvent.click(applyNowIn(selector), { pointerEventsCheck: 0 });

    expect(window.gtag).toHaveBeenCalledOnce();
    expect(window.gtag).toHaveBeenCalledWith('event', 'apply_now_click', { location });
  });

  it('the mobile button still closes the menu', async () => {
    const { container } = renderWithProviders(<Header />);
    await userEvent.click(container.querySelector('.header-lower .mobile-nav-toggler') as Element);
    expect(document.body).toHaveClass('mobile-menu-visible');

    await userEvent.click(applyNowIn('.mobile-menu'), { pointerEventsCheck: 0 });

    expect(document.body).not.toHaveClass('mobile-menu-visible');
  });

  it('other header links send nothing', async () => {
    renderWithProviders(<Header />);

    const [faq] = screen.getAllByRole('link', { name: 'FAQ', hidden: true });
    await userEvent.click(faq, { pointerEventsCheck: 0 });

    expect(window.gtag).not.toHaveBeenCalled();
  });
});
