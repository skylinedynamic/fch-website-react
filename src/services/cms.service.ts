import { fetchFromApi } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';


const transformPost = (post: any) => {
  if (!post) return null;

  const publishedAt = post.published_at ? new Date(post.published_at) : new Date(post.created_at);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return {
    ...post,
    date: publishedAt.getDate().toString(),
    month: months[publishedAt.getMonth()],
    year: publishedAt.getFullYear(),
    author: post.author?.name || 'Admin',
    image: post.featured_image ?
      (post.featured_image.startsWith('http') ? post.featured_image : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'https://fourcornerfunding.com/storage'}/${post.featured_image}`)
      : '/images/placeholder.png',
    tags: Array.isArray(post.tag_names) ? post.tag_names : (Array.isArray(post.blog_tag_id) ? post.blog_tag_id : []),
    content: post.content || '',
    summary: post.summary || '',
    title: post.title || '',
    slug: post.slug || '',
    link: `/blog/${post.slug}`,
    meta_title: post.meta_title || post.title || '',
    meta_description: post.meta_description || post.summary || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : ''),
  };
};

export const cmsService = {
  fetchSiteSettings: async () => {
    return fetchFromApi(API_ENDPOINTS.WEBSITE.SITE_SETTINGS);
  },

  fetchSeoSettings: async (path: string) => {
    return fetchFromApi(API_ENDPOINTS.WEBSITE.SEO_SETTINGS(path));
  },

  fetchBlogPosts: async (filters: any = {}) => {
    const query = new URLSearchParams();
    if (filters.category) query.append('category', filters.category);
    if (filters.tag) query.append('tag', filters.tag);
    if (filters.search) query.append('search', filters.search);
    if (filters.is_featured) query.append('is_featured', filters.is_featured);
    if (filters.per_page) query.append('per_page', filters.per_page);

    const response = await fetchFromApi(`${API_ENDPOINTS.WEBSITE.BLOGS}?${query.toString()}`);
    if (!response || !response.status) return [];

    // Laravel pagination returns the array in response.data.data
    const posts = response.data?.data || response.data || [];
    return Array.isArray(posts) ? posts.map(transformPost) : [];
  },

  fetchBlogPostBySlug: async (slug: string) => {
    const response = await fetchFromApi(API_ENDPOINTS.WEBSITE.BLOG_DETAILS(slug));
    if (!response || !response.status) return null;
    return transformPost(response.data);
  },

  fetchBlogCategories: async () => {
    const response = await fetchFromApi(API_ENDPOINTS.WEBSITE.BLOG_CATEGORIES);
    if (!response || !response.status) return [];
    const categories = response.data || [];
    return categories.map((cat: any) => ({
      id: cat.slug,
      label: cat.name,
      count: cat.blogs_count || 0
    }));
  },

  fetchBlogTags: async () => {
    const response = await fetchFromApi(API_ENDPOINTS.WEBSITE.BLOG_TAGS);
    if (!response || !response.status) return [];
    const tags = response.data || [];
    return tags.map((tag: any) => tag.name);
  }
};
