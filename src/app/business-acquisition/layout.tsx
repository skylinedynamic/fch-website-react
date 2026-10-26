import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

// The page is a client component, which cannot export metadata, so its SEO
// (CMS > SEO Settings > /business-acquisition) is read here (BUG-105).
export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/business-acquisition');
}

export default function BusinessAcquisitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
