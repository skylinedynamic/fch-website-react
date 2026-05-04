import { creditBuilderConfig } from '@/data/creditBuilder';

export const creditBuilderService = {
  getCreditBuilderData: async () => {
    return creditBuilderConfig;
  }
};
