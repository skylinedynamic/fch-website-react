import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

// The page is a client component, which cannot export metadata, so its SEO
// (CMS > SEO Settings > /receivables-and-cash-flow) is read here (BUG-105).
export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/receivables-and-cash-flow');
}

export default function ReceivablesAndCashFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
