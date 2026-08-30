import { homeConfig } from '@/data/home';
import { cmsService } from './cms.service';
import { HomeData } from '@/types/config.types';

export const homeService = {
  getHomeData: async (): Promise<HomeData> => {
    // Fetch latest 3 featured and published blogs
    const latestBlogs = await cmsService.fetchBlogPosts({ per_page: 3, is_featured: 1 });
    
    return {
      ...homeConfig,
      blog: {
        ...homeConfig.blog,
        posts: latestBlogs
      }
    };
  }
};
