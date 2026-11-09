/**
 * Sign-in URLs for the partner (admin) and borrower portals. Set per
 * environment in .env (local) and .env.production (written by the deploy
 * workflows) - never hard-coded here.
 */
export const PARTNER_PORTAL_URL = process.env.NEXT_PUBLIC_PARTNER_PORTAL_URL ?? '';
export const BORROWER_PORTAL_URL = process.env.NEXT_PUBLIC_BORROWER_PORTAL_URL ?? '';
