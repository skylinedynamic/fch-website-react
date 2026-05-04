export const API_ENDPOINTS = {
    WEBSITE: {
        SITE_SETTINGS: '/website/settings',
        SEO_SETTINGS: (slug: string) => `/website/seo?slug=${slug}`,
        BLOGS: '/website/blogs',
        BLOG_DETAILS: (slug: string) => `/website/blogs/${slug}`,
        BLOG_CATEGORIES: '/website/blogs/categories',
        BLOG_TAGS: '/website/blogs/tags',
    },
    LEADS: {
        SUBMIT: '/website/leads',
        PRE_QUALIFICATION: '/website/pre-qualification',
    }
};
