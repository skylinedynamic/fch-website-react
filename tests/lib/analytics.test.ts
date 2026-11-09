import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ANALYTICS_EVENTS,
  APPLY_NOW_LOCATIONS,
  trackApplicationSubmitted,
  trackApplyNowClick,
} from '@/lib/analytics';

describe('analytics', () => {
  afterEach(() => {
    delete window.gtag;
  });

  it('names the events the brief asks for', () => {
    expect(ANALYTICS_EVENTS.APPLY_NOW_CLICK).toBe('apply_now_click');
    expect(ANALYTICS_EVENTS.APPLICATION_SUBMITTED).toBe('application_submitted');
  });

  it('sends an Apply Now click with where the button is', () => {
    window.gtag = vi.fn();

    trackApplyNowClick(APPLY_NOW_LOCATIONS.STICKY);

    expect(window.gtag).toHaveBeenCalledOnce();
    expect(window.gtag).toHaveBeenCalledWith('event', 'apply_now_click', { location: 'sticky' });
  });

  it('sends a submission with no parameters at all', () => {
    window.gtag = vi.fn();

    trackApplicationSubmitted();

    expect(window.gtag).toHaveBeenCalledOnce();
    expect(window.gtag).toHaveBeenCalledWith('event', 'application_submitted');
  });

  it('does nothing when Google Analytics is not loaded (no Measurement ID)', () => {
    expect(() => {
      trackApplyNowClick(APPLY_NOW_LOCATIONS.HEADER);
      trackApplicationSubmitted();
    }).not.toThrow();
  });
});
