import { faqConfig } from '@/data/faq';

export const faqService = {
  getFaqData: async () => {
    return faqConfig;
  }
};
