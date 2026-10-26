/**
 * Browser-tab titles for the website.
 *
 * Rule: a meta title saved in the CMS (Admin > CMS > SEO Settings, or a blog
 * post's meta title) is shown exactly as saved - nothing is added to it. Only
 * when there is none does the page get "<Page Name> | <site name>".
 *
 * Before, the brand was added in three places - the CMS title itself, a
 * template in getDynamicMetadata and the root layout's template - so /terms read
 * "Terms of Service | Four Corner Funding | Four Corner Funding | Four Corner
 * Funding" (BUG-058). Pages now set their title with `absolute`, so neither
 * template touches it.
 */

/** "<name> | <site name>", or the site name alone when there is no name. */
export function withSiteName(name: string | null | undefined, siteName: string): string {
  const text = (name ?? '').trim();

  return text ? `${text} | ${siteName}` : siteName;
}

type SeoRow = { id?: number | null; meta_title?: string | null; page_name?: string | null } | null | undefined;

/**
 * A page's title from its SEO Settings row:
 *   meta_title saved       -> exactly that
 *   meta_title empty       -> "<Page Name> | <site name>" - the row's page_name,
 *                             else the name the page passes in
 *   no row for the path    -> the same, from the page's own name (the API then
 *                             answers a generic default with no id - not this page's)
 * The home page, with no meta_title, gets the full default title rather than
 * "Home | <site name>".
 */
export function resolvePageTitle(seo: SeoRow, siteName: string, path: string, pageName?: string, homeTitle?: string): string {
  const row = seo?.id ? seo : null;
  const metaTitle = row?.meta_title?.trim();

  if (metaTitle) {
    return metaTitle;
  }

  if (path === '/' && homeTitle) {
    return homeTitle;
  }

  return withSiteName(row?.page_name || pageName, siteName);
}
