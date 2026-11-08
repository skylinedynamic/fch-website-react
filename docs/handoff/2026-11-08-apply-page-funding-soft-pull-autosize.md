# /apply: funding options, soft-pull disclosure, auto-sized application

**Date:** 2026-11-08

## Problem
FCH's brief for `/apply`, sections 2–5, still had gaps after the first version (`2026-11-07-apply-page-embedded-form.md`):
- **Funding options:** no overview of the funding categories and no approval disclaimer.
- **Soft-pull statement:** missing near the headline and above the application.
- **The iframe:**
  - It had a fixed height (800px, 1100px on mobile), so the form scrolled inside its own box or left gaps.
  - Moving between steps did not bring the form back into view.
- **Hero:** taller than needed. When "Start My Application" scrolled to the form, the sticky header covered the text above it.

## Solution
- **Hero (section 2):**
  - The template's 120px content padding was cut to 60px to keep the hero compact.
  - The soft-pull headline sits under the supporting text as an outlined pill, above "Start My Application".
- **Funding options (section 3):** `FundingOptionsOverview`, six cards that reuse the `/funding-options` `funding-card` styling, with the brief's exact descriptions.
  - The six categories: Lines of Credit, Term Loans, SBA, Equipment, Business Credit Cards and Revenue-Based Financing.
  - The disclaimer sits beneath the cards.
  - No lender names, rates, amounts, requirements or timelines.
  - The copy is in `src/data/apply.ts`, so FCH's confirmation edits happen in one place.
- **Soft-pull (section 4):** `SoftPullNotice` shows the headline in the hero and again above the application, where it also shows the full supporting disclosure. The text is the brief's, verbatim, from `src/data/apply.ts`.
- **Application (section 5):** `ApplyFormFrame` listens for the embed form's new messages (fch-api, `2026-11-08-embed-form-parent-bridge.md`).
  - **Which messages are accepted:** only those from this iframe (`event.source`) and from the origin of the API's `form_url`, with `source: 'fch-embed-form'`.
  - **`resize`:** sets the iframe height, clamped to 600–20000px. The CSS fixed height stays as the fallback until the first message.
  - **`scroll`:** scrolls the page to the iframe top plus the given offset, minus 100px for the sticky header.
  - `#application` has `scroll-margin-top: 90px`, so the soft-pull text is not hidden under the sticky header.
- **Page structure:** the page was split into components under `src/app/apply/components/` so it does not grow into one large file.

## Files changed
- `src/data/apply.ts`: new. The funding categories, the disclaimer, and the soft-pull headline and disclosure.
- `src/lib/applyForm.ts`: the message protocol (`APPLY_FORM_MESSAGE_SOURCE`, `ApplyFormMessage`) and the min/max height.
- `src/app/apply/components/ApplyFormFrame.tsx`: new. The iframe and the message listener.
- `src/app/apply/components/FundingOptionsOverview.tsx`: new.
- `src/app/apply/components/SoftPullNotice.tsx`: new.
- `src/app/apply/page.tsx`: uses the three components; hero compacted; anchor scroll margin.
- In fch-api: the form side. See `fch-api/docs/handoff/2026-11-08-embed-form-parent-bridge.md`.

## Testing
This repo has no test runner. The checks used headless browsers against `next start`, built with `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1`, the local API and the real local DB.
- **Static checks:** eslint and `tsc --noEmit` are clean for the changed files, and `npm run build` succeeds.
- **Content at 375, 768 and 1280px:**
  - The soft-pull headline appears twice.
  - The supporting disclosure, all six categories and the disclaimer are present.
  - No horizontal scroll at any width.
- **Behaviour:**
  - The page stays at the top on load.
  - The iframe height equals the form's content plus 40px, with no inner scroll. Examples: 1117px at 1280px, 1594px at 375px.
  - Continue on an empty step 1 brings the first invalid field into view.
- **Full submissions through `/apply`:**
  - Runs: Chromium at 1280px; Chromium at 375px using only the keyboard (Tab, Enter and Space); Firefox at 1280px; WebKit at 390px.
  - In every run:
    - all 8 steps were completed and a PDF was uploaded (its file name was shown on step 5)
    - the submit returned 201 and showed "Application Submitted!" with a Reference ID
    - the iframe shrank to about 800px with the confirmation in view
    - no PII appeared in the page URL
  - These submissions went to a mail-safe API on :8001 (log mailer, sync queue). Their rows, files and notices were deleted afterwards.
- **WebKit on Windows:** it cannot verify `code.jquery.com`'s certificate (a local engine trust-store issue), so that run used `ignoreHTTPSErrors`. Real Safari is not affected, but it has not been checked on a device.

## Open items
- **Hero image:** still the template's `hero-bg.png`. A licensed image is needed.
- **Copy sign-off:** the funding categories need FCH confirmation, and the soft-pull wording needs compliance sign-off. The form's step 6 asks for credit-pull authorization.
- **Brief sections 6 and 7, not started:**
  - recording "website" as the submission source (`origin_url` is null today)
  - partner attribution
  - GA4 events for Apply Now and confirmed submissions
  - the success copy's "will contact you shortly"
  - sitemap and SEO row for `/apply`
- **Real devices:** iOS Safari and Android Chrome have not been tested.
- Not committed.
