import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/common/Preloader';
import WowInit from '@/components/common/WowInit';
import Script from 'next/script';
import ReCaptchaProvider from '@/components/providers/ReCaptchaProvider';


import type { Metadata } from 'next';
import React from 'react';

import { seoConfig } from '@/config/seo';

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: 'Four Corner Holdings, LLC' }],
  creator: 'Four Corner Holdings, LLC',
  publisher: 'Four Corner Holdings, LLC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [seoConfig.ogImage],
    creator: seoConfig.twitterHandle,
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import JsonLd from '@/components/seo/JsonLd';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/images/favicon.png`,
    description: seoConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3750 Gunn Highway, Suite 306',
      addressLocality: 'Tampa',
      addressRegion: 'FL',
      postalCode: '33618',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-813-391-3333',
      contactType: 'customer service',
      email: 'Info@fourcornerfunding.com',
    },
    sameAs: [
      // Add social media links here if available
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Original CSS stylesheets */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/swiper.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <link rel="stylesheet" href="/css/custom.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/fontawesome.css" />
      </head>
      <body className="body-bg">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6HM2YGCB2B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6HM2YGCB2B');
          `}
        </Script>

        <Preloader />
        <WowInit />
        <div className="page-wrapper body-bg">
          <Header />
          <ReCaptchaProvider>
            {children}
          </ReCaptchaProvider>
          <Footer />
        </div>

        {/* ── JS Scripts ─────────────────────────────────────────────────── */}
        {/* jQuery + Bootstrap: synchronous, needed everywhere */}
        <Script src="/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/js/popper.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery-ui.js" strategy="beforeInteractive" />

        {/* GSAP core + ALL plugins: must load synchronously in order */}
        <Script src="/js/gsap.js" strategy="beforeInteractive" />
        <Script src="/js/gsap-scroll-trigger.js" strategy="beforeInteractive" />
        <Script src="/js/gsap-scroll-smoother.js" strategy="beforeInteractive" />
        <Script src="/js/gsap-scroll-to-plugin.js" strategy="beforeInteractive" />
        <Script src="/js/gsap-split-text.js" strategy="beforeInteractive" />

        {/* Register GSAP plugins immediately after they are available */}
        <Script id="gsap-register" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: `
          (function () {
            if (typeof gsap !== 'undefined') {
              if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
              if (typeof ScrollSmoother !== 'undefined') gsap.registerPlugin(ScrollSmoother);
              if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
              if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
            }
          })();
        `}} />

        {/* WOW, Swiper, and other enhancement libs: can defer */}
        <Script src="/js/swiper.min.js" strategy="afterInteractive" />
        <Script src="/js/split-type.min.js" strategy="afterInteractive" />
        <Script src="/js/parallaxie.js" strategy="afterInteractive" />
        <Script src="/js/wow.js" strategy="afterInteractive" />
        <Script src="/js/jquery.fancybox.js" strategy="afterInteractive" />
        <Script src="/js/bxslider.js" strategy="afterInteractive" />
        <Script src="/js/nice-select.min.js" strategy="afterInteractive" />
        <Script src="/js/knob.js" strategy="afterInteractive" />
        <Script src="/js/appear.js" strategy="afterInteractive" />
        <Script src="/js/mixitup.js" strategy="afterInteractive" />

        {/* Main theme script: runs last after all deps are ready */}
        <Script src="/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
