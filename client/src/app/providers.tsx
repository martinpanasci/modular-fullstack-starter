'use client';

import type { ReactNode } from 'react';

type ProvidersProps = Readonly<{
  children: ReactNode;
}>;

export function Providers({ children }: ProvidersProps) {
  return children;
}
