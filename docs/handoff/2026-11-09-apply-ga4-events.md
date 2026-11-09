# /apply: GA4 events for Apply Now clicks and confirmed submissions

**Date:** 2026-11-09
**Ticket:** SCRUM-435, S435-BUG-01

## Problem
SCRUM-435 section 7 asks for non-sensitive tracking of Apply Now clicks and of confirmed submissions. QA found only page-load and page-change events in `window.dataLayer`, so neither could be counted.

## Solution
- **Apply Now clicks:** the 3 buttons in the header send `apply_now_click` with `location` set to `header`, `sticky` or `mobile`.
- **Confirmed submissions:** the form sends a new `submitted` message when the API confirms success, and `ApplyFormFrame` turns it into `application_submitted`. The form runs in an iframe on the API's domain, so the website cannot see the result itself.
- **No applicant data:** `src/lib/analytics.ts` has only these two fixed functions and no general-purpose track function. Nothing from the message is forwarded, including the Reference ID.
- **Without a Measurement ID:** the calls do nothing.

Decisions from Awlad:
- New-tab submissions are not counted for now.
- Only the 3 header buttons count as Apply Now.
- "Start My Application" is not tracked.
- The submission event is named `application_submitted`.

## Files changed
- `src/lib/analytics.ts`: new. Event names, button locations and the two track functions.
- `src/components/layout/Header.tsx`: the 3 Apply Now buttons send the click event; the mobile one still closes the menu.
- `src/app/apply/components/ApplyFormFrame.tsx`: accepts `submitted` and sends the event.
- `src/lib/applyForm.ts`: `submitted` added to the message type.
- `src/types/global.d.ts`: `window.gtag`.
- `package.json`, `package-lock.json`: first test setup in this repo (Vitest, Testing Library, jsdom, MSW and Playwright as dev dependencies) and the `test`, `test:watch`, `test:e2e` and `typecheck` scripts. In production packages only two patch versions moved: `nanoid` 3.3.11 to 3.3.20 and `source-map-js` 1.2.1 to 1.2.2.
- `vitest.config.ts`, `playwright.config.ts`, `tsconfig.test.json`: test configuration.
- `tsconfig.json`: excludes tests and test configs from the production build's type check.
- `.gitignore`: Playwright output folders.
- `tests/`, `e2e/`: see below.
- In fch-api: the form side. See `fch-api/docs/handoff/2026-11-09-embed-form-submitted-signal.md`.

## Testing
- **Vitest, 17 passed:**
  - Unit: `tests/lib/analytics.test.ts`
  - Integration: `tests/components/layout/Header.test.tsx`, `tests/app/apply/ApplyFormFrame.test.tsx`
  - Feature (page): `tests/app/apply/page.test.tsx`
  - The tests were written first; 7 failed before the code existed.
- **Playwright, 5 passed:** `e2e/apply-tracking.spec.ts`, Chromium only. It covers the 3 buttons, a confirmed submission counted once with no Reference ID, and a rejected submission not counted. It was not run before the code was written.
- **What the E2E fakes:**
  - The submit response is mocked, so nothing is stored or mailed.
  - The field checks are skipped, so the 8 steps are not filled.
  - The embed code and the framing header are changed in the browser, because local settings have no code and localhost is not an allowed domain.
  - Requests to Google are blocked, so test runs never reach the real GA4 property.
- `npm run typecheck`, eslint on the changed files and `npm run build` are clean.
- **To run E2E:** the local API must be on `:8000`. Set `E2E_BACKEND_PATH` if fch-api is not at `../fch-api`.

## Open items
- **Not run:** a real full submission through `/apply`, and a check that the events arrive in GA4 itself. QA should confirm both on stage.
- **New-tab submissions:** "Open Application in a New Tab" submissions are not counted, so GA4's total runs slightly low.
- **GA4 admin:** to report `application_submitted` as a conversion, mark it as a key event. To report by button, register `location` as a custom dimension.
- **CI:** the deploy workflows do not run these tests yet.
- **npm audit:** it reports 4 vulnerabilities in production dependencies, including `sharp`. This change adds no production packages, and they were not addressed here.
- **Not committed.** Deploy order does not matter: the website ignores unknown messages, and an older form simply never sends `submitted`.
