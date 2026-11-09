/**
 * Google Analytics events (SCRUM-435 section 7). gtag() is set up in the root
 * layout only when the site settings have a Measurement ID, so every call is a
 * no-op without it.
 *
 * Only these fixed names and values are sent, never anything an applicant
 * typed. That is why there is no general-purpose "track" function here.
 */
export const ANALYTICS_EVENTS = {
  APPLY_NOW_CLICK: 'apply_now_click',
  APPLICATION_SUBMITTED: 'application_submitted',
} as const;

/** Which of the header's Apply Now buttons was clicked. */
export const APPLY_NOW_LOCATIONS = {
  HEADER: 'header',
  STICKY: 'sticky',
  MOBILE: 'mobile',
} as const;

export type ApplyNowLocation = (typeof APPLY_NOW_LOCATIONS)[keyof typeof APPLY_NOW_LOCATIONS];

export const trackApplyNowClick = (location: ApplyNowLocation): void => {
  window.gtag?.('event', ANALYTICS_EVENTS.APPLY_NOW_CLICK, { location });
};

/** Call only once the form has confirmed the submission succeeded. */
export const trackApplicationSubmitted = (): void => {
  window.gtag?.('event', ANALYTICS_EVENTS.APPLICATION_SUBMITTED);
};
