export default function sitemap() {
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

  // Assuming blogData is available in the data directory
  // In a real scenario, you might fetch these from an API or DB
  const blogSlugs = [
    'financial-consequences-tax-errors',
    'work-life-balance-hectic-world',
    'mastering-work-life-business-goal',
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const blogPosts = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
