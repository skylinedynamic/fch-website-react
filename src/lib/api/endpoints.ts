export const API_ENDPOINTS = {
    WEBSITE: {
        SITE_SETTINGS: '/website/settings',
        SEO_SETTINGS: (path: string) => `/website/seo?path=${encodeURIComponent(path)}`,
        BLOGS: '/website/blogs',
        BLOG_DETAILS: (slug: string) => `/website/blogs/${slug}`,
        BLOG_CATEGORIES: '/website/blogs/categories',
        BLOG_TAGS: '/website/blogs/tags',
        APPLY_FORM: '/website/embed-form',
    },
    LEADS: {
        SUBMIT: '/website/leads',
        PRE_QUALIFICATION: '/website/pre-qualification',
    }
};
