export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/terms', '/privacy-policy', '/disclosure'],
    },
    sitemap: 'https://fourcornerfunding.com/sitemap.xml',
  };
}
