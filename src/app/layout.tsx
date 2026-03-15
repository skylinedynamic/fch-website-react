import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/common/Preloader';
import WowInit from '@/components/common/WowInit';
import Script from 'next/script';

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Four Corner Funding | Fast, Flexible Business Funding',
    template: '%s | Four Corner Funding',
  },
  description:
    'Four Corner Holdings, LLC is a Florida-based financial services firm empowering entrepreneurs with strategic access to capital, credit-building systems, and customized lending solutions.',
  keywords: [
    'business funding',
    'business credit',
    'SBA loans',
    'working capital',
    'equipment financing',
    'Four Corner Funding',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fourcornerfunding.com',
    siteName: 'Four Corner Funding',
    title: 'Four Corner Funding | Fast, Flexible Business Funding',
    description:
      'Get matched with top funding options in minutes. No hard credit pull. No hidden fees.',
    images: [
      {
        url: '/images/home-3/hero/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Four Corner Funding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Four Corner Funding | Fast, Flexible Business Funding',
    description:
      'Get matched with top funding options in minutes. No hard credit pull. No hidden fees.',
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
        <Preloader />
        <WowInit />
        <div className="page-wrapper body-bg">
          <Header />
          {children}
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
