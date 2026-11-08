# /apply shows the form as the embed code pasted in CMS settings says

**Date:** 2026-11-08

## Problem
`/apply` built its own iframe link with `?embed=1`. The user wants our website treated like any partner: copy the code from the admin's Embed Form Settings, paste it in, and have `/apply` follow it.

## Solution
- **Where the code goes:** the admin pastes the code into CMS > Site Settings ("Apply Page Form Code").
- **What the API sends:** fch-api checks the code and, from `GET /website/embed-form`, returns only the options read from it. The raw HTML is never sent:
  - `embed_url`: the current key's link with the chosen look
  - `auto_height`, `height` and `radius`
- **The website:**
  - **Iframe:** loads `embed_url`, with the radius as a style.
  - **Automatic height:** keeps the existing message listener. It is the same protocol as the partners' `embed.js`, so no outside script runs on our page.
  - **Fixed height:** the iframe uses `height`, and only the form's scroll requests are followed.
- **Unchanged:**
  - **Nothing pasted:** the API sends `?embed=1` with automatic height, so the page looks the same as before.
  - **"Open Application in a New Tab"** still uses the plain direct link, `form_url`.
  - **`embeddedFormUrl()`** is removed; the API builds the link now.
- **Older API:** if the API has no framing fields yet, the service falls back to `form_url` with automatic height.

## Files changed
- `src/lib/applyForm.ts`: `ApplyFormDetails` gains `embed_url`, `auto_height`, `height` and `radius`; `embeddedFormUrl()` and `APPLY_FORM_EMBED_PARAM` are removed.
- `src/services/applyForm.service.ts`: maps the new fields, with a fallback.
- `src/app/apply/components/ApplyFormFrame.tsx`: uses `embed_url`; a fixed or reported height; the radius.

## Testing
This repo has no test runner. The checks used headless Chromium against the dev server and the local API.
- **Static checks:** eslint is clean for the changed files, and `tsc --noEmit` is clean.
- **Nothing pasted:** the iframe loads `?embed=1` and renders flush at 709px, the same as before. The new-tab link is the plain link.
- **A code saved** into the local DB through the API's rule (white background, fixed 900px, 12px radius): the iframe loads `?bg=white`, is 900px with a 12px radius, and shows the header. The row was removed afterwards.

## Open items
- **Header on with our card:** if the pasted code keeps the header on, the form's logo and title show inside our card under its own title. That is the admin's choice, and the builder's preview shows it.
- Not committed.

## Follow-up (same day): read from the site settings
- **Request:** "pass embedded data in `/api/v1/website/settings` and use this iframe code in apply page."
- **API:** `/website/settings` now carries `apply_form`, the same object as before (`form_title`, `form_url`, `embed_url`, `auto_height`, `height`, `radius`). It is null while there is no live form. The pasted HTML itself is still never sent.
- **Website:** `/apply` reads `settings.data.apply_form` through `useSiteSettings()`. That query is already shared by the header and footer, so the page makes one API call fewer.
  - `toApplyFormDetails()` in `src/lib/applyForm.ts` maps it.
  - `useApplyForm()`, `services/applyForm.service.ts` (and its barrel export) and the `APPLY_FORM` endpoint are removed.
  - The API's `/website/embed-form` endpoint is unchanged and still available.
- **Checked:** `tsc` and eslint are clean. On `/apply`, the only website API call is `/website/settings`. The iframe follows the code saved in the local DB (default look, header on, 8px radius, automatic height 1117px, no inner scroll), and "New Tab" is the plain link.

## Follow-up 2 (same day): render the pasted code itself
- **Request:** "the API sends only the `apply_form_embed_code` value, and the website uses it."
- **API:** `/website/settings` now sends `apply_form_embed_code`, the code as pasted. `apply_form` was removed.
  - The code is sent only while it passes the save check (`EmbedFormSnippet`); otherwise the value is null.
- **Website:**
  - `ApplyFormFrame` renders the code with `dangerouslySetInnerHTML`.
  - **The `<script>` does not run when inserted this way,** so the component does `embed.js`'s job for the iframe. With `data-fch-embed` it follows the form's reported height, and it always follows the form's scroll requests. Messages are accepted only from that iframe and the form's origin.
  - **Scrolling with a fixed height:** the form scrolls itself inside the iframe, so the page only brings the iframe's top into view. Adding the form's offset as well scrolled past the field (to -91px) when tested.
  - **"Open Application in a New Tab":** uses `formLinkFromCode()`, the iframe's address with the options removed.
  - **Removed:** `toApplyFormDetails()`, `ApplyFormDetails` and `APPLY_FORM_TITLE`.
  - **CSS:** the iframe's height comes from the code; `.apply-frame-wrap iframe` only sets display, width and border.
- **Behaviour changes:**
  - **Nothing pasted:** `/apply` shows "The application is not available right now".
  - **After a key regeneration,** the pasted code no longer passes the check, so `/apply` shows the same notice until the new code is pasted.
- **Checked** at 1280 and 375px against the local API:
  - **The saved code** (automatic height, 8px radius): the iframe follows the form (1117px at 1280, 1618px at 375), with no inner scroll. After Continue the first error is at 220px from the top, the new-tab link is the plain link, and the only API call is `/website/settings`.
  - **A fixed-height code** (700px, 16px radius, white, no footer), saved for the test: the height stays at 700px, the form scrolls inside, and the first error is at 220px.
  - **The saved code was restored** afterwards and checked to be identical.
- `tsc` and eslint are clean.

## Follow-up 3 (same day): automatic height without a referrer
- **Fix:** `ApplyFormFrame` says hello to the form when the iframe loads (`{source: 'fch-embed-form', type: 'hello'}`, to the form's origin only). The form then reports its height even when the browser sent it no referrer.
  - Before, such a browser left the iframe at the code's 800px.
  - The form side is in fch-api `docs/handoff/2026-11-08-embed-code-display-options.md` (Follow-up 3).
- **Checked with a `no-referrer` policy:** the iframe is 709px (was 800px). `tsc` and eslint are clean.

## Cleanup (same day)
- **Current state:** the website reads only `apply_form_embed_code` from `/website/settings`. `ApplyFormFrame` renders it, does `embed.js`'s job for it (the hello message, height, the height attribute and scrolling), and `formLinkFromCode()` gives the new-tab link.
- **Removed:** the earlier `apply_form` object, `toApplyFormDetails()`, `useApplyForm()`, `applyForm.service.ts` and the `APPLY_FORM` endpoint. None of them is left in `src/`.
- **Checked:** `tsc` is clean. Live `/apply` with the saved code (transparent background, colour `#103c3b`, automatic height) is 709px at 1280px and 1186px at 375px, with no inner scroll, and the first error after Continue is at 220px.
