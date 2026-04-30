import { Metadata } from 'next';
import { cmsService } from '@/modules/cms/services';

const fallbackSeo = {
  title: 'Four Corner Funding',
  description: 'Fast and reliable business funding solutions.',
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
  const siteRes = await cmsService.fetchSiteSettings();

  const site = siteRes?.data;
  const siteName = site?.site_name || fallbackSeo.title;

  // Priority fallback logic:
  // 1. Blog's native meta_title / meta_description / keywords
  // 2. Blog's title / summary
  // 3. Global site default
  const title = blogData?.meta_title || blogData?.title || siteName;
  const description = blogData?.meta_description || blogData?.summary || site?.site_slogan || fallbackSeo.description;
  const keywords = blogData?.keywords || '';
  
  const imageUrl = blogData?.featured_image || blogData?.image;
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
