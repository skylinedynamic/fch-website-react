# Lead forms: work with reCAPTCHA on or off, and never fake a "sent"

**Date:** 2026-11-10

## Problem
Two website forms send leads to `POST /api/v1/website/leads`: the `/contact` form and the home page "Need Help For Project!" form. Neither handled every reCAPTCHA setting in Partner portal → CMS → Site Settings:

- **reCAPTCHA not set up (no site key):** the reCAPTCHA provider is not mounted, and outside it the library's `executeRecaptcha` only throws. The `/contact` form called it, sent nothing, and showed the raw library error: "GoogleReCaptcha Context has not yet been implemented, if you are using useGoogleReCaptcha hook…". The API would have accepted the lead, because it skips the check while no secret is saved.
- **reCAPTCHA set up (secret saved):** the home form never sent a token, so the API refused every lead with a 422 "Please complete the reCAPTCHA verification."
- **Any refused lead:** `fetchFromApi` turns every API error into `null`, so both forms showed "Thank you… sent" even when the API refused the lead. The visitor thought it was sent, but nothing was saved.

## Solution
- `useRecaptchaToken()` (`src/hooks/`) gets the token for both forms:
  - reCAPTCHA off: no token, and the form sends without one.
  - On, but the script is still loading: "The security check is still loading. Please try again in a moment."
  - On and loaded: a token made under `contact_form`, the action fch-api's `StoreLeadRequest` checks. That name is a constant in `src/lib/recaptcha.ts`.
- `ReCaptchaProvider` now also says whether reCAPTCHA is on (`RecaptchaEnabledContext`), so the forms never call the library's throwing default.
- `postToApi` (`src/lib/api/client.ts`) throws an `ApiError` carrying the API's message. `leadsService.submitLead` uses it, so a refused lead shows the API's reason and the typed values stay. `fetchFromApi` is unchanged for CMS reads.
- `leadErrorMessage` decides what a form shows: the API's reason or the "still loading" note, otherwise "Something went wrong. Please try again." A raw library or network error is never shown.
- No change in fch-api.

## Files changed
- `src/lib/recaptcha.ts`: new. Action constant, "still loading" error, enabled context.
- `src/hooks/useRecaptchaToken.ts`: new. The token hook.
- `src/components/providers/ReCaptchaProvider.tsx`: provides the enabled flag.
- `src/lib/api/client.ts`: `ApiError`, `postToApi`, `GENERIC_ERROR_MESSAGE`.
- `src/services/leads.service.ts`: `submitLead` via `postToApi`; `leadErrorMessage`.
- `src/app/contact/page.tsx`: uses the hook; sends a token only when there is one.
- `src/components/ui/ContactSection.tsx`: home form uses the hook and sends a token when reCAPTCHA is on. Also two `'` in its text escaped (existing ESLint errors).
- `tests/mocks/recaptcha.tsx` (new), `tests/mocks/server.ts` (`leadsHandler`): test helpers.

## Testing
- **Vitest, 42 passed** (10 files). The new tests were written first, and 11 failed before the code changed:
  - Unit: `tests/lib/api/client.test.ts` (4), `tests/hooks/useRecaptchaToken.test.tsx` (3), `tests/services/leads.service.test.ts` (3).
  - Integration: `tests/components/ui/ContactSection.test.tsx` (4) and `tests/app/contact/page.test.tsx` (5 new). Each covers reCAPTCHA off, on, still loading, check failing, and an API refusal.
- **Playwright, 4 new passed:** `e2e/lead-forms-recaptcha-off.spec.ts`, both forms with reCAPTCHA off. The lead POST is answered in the browser, so no real lead is created. On the old code, 3 of the 4 failed; the one that passed was the home form without reCAPTCHA, which already worked. The earlier map and partner-panel specs still pass (7 in all). Run against the dev server already on port 3000.
- `npm run typecheck` clean; ESLint shows no errors (one existing `<img>` warning in `ContactSection`).

## Open items
- **Local Site Settings are half set up:** a reCAPTCHA secret is saved but no site key. The API then requires a token the website cannot make, so locally both forms now show "Please complete the reCAPTCHA verification." instead of a false thank-you. Save the site key too, or clear the secret. The same applies on stage and production: save both keys or neither.
- reCAPTCHA *on* is covered by Vitest only. An E2E would need a real site key in Site Settings.
- `prequalification.service.ts` still posts through `fetchFromApi`, so a refused pre-qualification would also come back as `null`. Not checked here.
