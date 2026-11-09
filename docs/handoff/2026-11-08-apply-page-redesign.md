# /apply redesigned to match the rest of the site

**Date:** 2026-11-08

## Problem
Review feedback: "design is not good. keep match with others page design. design must be top notch."

The first `/apply` layout used one-off styling that did not match the rest of the site:
- a centred hero with a plain outlined pill
- simple cards
- a bare iframe

`/pre-qualification`, `/funding-options` and `/sba-programs` share one visual language: a left-aligned hero with trust badges and the arrow button, the numbered funding cards, the SBA intro block and dark callout, and the pre-qualification form card.

## Solution
The page is rebuilt from those existing classes. All behaviour is unchanged:
- the API-driven form link
- the iframe auto-size and scroll messages
- the fallback link and the legal links
- the brief's copy

The sections, top to bottom:
- **Hero (`ApplyHero`):** the `/pre-qualification` hero.
  - Breadcrumb, `credit-builder-h1`, the `trust-bar` badges, the `theme-btn` with the arrow icon and the `sub-btn-text` line.
  - The badges are the soft-pull statement: "Soft-Pull Prequalification", "No Hard Inquiry", "No Impact To Your Credit Score".
  - The right-hand column holds a business image (`/images/home-3/about/about-01.jpg`, the template image already used on `/funding-options`) with a floating "Soft-pull only" badge. The image is hidden below 992px.
- **Funding options (`FundingOptionsOverview`):** the `/funding-options` `funding-categories-grid`.
  - The sub-title with triangles and a heading.
  - Six numbered `funding-card`s; the first is `dark-bg`, as on that page.
  - The approval disclaimer in the SBA `sba-intro-callout` dark bar.
- **Soft-pull disclosure (`SoftPullNotice`):** the `/sba-programs` `sba-intro-block` with a label pill, the headline as the title and the full disclosure as the text.
- **Application card:** the `/pre-qualification` `prequal-form-container`, with the teal top border and `prequal-step-title` icon heading.
  - It has a "Secure & Encrypted" pill.
  - The iframe sits in a rounded well.
  - The footer has "Open Application in a New Tab" on the left and Privacy Policy and Terms on the right.
- **Mobile:** the card drops its padding so the form's own fields use the full width.
- **No reveal animation on the form card or the disclosure:** the template's WOW reveal hides `.wow` elements until a scroll event, and the application must not depend on that.
- **CSS:** page-specific styles live in `src/app/apply/apply.css`, only for what the shared classes do not cover. They use the site's colours (`#103C3B`, `#2D9A96`, `#4BD7D4`).
- **Spacing:** the template's 120px top padding on the grid container is cancelled here; the gap below the hero is now similar to the other pages.
- **Same width (follow-up review):** the disclaimer bar, the soft-pull card and the application card now share one width. The application section uses the same Bootstrap `.container` as the funding grid; it had been capped at 1040px.
- **Even gaps:** the gap between the funding section and the application is fixed at 80px (56px below 992px). The template's mixed paddings had produced anything from 14px to 240px.

## Files changed
- `src/app/apply/page.tsx`: composes the sections; the application card markup.
- `src/app/apply/apply.css`: new, the page-specific styles.
- `src/app/apply/components/ApplyHero.tsx`: new, the hero.
- `src/app/apply/components/FundingOptionsOverview.tsx`: rebuilt on the funding grid.
- `src/app/apply/components/SoftPullNotice.tsx`: rebuilt on the SBA intro block.
- `src/data/apply.ts`: adds `SOFT_PULL_POINTS`, the hero badges.

## Testing
All checks used headless Chromium against `next start`, the local API and the real DB.
- **Static checks:** eslint and `tsc` are clean for the changed files, and `npm run build` succeeds.
- **Visual review** at 1280 and 375px, compared side by side with `/pre-qualification`, `/sba-programs` and `/funding-options`. The hero, grid, callouts and form card match those pages.
- **Content and behaviour at 375, 768 and 1280px:**
  - the three soft-pull badges, the full disclosure, all six categories and the disclaimer are present
  - no horizontal scroll
  - the page stays at the top on load
  - the iframe height follows the form (1102px at 1280px) with no inner scroll
  - Continue on an empty step brings the error into view
  - "Start My Application" puts the disclosure 90px from the top, below the sticky header
  - the disclaimer, soft-pull card and application card have the same left edge and width at every width checked:

    | Viewport | Left edge, width |
    |---|---|
    | 1336px | 110px, 1116px |
    | 1920px | 312px, 1296px |
    | 768px | 24px, 720px |
    | 375px | 15px, 345px |

  - the gap above the soft-pull card is 80px on desktop and 56px on tablet and phone
- **Navigation:** the Apply Now checks still pass at 1200–1920px, in the sticky header and in the mobile menu.
- **Not repeated:** the full submissions from the previous change (`2026-11-08-apply-page-funding-soft-pull-autosize.md`). The form and the message handling did not change.

## Open items
- **Hero image:** a template image. FCH's brief asks for a commercially licensed image; replace `/images/home-3/about/about-01.jpg` in `ApplyHero.tsx` once one is supplied.
- **Form's own colours:** the embedded form keeps its own button colour, the partner branding's `primary_color` (dark navy for the host). Matching it to the site's teal is a branding setting, not a website change.
- Not committed.
