import { describe, expect, it } from 'vitest';
import { LEAD_INTERESTS, leadInterestLabel } from '@/lib/leadInterest';

describe('lead interests', () => {
  // These must match fch-api's Lead::WEBSITE_INTERESTS (the lead types), or the API refuses the lead.
  it('sends the lead types the API accepts', () => {
    expect(LEAD_INTERESTS.map((interest) => interest.value)).toEqual(['Borrower', 'Partner']);
  });

  it('shows the label for a lead type, and nothing for no answer', () => {
    expect(leadInterestLabel('Borrower')).toBe('Explore becoming a client');
    expect(leadInterestLabel('Partner')).toBe('Explore partnership opportunities');
    expect(leadInterestLabel('')).toBeUndefined();
  });
});
