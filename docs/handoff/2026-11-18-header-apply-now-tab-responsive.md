# Header Apply Now: always on the hero tab; mobile menu from 1200px

**Date:** 2026-11-18

## Problem
"Apply Now section not responsive."
- **On desktop, 1200–1680px:** the header's Apply Now button hung off the dark tab in the hero's top-right corner. Part of the button sat on the light page background.
  - On tall heroes (`/`) the button stuck out of the tab on the left.
  - On shorter heroes (`/faq`, `/terms`) it sat flush against the hero's right edge, and the tab's rounded corner was cut off.
- **The cause:** the tab is drawn in `hero-bg.png` (1860×940; tab from x=1530, top 100px).
  - The hero used `background-size: cover`. When a hero is taller than the image's 1.98:1 ratio, which covers most laptop widths, the image scales to the hero's height and its right edge is cropped.
  - At 1440px on `/`, 120px was cropped. Only 147px of the tab was left for a 154px button.
  - The 2026-11-08 fix (`.header-cta` min-width) assumed the tab is never wider than 18%. It never considered the tab being narrower.
- **At 1024–1199px:** the header hid Apply Now, which it does below 1200px. But the template only switches to the hamburger below 1024px. So the six links wrapped onto two rows, and there was no way to reach Apply Now.

## Solution
- **Hero (`globals.css`, ≥1200px):**
  - `.hero-section.hero-3` now scales the image to the hero's width (`background-size: 100% auto`) instead of `cover`. The whole tab, rounded corner included, is always shown, at a fixed 17.7% of the hero. The grid is not distorted.
  - When the hero is taller than the scaled image, a `::before` fills the rest with the card colour (`#144443`, the image's own colour). The fill starts below the grid at y=900/940, and collapses to nothing on short heroes.
  - The hero's bottom corners get the image's own radius, so they stay rounded whichever of the image or the fill reaches the bottom.
  - This applies to every page that uses the hero, about 20 of them. Below 1200px nothing changes: the hero is already a flat colour there.
- **Header (`Header.tsx`):**
  - `.header-cta` gets a right padding that centres the button on the tab. At the button's height the tab spans x 1557–1860 of the image, so its centre is 148.5/1860 of the hero in from the right edge. The `min-width` that keeps the links off the tab is unchanged.
    - The padding is that distance, less half the button: the button is 154px wide, or 128px below 1440px, where its padding is 22px.
    - From 1700px up, it also subtracts 40px. The template widens `.main-box`'s side padding from 30px to 70px there, so the header's right edge sits 40px inside the hero's.
    - **Follow-up review, "button must show in center place":** the first version ignored the 40px and the narrower button, so at 1920px the button sat about 40px left of the tab's centre.
  - Below 1200px the main and sticky headers hide the desktop links and show the hamburger, which matches where Apply Now is hidden. The mobile menu has Apply Now.

## Files changed
- `src/app/globals.css`: the desktop hero background is scaled to the hero's width, with the colour fill and the bottom radius.
- `src/components/layout/Header.tsx`: `.header-cta` padding centres the button on the tab, with separate values below 1440px and from 1700px; the mobile menu now switches at 1200px instead of 1024px. The comments are updated.
- `e2e/header-apply-tab.spec.ts` (new):
  - **Pixel checks:** at 1200, 1280, 1366, 1440, 1536, 1680, 1920 and 2560px, on `/`, `/faq` and `/terms`, the pixels just left and right of Apply Now must be the dark tab and not the page background. Pixels are decoded with `sharp`.
  - **Centring:** at the same widths and pages, the button's centre must be within 4px of the tab's centre.
  - **Below 1200px:** at 1024, 1100 and 1199px, the desktop links are hidden, the hamburger opens a menu with Apply Now, and the sticky header shows its toggle.

## Testing
- **Red first:**
  - The pixel checks failed 18 of 24 on the old code. The left side failed on `/` at 1200–1680px and on `/faq` at 1200–1280px; the right side failed on `/faq` and `/terms`.
  - The below-1200 checks failed 6 of 6.
  - The centring checks failed 15 of 24 on the first version of the fix, at 1200–1439px and at 1920 and 2560px.
- **After the fix:**
  - `e2e/header-apply-tab.spec.ts`: 54/54 pass.
  - Existing header e2e tests (`apply-tracking.spec.ts`, the three "Apply Now button is tracked" tests): 3/3 pass.
  - `npm test`: 48/48 pass.
  - `npm run typecheck` is clean, and eslint is clean on the changed TS files.
- **Visual check:** screenshots at 1024, 1200, 1440 and 1920px show the full tab with the button centred, rounded bottom corners, and no seam where the fill meets the image.
- The e2e runs used the dev server already running on :3000, through a temporary copy of `playwright.config.ts` with `baseURL` changed. The project config starts its own server on :3100, which refuses to start while another `next dev` is running for this directory.
- `@playwright/test` was in `package.json` but missing from `node_modules`. `npm install` added it, and no lockfile change was needed.

## Open items
- The hero's colour fill hard-codes `#144443` (as `--hero-card-color`), the colour inside `hero-bg.png`. If the image is replaced (a licensed hero is still pending), update the colour and the tab geometry numbers (1530/1593/1830/1860, 900/940) in `globals.css` and `Header.tsx`.
- The centring padding also depends on the button's width (128px or 154px). If the button's padding or font changes, update the 64px/77px/117px values in `Header.tsx`.
- Not committed.
