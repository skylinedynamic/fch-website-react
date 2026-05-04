import { useQuery } from "@tanstack/react-query";
import { cmsService } from "./services";
import { SettingsResponse } from "./types";

export const useSiteSettings = () => {
  return useQuery<SettingsResponse>({
    queryKey: ["site-settings"],
    queryFn: cmsService.fetchSiteSettings,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
