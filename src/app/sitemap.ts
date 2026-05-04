import { getBlogPosts } from '@/lib/api/cmsService';

export default async function sitemap() {
  const baseUrl = 'https://fourcornerfunding.com';
  
  const staticRoutes = [
    '',
    '/funding-options',
    '/credit-builder',
    '/partner-program',
    '/faq',
    '/contact',
    '/pre-qualification',
    '/sba-programs',
    '/business-acquisition',
    '/working-capital-and-growth',
    '/real-estate',
    '/asset-and-equipment',
    '/receivables-and-cash-flow',
    '/bridge-short-term',
    '/blog',
  ];

  // Fetch dynamic blog posts from the API
  const allPosts = await getBlogPosts();

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogPosts = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
