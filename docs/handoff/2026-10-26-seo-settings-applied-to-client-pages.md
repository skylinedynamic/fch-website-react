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

## Open items
- Every title, these eight and the pages that already worked (`/faq`, `/contact`, …), repeats "| Four Corner Funding" two or three times. The CMS title already ends with the brand, and the title template adds it again. That is **BUG-058** (Arafat), not changed here.
- QA sheet: BUG-105 → Fixed after the stage deploy.
