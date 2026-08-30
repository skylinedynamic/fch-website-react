import { partnerProgramConfig } from '@/data/partnerProgram';

export const partnerService = {
  getPartnerProgramData: async () => {
    return partnerProgramConfig;
  }
};
