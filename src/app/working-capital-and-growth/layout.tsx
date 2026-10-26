import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

// The page is a client component and cannot export metadata itself, so its
// SEO Settings entry is read here; without this it showed the home page title.
export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/working-capital-and-growth', 'Working Capital & Growth Funding');
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
