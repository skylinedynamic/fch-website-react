import { homeData } from '@/data/homeData';

export const getHomeData = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(homeData);
    }, 100);
  });
};
