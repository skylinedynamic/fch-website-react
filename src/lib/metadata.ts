import { Metadata } from 'next';
import { cmsService } from '@/services/cms.service';
import { seoConfig } from '@/data/seo';
import { resolvePageTitle, withSiteName } from '@/lib/pageTitle';

const fallbackSeo = {
  title: 'Four Corner Funding | Business Credit, Financing & Funding Partner',
  description: 'Four Corner Funding is your trusted business funding partner, providing expert credit building and flexible financing solutions.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://fourcornerfunding.com',
};

/**
 * Helper to fetch dynamic metadata for any static route (e.g. '/', '/contact', '/faq').
 * Title, description, keywords and image all come from the path's SEO Settings
 * entry (Admin > CMS > SEO Settings); `pageName` titles the page while it has none.
 */
export async function getDynamicMetadata(path: string, pageName?: string): Promise<Metadata> {
  const [seoRes, siteRes] = await Promise.all([
    cmsService.fetchSeoSettings(path),
    cmsService.fetchSiteSettings()
  ]);

  const seo = seoRes?.data;
  const site = siteRes?.data;

  // The brand name alone - it is what gets appended to page titles, so it must
  // not fall back to the long default title.
  const siteName = site?.site_name || seoConfig.siteName;
  const defaultDesc = site?.site_slogan || fallbackSeo.description;
  const siteUrl = site?.site_url || fallbackSeo.siteUrl || seoConfig.siteUrl;

  // Title: the CMS meta_title with the site name once (BUG-058); without one,
  // "<Page Name> | <site name>" - see resolvePageTitle.
  const title = resolvePageTitle(seo, siteName, path, pageName, fallbackSeo.title);

  const description = seo?.meta_description || defaultDesc;

  // Keywords: accept CSV string or array, fallback to global config
  let keywords: string[] | undefined;
  if (seo?.keywords) {
    if (Array.isArray(seo.keywords)) {
      keywords = seo.keywords.map(String).map(k => k.trim()).filter(Boolean);
    } else if (typeof seo.keywords === 'string') {
      keywords = seo.keywords.split(',').map(k => k.trim()).filter(Boolean);
    }
  } else {
    keywords = seoConfig.keywords;
  }

  // Open Graph image: prefer CMS value, then site settings, then global default
  const pickImage = seo?.og_image || site?.og_image || site?.logo || seoConfig.ogImage;
  const abs = (u?: string) => {
    if (!u) return undefined;
    if (/^https?:\/\//i.test(u)) return u;
    return `${siteUrl.replace(/\/$/, '')}/${u.replace(/^\//, '')}`;
  };
  const ogImage = pickImage ? [{ url: abs(pickImage) as string }] : undefined;

  return {
    // absolute: the root layout's "%s | site" template must not add the brand again.
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}${path === '/' ? '' : path}`,
    },
    openGraph: {
      title,
      description,
      images: ogImage,
      type: 'website',
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage,
    }
  };
}

/**
 * Helper specifically for Blog posts to handle priority fallbacks
 * 1st Priority: seo.meta_title & seo.meta_description
 * 2nd Priority: blog.title & blog.summary
 */
export async function getBlogPostMetadata(slug: string, blogData: any): Promise<Metadata> {
  const path = `/blog/${slug}`;
  const [seoRes, siteRes] = await Promise.all([
    cmsService.fetchSeoSettings(path),
    cmsService.fetchSiteSettings()
  ]);

  const seo = seoRes?.data;
  const site = siteRes?.data;
  const siteName = site?.site_name || seoConfig.siteName;
  const siteUrl = site?.site_url || fallbackSeo.siteUrl || seoConfig.siteUrl;

  // Priority fallback logic:
  // 1. Blog's native meta_title / meta_description / keywords
  // 2. Blog's title / summary
  // 3. Global site default
  // A saved meta title is shown exactly as saved; otherwise "<post title> | <site name>".
  const title = blogData?.meta_title?.trim() || withSiteName(blogData?.title, siteName);

  const description = blogData?.meta_description || blogData?.summary || site?.site_slogan || fallbackSeo.description;

  let keywords: string[] | undefined;
  if (blogData?.keywords) {
    if (Array.isArray(blogData.keywords)) keywords = blogData.keywords.map(String).map(k => k.trim()).filter(Boolean);
    else if (typeof blogData.keywords === 'string') keywords = blogData.keywords.split(',').map(k => k.trim()).filter(Boolean);
  } else {
    keywords = seoConfig.keywords;
  }

  const imageUrl = blogData?.featured_image || blogData?.image || seoConfig.ogImage || undefined;
  const abs = (u?: string) => {
    if (!u) return undefined;
    if (/^https?:\/\//i.test(u)) return u;
    return `${siteUrl.replace(/\/$/, '')}/${u.replace(/^\//, '')}`;
  };
  const ogImage = imageUrl ? [{ url: abs(imageUrl) as string }] : undefined;

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: `${fallbackSeo.siteUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      images: ogImage,
      type: 'article',
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage,
    }
  };
}
