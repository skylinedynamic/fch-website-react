import { useQuery } from '@tanstack/react-query';
import { cmsService } from '@/services/cms.service';

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: () => cmsService.fetchSiteSettings()
  });
};

export const useBlogPosts = (filters: any = {}) => {
  return useQuery({
    queryKey: ['blog-posts', filters],
    queryFn: () => cmsService.fetchBlogPosts(filters)
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => cmsService.fetchBlogCategories()
  });
};

export const useBlogTags = () => {
  return useQuery({
    queryKey: ['blog-tags'],
    queryFn: () => cmsService.fetchBlogTags()
  });
};
