import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

// The page is a client component, which cannot export metadata, so its SEO
// (CMS > SEO Settings > /working-capital-and-growth) is read here (BUG-105).
export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/working-capital-and-growth');
}

export default function WorkingCapitalAndGrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
