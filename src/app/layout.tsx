import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/common/Preloader';
import WowInit from '@/components/common/WowInit';
import Script from 'next/script';
import ReCaptchaProvider from '@/components/providers/ReCaptchaProvider';

import type { Metadata } from 'next';
import React from 'react';

import { seoConfig } from '@/data/seo';
import { cmsService } from '@/services/cms.service';
import QueryProvider from '@/lib/providers/QueryProvider';
import { Poppins, DM_Sans, Great_Vibes } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--body-font-family',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--heading-font-family',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const [settingsRes, seoRes] = await Promise.all([
    cmsService.fetchSiteSettings(),
    cmsService.fetchSeoSettings('/')
  ]);

  const settings = settingsRes?.data;
  const seo = seoRes?.data;

  const siteName = settings?.site_name || seoConfig.siteName;
  const favicon = settings?.favicon || '/images/favicon.png';

  // Use dynamic SEO from table if available, else fallback to site settings or config
  const title = seo?.meta_title || siteName;
  const description = seo?.meta_description || settings?.site_slogan || seoConfig.description;
  const keywords = seo?.keywords || seoConfig.keywords;
  const ogImage = seo?.og_image || seoConfig.ogImage;

  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description: description,
    keywords: keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: seoConfig.siteUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: seoConfig.siteUrl,
      siteName: siteName,
      title: title,
      description: description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
      creator: seoConfig.twitterHandle,
    },
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
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
}

import JsonLd from '@/components/seo/JsonLd';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsRes = await cmsService.fetchSiteSettings();
  const settings = settingsRes?.data || null;
  const siteName = settings?.site_name || seoConfig.siteName;
  const description = settings?.site_slogan || seoConfig.description;
  const favicon = settings?.favicon || `${seoConfig.siteUrl}/images/favicon.png`;
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: siteName,
    url: seoConfig.siteUrl,
    logo: favicon,
    description: description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.address || '3750 Gunn Highway, Suite 306',
      addressLocality: 'Tampa',
      addressRegion: 'FL',
      postalCode: '33618',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings?.phone_number || '+1-813-391-3333',
      contactType: 'customer service',
      email: settings?.email || 'Info@fourcornerfunding.com',
    },
    sameAs: settings?.social_links ? Object.values(settings.social_links).filter(Boolean) : [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
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
    <html lang="en" className={`${poppins.variable} ${dmSans.variable} ${greatVibes.variable}`}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Preload Critical Assets */}
        <link rel="preload" href="/images/home-3/hero/hero-bg.png" as="image" />

        <link rel="stylesheet" href="/css/bundle.css" />
      </head>
      <body className="body-bg">
        {/* ── JS Scripts (Critical) ───────────────────────────────────────── */}
        <Script src="/js/bundle.js" strategy="afterInteractive" />



        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />

        {/* Google Analytics */}
        {settings?.google_measurement_id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_measurement_id}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${settings.google_measurement_id}');
              `
            }} />
          </>
        )}

        <Preloader />
        <WowInit />
        <QueryProvider>
          <div className="page-wrapper body-bg">
            <Header />
            <ReCaptchaProvider siteKey={settings?.recaptcha_site_key}>
              {children}
            </ReCaptchaProvider>
            <Footer />
          </div>
        </QueryProvider>

      </body>
    </html>
  );
}
