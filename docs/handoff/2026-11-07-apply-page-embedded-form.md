# /apply page with the embedded application form

**Date:** 2026-11-07

## Problem
The website has no page where a visitor can apply for funding. FCH asked for a dedicated `fourcornerfunding.com/apply` page that embeds the existing application (the fch-api embed form at `/form/share_pub_fe134e18168705c7361c8f9128f99f56`) instead of a new form. This is step 1 of that brief: the page and the iframe.

## Solution
- New `/apply` route, built like `/terms`. It has a compact hero with a breadcrumb, the headline "Explore Funding Options for Your Business", the supporting text from the brief, and a "Start My Application" button that scrolls smoothly to `#application`.
- The application section has:
  - the iframe: full width, 800px tall, 1100px below 768px, no border, 8px radius, not sandboxed so uploads and submit keep working
  - an "Open Application in a New Tab" fallback link
  - Privacy Policy and Terms links
- **The form link comes from the API, not the code.** The page calls `GET /website/embed-form`, a new fch-api endpoint that returns the host's active form as `{form_title, form_url}`. It goes through `applyFormService.fetchApplyForm()` and the `useApplyForm()` hook, following the existing `fetchFromApi`/`API_ENDPOINTS`/`useCMS` pattern. A regenerated key therefore needs no website change.
  - While loading, the page shows "Loading the application…".
  - If the API has no form or fails, the page shows "The application is not available right now…" instead of an empty frame, and hides the new-tab link.

- **Apply Now in the navigation** (`Header.tsx`): a `theme-btn` link to `APPLY_PAGE_PATH` (`/apply`), placed before "Borrower Portal" in all three places:
  - the desktop header
  - the sticky header shown after scrolling
  - the mobile menu, where clicking it also closes the menu
  - Below 1200px the template hides header buttons, so on phones and tablets it is in the mobile menu, as Borrower Portal already was.
  - Spacing was tightened so the second button fits on one row: nav gaps and button padding between 1200 and 1439px, and in the sticky header (whose container stops at 1320px) at every width.

## Files changed
- `src/components/layout/Header.tsx`: Apply Now in the desktop, sticky and mobile navigation, plus the spacing rules.
- `src/lib/applyForm.ts`: new. Holds the `ApplyFormDetails` type, the `APPLY_FORM_TITLE` fallback, `APPLY_FORM_ANCHOR` and `APPLY_PAGE_PATH`.
- `src/lib/api/endpoints.ts`: `WEBSITE.APPLY_FORM = '/website/embed-form'`.
- `src/services/applyForm.service.ts`: new, `fetchApplyForm()`. Exported from `src/services/index.ts`.
- `src/hooks/useCMS.ts`: `useApplyForm()`.
- `src/app/apply/layout.tsx`: new. Metadata through `getDynamicMetadata('/apply', 'Apply for Business Funding')`.
- `src/app/apply/page.tsx`: new. Hero, then the iframe built from the API data (or a loading or unavailable message), the fallback link and the legal links.
- In fch-api: the endpoint itself. See `fch-api/docs/handoff/2026-11-07-website-apply-form-endpoint.md`.

## Testing
This repo has no test runner, so all checks were done in a real browser.
- **eslint and build:** `npx eslint src/app/apply src/lib/applyForm.ts` is clean. `npm run build` succeeds and `/apply` appears in the route list. The build logs "Error fetching /website/settings" because the local API was down; every route logs it, not just `/apply`.
- **Layout (headless Chromium against `next start`, at 375, 768 and 1280px):**
  - The heading, iframe `src`/`title`, the fallback link (`target=_blank`) and the Privacy/Terms links are all present.
  - `scrollWidth === innerWidth` at every width, so there is no horizontal scroll.
  - "Start My Application" brings `#application` to the top.
- **Framing:**
  - The live form sends `Content-Security-Policy: frame-ancestors https://fourcornerfunding.com https://www.fourcornerfunding.com`. From `localhost` the browser therefore blocks the frame. That is expected and is not a bug in the page.
  - I served the local build under `https://fourcornerfunding.com/*` (Playwright routing; `/form/*` went to the real live form). The form loaded inside the iframe at 375 and 1280px with 103 fields and no CSP errors. Nothing was typed or submitted.

- **Against the local API** (the site built with `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1`, real local DB, at 375 and 1280px):
  - `/website/embed-form` answered 200.
  - The iframe `src` and the new-tab link both equal the API's `form_url` (`…/form/share_pub_5b0d5728…`). The iframe title is the API's "Business Loan Application".
  - The form loaded inside the iframe with 103 fields. There is no horizontal scroll.
- **API answering 404 (simulated):** no iframe and no new-tab link; the "not available" message is shown.
- **eslint and `tsc --noEmit`:** clean for the changed files.
- **Apply Now (headless Chromium, `next start`):**
  - At 1200, 1280, 1440 and 1920px, the desktop button is visible in the header row with no horizontal scroll.
  - The sticky header's Apply Now opens `/apply`.
  - At 375 and 768px, the header shows no button. The mobile menu has Apply Now, which opens `/apply` and closes the menu.
- **One-row check, with and without Apply Now (the latter by hiding it with CSS):**
  - The sticky header is one row at 1200–1920px.
  - The main header is one row from 1280px.
  - At exactly 1200px the main header's links already wrapped to two rows before this change. That is unchanged, and not caused by the new button.

## Open items
- **Dev and staging:** the page frames whatever form the API names. That form's `allowed_domains` must include the site's domain, or the list must be empty, or the browser blocks the frame.
- **Local API base URL:** the local `.env` has no `NEXT_PUBLIC_API_BASE_URL`, so in dev the site calls the relative `/api/v1`, which nothing serves. Set it to `http://127.0.0.1:8000/api/v1` to see the form locally. This affects the whole site, not just this page.
- The main header wraps at 1200–1279px. This was there before this change.
- **Remaining items from the brief, not done yet:**
  - Funding options overview and the approval disclaimer.
  - The soft-pull disclosure, shown twice. The form itself asks for credit-pull authorization, so the wording needs FCH/compliance sign-off.
  - Iframe auto-resize and tracking of confirmed submissions. Both need a `postMessage` from the fch-api Blade form, which has none today.
  - Tracking Apply Now clicks (GA4).
  - Recording "website" as the submission source. fch-api has no field for it.
  - Adding `/apply` to `src/app/sitemap.ts`, and a CMS SEO row for `/apply`.
  - A licensed hero image. The page currently uses the template's `hero-bg.png`.
- Branch `feature/embedded-form`. Not committed.
