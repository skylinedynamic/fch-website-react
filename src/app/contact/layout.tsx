import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/contact', 'Contact Us');
}

import { seoConfig } from '@/data/seo';
import JsonLd from '@/components/seo/JsonLd';


export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Four Corner Funding',
    description: 'Get in touch with Four Corner Funding for business funding and credit building inquiries.',
    url: `${seoConfig.siteUrl}/contact`,
    mainEntity: {
      '@type': 'FinancialService',
      name: seoConfig.siteName,
      telephone: '+1-813-391-3333',
      email: 'Info@fourcornerfunding.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3750 Gunn Highway, Suite 306',
        addressLocality: 'Tampa',
        addressRegion: 'FL',
        postalCode: '33618',
        addressCountry: 'US',
      },
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      {children}
    </>
  );
}
