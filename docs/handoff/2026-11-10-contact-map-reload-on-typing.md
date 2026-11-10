# /contact: map reloaded on every keystroke in the form

**Date:** 2026-11-10

## Problem
On `/contact`, typing anything in "Fill Up The Form" made the Google map on the left ("Get in touch") reload: it flashed blank and loaded again on every key.

Cause: the map comes from the site settings' embed code (`map_iframe`) and was rendered with `dangerouslySetInnerHTML={{ __html: settings.map_iframe }}` inside the page. Every keystroke updates the form state and re-renders the whole page, which builds a new `{ __html }` object each time. React 19 compares that prop by object identity and rewrites `innerHTML` whenever it changes, even when the HTML is the same. That replaces the iframe, so the browser loads the map again. The built-in fallback map (a plain `<iframe>`) was not affected.

## Solution
The map now lives in its own component, `ContactMap`, wrapped in `memo` and given the embed code as a string. Typing in the form no longer re-renders it, so the iframe stays as it is. It only re-renders if the embed code itself changes. The page is also smaller.

## Files changed
- `src/app/contact/components/ContactMap.tsx`: new. The memoised map (CMS embed code, or the default Tampa office map).
- `src/app/contact/page.tsx`: uses `ContactMap` in place of the inline map markup.
- `tests/app/contact/page.test.tsx`: new.
- `e2e/contact-map-typing.spec.ts`: new.

## Testing
- **Vitest, integration** (`tests/app/contact/page.test.tsx`, 2 tests): the page is rendered with the real query client and MSW site settings. After typing in the form, the map iframe is still the same element (CMS map and default map). The CMS-map test failed on the old page and passes now. Full suite: 23 passed.
- **Playwright** (`e2e/contact-map-typing.spec.ts`, 1 test, Chromium): the site settings and the map address are answered in the browser. The spec types in Name, Email and Message, then checks that the map was loaded once and its iframe was not replaced. It failed on the old page and passes now. Run against the already-running dev server on port 3000, because Next refuses a second dev server in the same folder.
- `npm run typecheck` clean; ESLint has no findings on the changed files.

## Open items
- The form fades in (theme WOW animation) only after it is scrolled into view, so E2E specs must scroll it into view before typing. Until then the fields are hidden and key presses are lost.
- Other pages that render CMS HTML with `dangerouslySetInnerHTML` and also hold form state could have the same reload problem. Only `/contact` was checked.
