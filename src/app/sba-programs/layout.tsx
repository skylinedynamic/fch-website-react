import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

// The page is a client component, which cannot export metadata, so its SEO
// (CMS > SEO Settings > /sba-programs) is read here (BUG-105).
export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/sba-programs');
}

export default function SbaProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
