'use client';

import { useEffect, useRef } from 'react';
import {
    APPLY_FORM_AUTO_HEIGHT_ATTRIBUTE,
    APPLY_FORM_MAX_HEIGHT,
    APPLY_FORM_MESSAGE_SOURCE,
    APPLY_FORM_MIN_HEIGHT,
    type ApplyFormMessage,
} from '@/lib/applyForm';

/** Room left above the form when scrolling to it, for the sticky header. */
const STICKY_HEADER_OFFSET = 100;

const isFormMessage = (data: unknown): data is ApplyFormMessage => {
    if (!data || typeof data !== 'object') return false;
    const message = data as Record<string, unknown>;
    if (message.source !== APPLY_FORM_MESSAGE_SOURCE) return false;
    if (message.type === 'resize') return typeof message.height === 'number' && Number.isFinite(message.height);
    if (message.type === 'scroll') return typeof message.top === 'number' && Number.isFinite(message.top);
    return false;
};

const originOf = (url: string): string | null => {
    try {
        return new URL(url).origin;
    } catch {
        return null;
    }
};

/**
 * The embed code from the site settings, rendered as pasted (the API sends it
 * only while it passes the save check - see lib/applyForm).
 *
 * The code's <script> (embed.js) does not run when React inserts HTML, so
 * this does its job for the iframe: with automatic height (the iframe carries
 * APPLY_FORM_AUTO_HEIGHT_ATTRIBUTE) it follows the form's reported height, and
 * it always follows the form's scroll requests. Messages are accepted only
 * from that iframe and from the form's own origin.
 */
export default function ApplyFormFrame({ code }: { code: string }) {
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const frame = wrapRef.current?.querySelector('iframe');
        if (!frame) return;

        const formOrigin = originOf(frame.src);
        const autoHeight = frame.hasAttribute(APPLY_FORM_AUTO_HEIGHT_ATTRIBUTE);

        const onMessage = (event: MessageEvent) => {
            if (event.source !== frame.contentWindow || event.origin !== formOrigin) return;
            if (!isFormMessage(event.data)) return;

            if (event.data.type === 'resize') {
                // A fixed height stays as pasted; only the scroll requests apply.
                if (!autoHeight) return;
                const height = Math.min(APPLY_FORM_MAX_HEIGHT, Math.max(APPLY_FORM_MIN_HEIGHT, Math.ceil(event.data.height)));
                frame.style.height = `${height}px`;
                // The attribute too, so the inspector shows the real height
                // rather than the code's 800.
                frame.setAttribute('height', String(height));
                frame.setAttribute('scrolling', 'no');
                return;
            }

            // With a fixed height the form scrolls itself inside the iframe, so
            // the page only brings the iframe's top into view; adding the
            // form's offset as well would scroll past the field.
            const frameTop = frame.getBoundingClientRect().top + window.scrollY;
            const offsetInForm = autoHeight ? event.data.top : 0;
            window.scrollTo({ top: Math.max(0, frameTop + offsetInForm - STICKY_HEADER_OFFSET), behavior: 'smooth' });
        };

        // Introduce this page to the form, so it reports its height even when
        // the browser sent it no referrer to learn this page's origin from.
        // Until the form arrives the iframe holds a blank page of this page's
        // own origin, which can be read; the loaded form cannot.
        const formLoaded = () => {
            try {
                return !frame.contentWindow?.location.href;
            } catch {
                return true;
            }
        };
        const sayHello = () => {
            if (formOrigin && formLoaded()) {
                frame.contentWindow?.postMessage({ source: APPLY_FORM_MESSAGE_SOURCE, type: 'hello' }, formOrigin);
            }
        };

        window.addEventListener('message', onMessage);
        frame.addEventListener('load', sayHello);
        sayHello();
        return () => {
            window.removeEventListener('message', onMessage);
            frame.removeEventListener('load', sayHello);
        };
    }, [code]);

    return <div ref={wrapRef} className="apply-frame-wrap" dangerouslySetInnerHTML={{ __html: code }} />;
}
