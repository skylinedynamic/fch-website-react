'use client';

import { useEffect, useRef, useState } from 'react';
import {
    APPLY_FORM_MAX_HEIGHT,
    APPLY_FORM_MESSAGE_SOURCE,
    APPLY_FORM_MIN_HEIGHT,
    APPLY_FORM_TITLE,
    type ApplyFormDetails,
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
 * The embedded application. The form reports its height and where to scroll
 * (see APPLY_FORM_MESSAGE_SOURCE); messages are accepted only from this
 * iframe and only from the form's own origin. Until the first height arrives,
 * the CSS fallback height applies.
 */
export default function ApplyFormFrame({ form }: { form: ApplyFormDetails }) {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState<number | null>(null);

    useEffect(() => {
        const formOrigin = originOf(form.form_url);

        const onMessage = (event: MessageEvent) => {
            const frame = frameRef.current;
            if (!frame || event.source !== frame.contentWindow || event.origin !== formOrigin) return;
            if (!isFormMessage(event.data)) return;

            if (event.data.type === 'resize') {
                setHeight(Math.min(APPLY_FORM_MAX_HEIGHT, Math.max(APPLY_FORM_MIN_HEIGHT, Math.ceil(event.data.height))));
                return;
            }

            const frameTop = frame.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: Math.max(0, frameTop + event.data.top - STICKY_HEADER_OFFSET), behavior: 'smooth' });
        };

        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [form.form_url]);

    return (
        <div className="apply-frame-wrap">
            <iframe
                ref={frameRef}
                src={form.form_url}
                title={form.form_title || APPLY_FORM_TITLE}
                className="apply-frame"
                allow="clipboard-write"
                style={height ? { height: `${height}px` } : undefined}
            />
        </div>
    );
}
