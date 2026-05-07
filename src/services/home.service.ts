import { homeConfig } from '@/data/home';
import { cmsService } from './cms.service';
import { HomeData } from '@/types/config.types';

export const homeService = {
  getHomeData: async (): Promise<HomeData> => {
    // Fetch latest 3 blogs regardless of featured status to ensure the section is populated
    const latestBlogs = await cmsService.fetchBlogPosts({ per_page: 3 });
    
    return {
      ...homeConfig,
      blog: {
        ...homeConfig.blog,
        posts: latestBlogs
      }
    };
  }
};
