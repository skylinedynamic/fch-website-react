import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

// The page is a client component, which cannot export metadata, so its SEO
// (CMS > SEO Settings > /bridge-short-term) is read here (BUG-105).
export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/bridge-short-term');
}

export default function BridgeShortTermLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
