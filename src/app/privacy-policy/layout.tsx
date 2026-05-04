import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/privacy-policy');
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
