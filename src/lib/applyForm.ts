/**
 * The business funding application embedded on /apply. Its link comes from
 * the API (GET /website/embed-form: the host's active embed form), so a
 * regenerated form key needs no website change.
 */
export interface ApplyFormDetails {
  form_title: string;
  form_url: string;
}

/** iframe title used while the API's form title is not known. */
export const APPLY_FORM_TITLE = 'Four Corner Funding Business Funding Application';

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
