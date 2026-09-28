import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SkipLink } from '@/shared/ui/skip-link';

import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Modular Frontend Starter',
  description: 'Production-ready modular frontend foundation.',
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <SkipLink />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
