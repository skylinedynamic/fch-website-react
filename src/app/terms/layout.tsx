import { Metadata } from 'next';
import { seoConfig } from '@/config/seo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Legal terms and conditions for using the Four Corner Funding platform and services.',
  alternates: {
    canonical: `${seoConfig.siteUrl}/terms`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
