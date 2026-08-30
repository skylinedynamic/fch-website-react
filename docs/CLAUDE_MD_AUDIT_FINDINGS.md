# CLAUDE.md Audit Findings — fch-website-react

Generated 2026-08-30. `CLAUDE.md` for this repo was written the same session, from a fairly quick scan — this audit re-checked it more thoroughly against the actual repo (`src/app/`, `src/hooks/`, `src/lib/`, `.github/workflows/`) and found several gaps. Nothing here has been applied to `CLAUDE.md` yet — treat this as a to-do list for the next doc update.

## Stale / incorrect claims in CLAUDE.md

1. **Routing list incomplete (CLAUDE.md:13)** — omits four real page folders: `src/app/asset-and-equipment/page.tsx`, `src/app/business-acquisition/page.tsx`, `src/app/receivables-and-cash-flow/page.tsx`, `src/app/working-capital-and-growth/page.tsx` — all linked to from `funding-options/page.tsx` (e.g. line 29 links `/working-capital-and-growth`).

2. **Data/services split oversimplified (CLAUDE.md:14)** — the doc describes only two patterns (static `src/data/*.ts` config, or a live service). In practice there's a third: `src/app/funding-options/page.tsx:13-40` hardcodes its `fundingCards` array inline in the page file (not from `src/data/`) while still calling `getDynamicMetadata` for SEO. Separately, `src/app/business-acquisition/page.tsx:1-17` is a `'use client'` page (not server-rendered) that imports its data from `src/data/businessAcquisition.ts`.

3. **"Server-rendered" framing overstated (CLAUDE.md:3)** — `src/app/pre-qualification/page.tsx:1,14,26` is a full client component (`'use client'`) that fetches `locationsService.fetchLocations()` client-side in a `useEffect`, not server-side via a page-level `await`. Not every page follows the server-component pattern the intro line implies.

4. **Providers list incomplete (CLAUDE.md:18)** — only mentions `src/components/providers/ReCaptchaProvider.tsx`. The TanStack Query provider actually lives at `src/lib/providers/QueryProvider.tsx` and is wired into `src/app/layout.tsx:219` (`<QueryProvider>` wraps `Header`/`ReCaptchaProvider`/`Footer`) — a `QueryClientProvider` is wired up app-wide, contrary to what the doc's silence on it implies.

5. **Deploy framing ("both deploy the same way")** — `stage_deploy.yml` isn't just a staging variant of the production box. It targets a fully separate host (`skylinedynamic.dev`/`api.skylinedynamic.dev`), separate SSH secrets (`STAGE_SSH_*` vs `PROD_SSH_*`), a separate remote path (`/var/www/html/fch` vs `/var/www/html/fourcornerfunding`), and a separate PM2 fallback name.

## Missing from CLAUDE.md

1. **TanStack Query is actively used**: `src/hooks/useCMS.ts:1-31` defines `useSiteSettings`, `useBlogPosts`, `useBlogCategories`, `useBlogTags` via `useQuery`, backed by the `QueryProvider` in `layout.tsx:219`. Not mentioned anywhere.

2. **`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` env var undocumented**: `src/components/providers/ReCaptchaProvider.tsx:7` falls back to this env var when no CMS-provided `siteKey` is passed. Worth noting the primary key source is actually the CMS (`settings.recaptcha_site_key`, fetched server-side in `layout.tsx:222`), not an env var — the doc's Environment section doesn't mention recaptcha config at all.

3. **reCAPTCHA is wired into a real form**: `src/app/contact/page.tsx:7,19,66,73` uses `useGoogleReCaptcha`/`executeRecaptcha('contact_form')` on submit — confirms the provider isn't dead code, worth a one-line mention.

4. **No test setup exists at all** — no jest/vitest/playwright config, no `__tests__` folders, no `*.test.*`/`*.spec.*` files outside `node_modules`. `@types/jest` is a devDependency (`package.json:20`) with no actual jest config, likely vestigial. The sibling repos (`fch-borrower-react`, `Fch-admin-frontend-react`) both have a "no test runner yet" note in their docs — this repo's `CLAUDE.md` has no equivalent line at all, which is a meaningful gap for consistency.

5. **`src/hooks/` directory undocumented** — contains `useCMS.ts` (see above); the Components/Types sections never mention a hooks folder.

6. **`src/utils/address.ts`** (`formatAddress`) is undocumented. No actual overlap/duplication with `src/lib/` utils was found (there's no `src/lib/utils/` in this repo), so the folder itself just needs a mention.

7. **`smoke-test` npm script detail**: it's a `curl | grep` one-liner (`package.json:10`) that checks only the hardcoded production URL `https://fourcornerfunding.com/` — running it locally doesn't test a local/staging build. CI's own post-deploy smoke test is a separate inline curl check per workflow (e.g. `stage_deploy.yml` checks `$STAGE_URL`, not this npm script).

## Suggested next step
Fold the items above into `CLAUDE.md`: complete the routing list, rewrite the data/services split as three patterns instead of two, soften the "server-rendered" framing, add the `QueryProvider`/TanStack Query architecture bullet, correct the deploy-target framing, add the recaptcha env var and hooks/utils folders to Architecture/Environment, and add a short "no test runner yet" line for parity with the sibling repos.
