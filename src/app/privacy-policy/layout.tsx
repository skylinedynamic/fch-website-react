import { Metadata } from 'next';
import { seoConfig } from '@/config/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Four Corner Holdings, LLC handles and protects your business and personal data.',
  alternates: {
    canonical: `${seoConfig.siteUrl}/privacy-policy`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
