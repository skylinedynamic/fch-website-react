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
  agreement_signing_enabled: string | number;
  social_links: Array<{
    platform: string;
    url: string;
  }>;
  google_measurement_id?: string;
  recaptcha_site_key?: string;
  recaptcha_secret_key?: string;
  created_at: string;
  updated_at: string;
}
export interface SettingsResponse {
  success: boolean;
  message: string;
  data: SiteSettings | null;
}

