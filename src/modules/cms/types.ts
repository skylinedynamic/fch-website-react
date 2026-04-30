export interface SiteSettings {
  id: number;
  partner_id: number | null;
  site_name: string;
  site_slogan: string;
  address: string;
  phone_number: string;
  email: string;
  header_logo: string;
  footer_logo: string;
  partner_logo: string;
  favicon: string;
  map_iframe: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    pinterest?: string;
    [key: string]: string | undefined;
  };
  created_at: string;
  updated_at: string;
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  data: SiteSettings | null;
}
