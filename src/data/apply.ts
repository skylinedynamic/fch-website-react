/**
 * Copy for the /apply page. Funding categories are subject to FCH
 * confirmation before publication. No lender names, rates, amounts,
 * eligibility rules or approval claims belong here.
 */

export interface ApplyFundingCategory {
  title: string;
  desc: string;
  icon: string;
}

export const APPLY_FUNDING_CATEGORIES: ApplyFundingCategory[] = [
  {
    title: 'Business Lines of Credit',
    desc: 'Flexible access to working capital.',
    icon: 'flaticon-business-011-dollar',
  },
  {
    title: 'Business Term Loans',
    desc: 'Financing for growth, operating needs, and larger expenses.',
    icon: 'flaticon-business-028-briefcase',
  },
  {
    title: 'SBA Loans',
    desc: 'Government-backed financing for eligible businesses.',
    icon: 'flaticon-business-054-graph',
  },
  {
    title: 'Equipment Financing',
    desc: 'Financing to purchase or replace business equipment.',
    icon: 'flaticon-business-030-settings',
  },
  {
    title: 'Business Credit Cards',
    desc: 'Credit options for eligible business owners.',
    icon: 'flaticon-business-057-file',
  },
  {
    title: 'Revenue-Based Financing',
    desc: 'Financing options evaluated using business revenue and cash flow.',
    icon: 'flaticon-finance-business-expense-svgrepo-com-1',
  },
];

export const APPLY_FUNDING_DISCLAIMER =
  'Available options depend on your business profile, eligibility, and underwriting. Submitting an application does not guarantee approval or funding.';

export const SOFT_PULL_HEADLINE =
  'Soft-pull prequalification. No hard inquiry. No impact to your credit score.';

export const SOFT_PULL_DISCLOSURE =
  'Any credit review performed by Four Corner Funding for this initial prequalification uses a soft inquiry and does not affect your credit score. A lender may require a separate hard inquiry if you proceed with a financing application. Any such inquiry requires your separate, explicit authorization.';

/** The soft-pull statement as the hero's trust badges (same words as SOFT_PULL_HEADLINE). */
export const SOFT_PULL_POINTS = [
  'Soft-Pull Prequalification',
  'No Hard Inquiry',
  'No Impact To Your Credit Score',
];
