import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

// The page is a client component, which cannot export metadata, so its SEO
// (CMS > SEO Settings > /asset-and-equipment) is read here (BUG-105).
export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/asset-and-equipment');
}

export default function AssetAndEquipmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
