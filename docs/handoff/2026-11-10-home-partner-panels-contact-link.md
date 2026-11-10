# Home: partner panel buttons open the contact page

**Date:** 2026-11-10

## Problem
On the home page, both partner panels sent visitors to the partner portal sign-in page, in a new tab: "Apply to Become a Partner" ("For Partners") and "Request White-Label Information" ("White-label solutions"). A prospective partner has no login yet, so these buttons should lead to the contact page.

## Solution
- Both buttons now link to `/contact`.
- `PartnerSection` opens a link that starts with `/` through Next's `Link`, in the same tab, like the site's other `/contact` buttons. An outside address still opens in a new tab with `rel="noopener noreferrer"`.

Decision from Awlad: both buttons go to `/contact`, not only the white-label one.

## Files changed
- `src/data/home.ts`: both partner panel CTAs link to `/contact`; the unused `PARTNER_PORTAL_URL` import was removed.
- `src/components/ui/PartnerSection.tsx`: internal links render with `Link` in the same tab; outside links keep the new-tab `<a>`.
- `tests/components/ui/PartnerSection.test.tsx`: new.
- `e2e/home-partner-panels-contact.spec.ts`: new.

## Testing
- **Vitest:** `tests/components/ui/PartnerSection.test.tsx` has 3 tests (both buttons go to `/contact` in the same tab; an outside link still opens a new tab). The 2 `/contact` tests failed before the change. Full suite: 21 passed.
- **Playwright, 2 passed:** `e2e/home-partner-panels-contact.spec.ts`, Chromium. Each button on `/` opens `/contact` in the same tab.
- `npm run typecheck` clean; ESLint has no findings on the changed files.

## Open items
- `/contact` is still written as a literal across the site (about 15 places). A shared route constant would be a separate clean-up.
- The partner portal sign-in link is still in the header and footer.
