'use client';

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function ReCaptchaProvider({ children, siteKey }: { children: React.ReactNode, siteKey?: string }) {
    const activeKey = siteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!activeKey) {
        return <>{children}</>;
    }

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={activeKey}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: 'head',
                nonce: undefined,
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}
