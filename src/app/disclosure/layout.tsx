import { Metadata } from 'next';
import { seoConfig } from '@/config/seo';

export const metadata: Metadata = {
  title: 'Legal Disclosure',
  description: 'Important legal disclosures regarding our business funding and credit building services.',
  alternates: {
    canonical: `${seoConfig.siteUrl}/disclosure`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DisclosureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
