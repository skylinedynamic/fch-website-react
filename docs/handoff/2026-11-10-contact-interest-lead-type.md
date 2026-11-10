# /contact: "What brings you here today?" sends the lead type and is required

**Date:** 2026-11-10

## Problem
- The contact page sent the label text ("Explore becoming a client" / "Explore partnership opportunities") as `interest`. The API dropped it, so every lead became a Borrower lead.
- The field shows `*`, but the form could be sent without choosing.

## Solution
- `src/lib/leadInterest.ts`: the two answers as `{ value, label }`. `value` is sent as `interest` and is the lead type itself: `Borrower` ("Explore becoming a client") or `Partner` ("Explore partnership opportunities"), as in fch-api's `Lead::WEBSITE_INTERESTS`. The labels are display text only.
- `src/app/contact/components/InterestSelect.tsx`: the custom dropdown, moved out of the page. It shows the label, hands up the value, and shows an error under the field.
- `src/app/contact/page.tsx`: submitting without an answer shows "Please choose what brings you here today." under the field and sends nothing. Choosing an answer clears the message.
- The home "Need Help For Project!" form is unchanged. It has no such question, so it sends no `interest` and stays a Borrower lead.
- API side: `fch-api/docs/handoff/2026-11-10-website-lead-interest-lead-type.md`. `Partner` saves `lead_type = Partner`; `Borrower` or none saves `Borrower`.

## Files changed
- `src/lib/leadInterest.ts`: new.
- `src/app/contact/components/InterestSelect.tsx`: new.
- `src/app/contact/page.tsx`: uses `InterestSelect`; required check; sends the value.
- `tests/app/contact/page.test.tsx`: picks an answer in the existing tests; 4 new tests.
- `tests/lib/leadInterest.test.ts`: new.
- `e2e/lead-forms-recaptcha-off.spec.ts`: the contact form picks an answer; 3 new tests.

## Testing
- Vitest: 48 passed (11 files). The new behaviour tests failed before each change (label sent instead of the value; no required message; then the switch to `Borrower`/`Partner`).
- Playwright: `e2e/lead-forms-recaptcha-off.spec.ts`, 7 passed. Both answers send `Borrower`/`Partner`, and no answer shows the message and sends nothing. The lead POST is answered in the browser. Run against the dev server already on port 3000.
- `npm run typecheck` clean; ESLint has no findings on the changed files.

## Open items
- Deploy the API change before or together with this one. An old API ignores `interest` (still Borrower), so the order is not harmful, just not complete.
