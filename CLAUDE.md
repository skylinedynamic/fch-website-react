# fch-website-react

Public marketing site for Four Corner Funding (fourcornerfunding.com). Next.js 16 (App Router) + React 19 + TypeScript, TanStack Query, Google reCAPTCHA v3. Server-rendered, content mostly driven by static `src/data/*.ts` config plus a few CMS-backed endpoints (blog, SEO, leads).

## Commands
- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run a production build
- `npm run lint` — ESLint
- `npm run smoke-test` — curl-check that the live site returns 200 (also run post-deploy in CI)

## Architecture
- **Routing**: Next.js App Router under `src/app/<route>/page.tsx`, one folder per marketing page (`funding-options`, `bridge-short-term`, `real-estate`, `sba-programs`, `partner-program`, `pre-qualification`, `credit-builder`, `faq`, `contact`, `blog/[slug]`, legal pages). `src/app/layout.tsx` is the root layout; `robots.ts`/`sitemap.ts` are Next's file-convention SEO routes.
- **Page data**: most pages import a static config object from `src/data/<page>.ts` (headline copy, sections, cards) rather than fetching it — treat `src/data/` as the CMS for content that doesn't change per-request. Pages that do need live data (home page blog teasers, blog listing/detail, FAQ, pre-qualification/lead submission) go through `src/services/*.service.ts`.
- **Services** (`src/services/`): one file per domain (`cms.service.ts`, `home.service.ts`, `faq.service.ts`, `leads.service.ts`, `locations.service.ts`, `partner.service.ts`, `prequalification.service.ts`, `creditBuilder.service.ts`), re-exported from `services/index.ts`. Each calls `fetchFromApi` from `src/lib/api/client.ts` against a path from `src/lib/api/endpoints.ts` (`API_ENDPOINTS`) — add new backend routes there rather than inlining URL strings in a service.
- **API client** (`src/lib/api/client.ts`): a plain `fetch` wrapper (`fetchFromApi`), not axios — swallows non-OK responses and errors, returning `null` (logs via `console.warn`/`console.error`). Callers must handle a `null` result; this is intentional so a page render doesn't hard-fail on a backend hiccup, so treat any UI reading service data as needing a null-safe fallback.
- **Metadata/SEO**: `src/lib/metadata.ts` exposes `getDynamicMetadata(path)`, called from each page's `generateMetadata()` export to pull per-path SEO settings from the backend (`API_ENDPOINTS.WEBSITE.SEO_SETTINGS`). `src/components/seo/` holds structured-data/SEO components.
- **Components**: `src/components/ui/` — page section components (`HeroSection`, `ProcessSection`, `BlogSection`, etc.), mostly presentational, taking a `data` prop from a service/config; `src/components/layout/` — `Header`/`Footer`; `src/components/common/`, `credit-builder/`, `faq/` — feature-scoped shared pieces; `src/components/providers/ReCaptchaProvider.tsx` wraps `react-google-recaptcha-v3`.
- **Types**: `src/types/` (e.g. `config.types.ts` for the `HomeData`/page-data shapes).
- **Middleware** (`middleware.ts`, project root): attaches security headers (HSTS, X-Frame-Options, X-Content-Type-Options) to every non-static request. Do **not** add HTTP→HTTPS redirect logic here — the deployed app sits behind Nginx doing SSL termination, and `x-forwarded-proto` always arrives as `http` at this layer, so a redirect here creates an infinite loop (see the comment in the file).
- **Images**: `next.config.mjs` allowlists remote image hosts (`api.fourcornerfunding.com`, `api.skylinedynamic.dev`, local dev hosts) — add a host there before using `next/image` against a new domain. It also permanently redirects `www.fourcornerfunding.com` → `fourcornerfunding.com` and sets permissive CORS headers on all routes.
- `strip-metadata.mjs` — one-off script (sharp) to strip EXIF/metadata from everything under `public/images/`; not part of the build.

## Environment
- `NEXT_PUBLIC_API_BASE_URL` — base URL of `fch-backend-api`'s public `v1/website` surface (local: `http://127.0.0.1:8000/api/v1`; production: `https://api.fourcornerfunding.com/api/v1`, set in CI at deploy time, not committed).
- Production also sets `NEXT_PUBLIC_SITE_URL` and `NEXT_BACKEND_BASE_URL` (written to `.env.production` by the deploy workflow, not present in this repo).

## Branching & deploy
- `stage` → `.github/workflows/stage_deploy.yml`; `release` → `.github/workflows/release_deploy.yml`. Both SSH into the target box, `git reset --hard` to the pushed branch, write the env file, `npm ci && npm run build`, restart via PM2, reload Nginx, then run the smoke test against the live URL. There is no build/PR-check workflow — CI only deploys on push to these two branches, so verify locally (`npm run build`, `npm run lint`) before pushing.

## Related projects
Sibling repos under `d:\laragon\www\`, part of the same FCH (Four Corner Funding) system:
- **`fch-backend-api`** — Laravel 12 API backend. This site consumes its public, unauthenticated `v1/website` routes (`routes/website.php`) for CMS content, blog, SEO settings, and lead/pre-qualification submission — see `API_ENDPOINTS` in `src/lib/api/endpoints.ts`.
- **`fch-borrower-react`** (`client-fch`) — the authenticated borrower portal. Separate stack (Vite + Zustand + TanStack Query, axios) and separate deploy target; this site's "Apply"/pre-qualification flows hand off to it but share no code.
- **`Fch-admin-frontend-react`** — the internal admin/back-office panel (same Vite stack as the borrower portal), used to manage the CMS content, leads, and blog data this site reads.
