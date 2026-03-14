export default function sitemap() {
  const baseUrl = 'https://fourcornerfunding.com';
  
  const routes = [
    '',
    '/funding-options',
    '/credit-builder',
    '/partner-program',
    '/faq',
    '/contact',
    '/pre-qualification',
    '/sba-programs',
    '/business-acquisition',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
