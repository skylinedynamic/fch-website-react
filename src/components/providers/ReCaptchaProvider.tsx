'use client';

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RecaptchaEnabledContext } from '@/lib/recaptcha';

export default function ReCaptchaProvider({ children, siteKey }: { children: React.ReactNode, siteKey?: string }) {
    const activeKey = siteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    // No site key in Site Settings: reCAPTCHA is off and forms send no token
    // (fch-api skips the check while no secret is set either).
    if (!activeKey) {
        return <RecaptchaEnabledContext.Provider value={false}>{children}</RecaptchaEnabledContext.Provider>;
    }

    return (
        <RecaptchaEnabledContext.Provider value={true}>
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
        </RecaptchaEnabledContext.Provider>
    );
}
