# Website — CMS SEO settings apply to /sba-programs and seven other pages (BUG-105)

**Date:** 2026-10-26
**Branch:** hotfix
**Author:** awlad

## Problem
QA defect log **BUG-105** (OP-CMS-25), retest on 25 Oct: Fail. `/sba-programs` kept the default title "Four Corner Funding" and the default description, although CMS › SEO Settings has "SBA Loan Programs | Four Corner Funding" for it. `/faq` applied its settings.

The page is a client component (`'use client'`), which cannot export `generateMetadata`, and it had no `layout.tsx` to do it. So the CMS settings were never read. `/contact`, `/disclosure`, `/privacy-policy` and `/terms` are client pages too but already have such a layout. Eight did not:
- `/sba-programs`
- `/business-acquisition`
- `/working-capital-and-growth`
- `/real-estate`
- `/asset-and-equipment`
- `/receivables-and-cash-flow`
- `/bridge-short-term`
- `/pre-qualification`

## Solution
Each of the eight gets a `layout.tsx`, the same pattern as `contact/layout.tsx`: `generateMetadata()` returns `getDynamicMetadata('/<path>')` (title, description, keywords, canonical, Open Graph and Twitter from the CMS, falling back to the site defaults), and the layout renders the page unchanged.

## Files changed
- `src/app/{sba-programs,business-acquisition,working-capital-and-growth,real-estate,asset-and-equipment,receivables-and-cash-flow,bridge-short-term,pre-qualification}/layout.tsx`: new.

## Testing
- The repo has no test runner.
- **Checked against the local API** (`next dev`, `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1`):
  - before: `/sba-programs` served `<title>Four Corner Funding</title>`;
  - after: all eight serve their CMS title and `og:title` (e.g. "SBA Loan Programs | …", "Commercial Real Estate Financing | …").
- `eslint` and `tsc --noEmit` clean.


## Merge with origin/stage (same day)
`origin/stage` (PR #3, `bugfix/qa-round1-release-v2`) added layouts for the same eight pages in parallel. Its version calls `getDynamicMetadata(path, pageName)`, the page name used as a fallback title, and comes with the BUG-058 title fix (`src/lib/pageTitle.ts`: a saved CMS title is shown as saved, no brand added). All eight `layout.tsx` conflicts were resolved with **origin's version**. Nothing else conflicted.

**Checked after the merge** (`next dev` on the local API): `/sba-programs` → "SBA Loan Programs | Four Corner Funding"; `/real-estate`, `/business-acquisition` and `/pre-qualification` show their CMS titles; `/faq` and `/terms` no longer repeat the brand. `tsc --noEmit` and `eslint` are clean.

## Open items
- The repeated brand in titles (BUG-058) is fixed by the incoming origin/stage commits, not here.
- QA sheet: BUG-105 → Fixed after the stage deploy.
