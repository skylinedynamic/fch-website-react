/**
 * The business funding application embedded on /apply: the embed code pasted
 * in the admin's CMS > Site Settings - the same code a partner pastes into
 * their site - served as is by GET /website/settings (`apply_form_embed_code`).
 * The API sends it only while it passes the check it was saved with: one
 * iframe on the host's current form and, for automatic height, the form's
 * embed.js. Null when nothing is pasted (or the key was regenerated since).
 */

/** Marks an iframe that grows to the form's height (the code's automatic height). */
export const APPLY_FORM_AUTO_HEIGHT_ATTRIBUTE = 'data-fch-embed';

/**
 * The form's direct link from the embed code - its iframe's address without
 * the look options - for "Open Application in a New Tab".
 */
export const formLinkFromCode = (code: string): string | null => {
  const src = /<iframe\b[^>]*\ssrc="([^"]+)"/i.exec(code)?.[1];
  if (!src) return null;
  try {
    const url = new URL(src.replace(/&amp;/g, '&'));
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
};

/** Element id of the application section; "Start My Application" scrolls here. */
export const APPLY_FORM_ANCHOR = 'application';

/** Route of the application page linked from the "Apply Now" nav buttons. */
export const APPLY_PAGE_PATH = '/apply';

/**
 * Messages the embedded form posts to this page (fch-api
 * resources/views/embed-form/index.blade.php): its content height, and where
 * in the form to scroll. Only layout numbers - never field values.
 */
export const APPLY_FORM_MESSAGE_SOURCE = 'fch-embed-form';

export type ApplyFormMessage =
  | { source: typeof APPLY_FORM_MESSAGE_SOURCE; type: 'resize'; height: number }
  | { source: typeof APPLY_FORM_MESSAGE_SOURCE; type: 'scroll'; top: number };

/** Bounds for a reported height, so a bad message cannot collapse or balloon the frame. */
export const APPLY_FORM_MIN_HEIGHT = 600;
export const APPLY_FORM_MAX_HEIGHT = 20000;
