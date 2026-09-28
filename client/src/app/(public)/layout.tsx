import type { ReactNode } from 'react';

import { Footer } from '@/shared/ui/footer';
import { Header } from '@/shared/ui/header';

type PublicLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
