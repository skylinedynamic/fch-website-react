'use client';

import { useEffect } from 'react';

export default function BlogListingClient() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).WOW) {
      new (window as any).WOW().init();
    }
  }, []);

  return null;
}
