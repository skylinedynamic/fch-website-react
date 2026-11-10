import { memo } from 'react';

const DEFAULT_MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.9026235120837!2d-82.48482817448344!3d28.034468817835467!2m3!1f275.9634941696157!2f44.31251129127868!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x88c2c1393912d155%3A0x41d1edef6ef2477b!2s3750%20Gunn%20Hwy%20suite%20306%2C%20Tampa%2C%20FL%2033618%2C%20USA!5e1!3m2!1sen!2sbd!4v1772000051944!5m2!1sen!2sbd';

/**
 * The office map on /contact. Memoised on the embed code: React 19 rewrites
 * `innerHTML` whenever the `dangerouslySetInnerHTML` object is new, so if the
 * page re-rendered it on every keystroke in the form, the map iframe would be
 * replaced and load again each time.
 */
const ContactMap = memo(function ContactMap({ embedCode }: { embedCode?: string | null }) {
  return (
    <div className="google-map">
      {embedCode ? (
        <div dangerouslySetInnerHTML={{ __html: embedCode }} />
      ) : (
        <iframe
          src={DEFAULT_MAP_SRC}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </div>
  );
});

export default ContactMap;
