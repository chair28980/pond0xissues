'use client';

import { usePathname } from 'next/navigation';
import { TutorialOverlay } from './tutorial/TutorialOverlay';

export function ConditionalTutorialOverlay() {
  const pathname = usePathname();
  
  // Don't show the overlay on tutorial pages
  if (pathname?.startsWith('/tutorial')) {
    return null;
  }
  
  return <TutorialOverlay />;
}
