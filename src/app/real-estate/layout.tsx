import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

// The page is a client component, which cannot export metadata, so its SEO
// (CMS > SEO Settings > /real-estate) is read here (BUG-105).
export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/real-estate');
}

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
