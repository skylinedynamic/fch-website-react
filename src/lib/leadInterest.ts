/** fch-api's Lead::BORROWER_TYPE_LEAD / Lead::PARTNER_TYPE_LEAD. */
export const LEAD_TYPE_BORROWER = 'Borrower';
export const LEAD_TYPE_PARTNER = 'Partner';

/**
 * "What brings you here today?" on the contact page. `value` is sent to the API
 * as `interest` and saved as the lead's type: it is the lead type itself, as in
 * fch-api's Lead::WEBSITE_INTERESTS. The labels are display text only and can
 * change freely.
 */
export const LEAD_INTERESTS = [
  { value: LEAD_TYPE_BORROWER, label: 'Explore becoming a client' },
  { value: LEAD_TYPE_PARTNER, label: 'Explore partnership opportunities' },
] as const;

export type LeadInterest = (typeof LEAD_INTERESTS)[number]['value'];

export const LEAD_INTEREST_PLACEHOLDER = 'What brings you here today?*';

export const LEAD_INTEREST_REQUIRED_MESSAGE = 'Please choose what brings you here today.';

export const leadInterestLabel = (value: LeadInterest | ''): string | undefined =>
  LEAD_INTERESTS.find((interest) => interest.value === value)?.label;
