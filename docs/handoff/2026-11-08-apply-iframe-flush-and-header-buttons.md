# /apply iframe flush in its card; header shows Apply Now as the only button

**Date:** 2026-11-08

## Problem
1. **"In apply page iframe design is not good."** The application card on `/apply` held a grey box, which held the form's own logo/title card and then its form card. That was three nested frames, the title appeared twice, and there was a grey gap under the copyright.
2. **Header request:** put Apply Now where the Borrower Portal button was. Show Borrower Portal where Apply Now was, as a plain link like "Partner Sign In".

## Solution
1. **iframe:**
   - The iframe loads the form with `?embed=1` (`embeddedFormUrl()` / `APPLY_FORM_EMBED_PARAM` in `src/lib/applyForm.ts`). The form then renders only its stepper and fields; see fch-api `docs/handoff/2026-11-08-embed-form-embedded-layout.md`.
   - "Open Application in a New Tab" keeps the plain `form_url`, with the full branded page.
   - The message origin check is unchanged: it uses the origin of `form_url`.
   - The grey well around the iframe is removed, so the site card is the only frame.
   - On phones the iframe gets 16px/12px padding, because the card has none there.
2. **Header (`src/components/layout/Header.tsx`):**
   - Borrower Portal is now a nav link after Partner Sign In. It opens in a new tab, like Partner Sign In.
   - Apply Now is the only button, at the far right.
   - This applies to the main header, the sticky header and the mobile menu.
   - The CSS that only spaced the two buttons apart was removed.
3. **Follow-up review: "design broken."** At wide screens (about 1536px and up) "Borrower Portal" ran into the dark tab in the hero's top-right corner.
   - **The cause:** the tab is part of `hero-bg.png`, which is 1860px wide with the tab from x=1530, about 18% of the width. The hero shows it with `background-size: cover` from the top-left, so the visible tab grows to about 330px on wide screens. With two buttons, the second one had filled that space; with one, the links moved onto it.
   - **The fix:** Apply Now is wrapped in `.header-cta`, which is `min-width: calc((100vw - 60px) * 0.18 - 40px)` and right-aligned. Cover from the top-left never shows more than 18% of the hero, so the links end before the tab at every width.
   - **Link gaps:** to keep six links on one line, the gaps are 16px from 1200 to 1439px, 34px from 1440 to 1679px, and the template's 50px from 1680px. The last link has no right gap.
   - The earlier one-line check had compared the button's top edge with the links' tops, so it missed that 1200px wrapped. It now checks only the links.

## Files changed
- `src/lib/applyForm.ts`: `APPLY_FORM_EMBED_PARAM`, `embeddedFormUrl()`.
- `src/app/apply/components/ApplyFormFrame.tsx`: the iframe `src` uses `embeddedFormUrl()`.
- `src/app/apply/apply.css`: no grey well; mobile padding around the iframe.
- `src/components/layout/Header.tsx`: Borrower Portal moved into `navLinks`; the second button removed in all three places.

## Testing
This repo has no test runner. The checks used headless Chromium against the running dev server, the local API and the real DB.
- **Static checks:** eslint is clean for the changed files, and `tsc --noEmit` is clean.
- **`/apply` at 1280, 768 and 375px:**
  - the iframe loads `?embed=1` and renders flush
  - the iframe is 709px at 1280px (was 1117px)
  - no inner scroll and no page horizontal scroll
  - Continue on an empty step brings the first error to 220px from the top
- **Header at 1200, 1280, 1366, 1440 and 1920px:**
  - order: Funding Options, Credit Builder, Partner Program, FAQ, Partner Sign In, Borrower Portal, then the Apply Now button
  - fits on one line with no horizontal scroll, in the main and sticky headers
  - Borrower Portal opens `NEXT_PUBLIC_BORROWER_PORTAL_URL` in a new tab
  - the 375px mobile menu has the same order, with Apply Now as the button
- **Header after the tab fix:** at 1200, 1240, 1280, 1366, 1439, 1440, 1536, 1600, 1679, 1680, 1920 and 2560px:
  - the links are on one line, with no horizontal scroll
  - the space between "Borrower Portal" and the tab's edge is 118–357px, worked out from the cover scale and the tab's slope in the image
  - the sticky header is on one line at 1200, 1280, 1440 and 1920px
  - checked visually on `/`, `/apply` and `/faq`
- **Not re-run:** the full form submission, because the form logic did not change.

## Open items
- **Button colour:** the form's buttons are still the branding `primary_color` (navy), not the site's teal. That is a branding setting.
- Not committed.
