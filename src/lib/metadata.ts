import { Metadata } from 'next';
import { cmsService } from '@/services/cms.service';

const fallbackSeo = {
  title: 'Four Corner Funding | Business Credit, Financing & Funding Partner',
  description: 'Four Corner Funding is your trusted business funding partner, providing expert credit building and flexible financing solutions.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fourcornerfunding.com',
};

/**
 * Helper to fetch dynamic metadata for any static route (e.g. '/', '/contact', '/faq')
 */
export async function getDynamicMetadata(path: string): Promise<Metadata> {
  const [seoRes, siteRes] = await Promise.all([
    cmsService.fetchSeoSettings(path),
    cmsService.fetchSiteSettings()
  ]);

  const seo = seoRes?.data;
  const site = siteRes?.data;

  const siteName = site?.site_name || fallbackSeo.title;
  const defaultDesc = site?.site_slogan || fallbackSeo.description;

  const title = seo?.meta_title || siteName;
  const description = seo?.meta_description || defaultDesc;
  const keywords = seo?.keywords || '';
  const ogImage = seo?.og_image ? [{ url: seo.og_image }] : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${fallbackSeo.siteUrl}${path === '/' ? '' : path}`,
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
  const siteName = site?.site_name || fallbackSeo.title;

  // Priority fallback logic:
  // 1. Specific SEO Settings for this path (from seo_settings table)
  // 2. Blog's native meta fields
  // 3. Blog's content fields (title/summary)
  // 4. Global site default
  const title = seo?.meta_title || blogData?.meta_title || blogData?.title || siteName;
  const description = seo?.meta_description || blogData?.meta_description || blogData?.summary || site?.site_slogan || fallbackSeo.description;
  const keywords = seo?.keywords || blogData?.keywords || '';
  
  const imageUrl = seo?.og_image || blogData?.featured_image || blogData?.image;
  const ogImage = imageUrl ? [{ url: imageUrl }] : undefined;

  return {
    title,
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
