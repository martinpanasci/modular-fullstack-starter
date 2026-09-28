import Link from 'next/link';
import type { ReactNode } from 'react';

const privateNavigation = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
] as const;

type PrivateLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="font-semibold">Modular Starter</p>
            <p className="text-xs text-slate-400">Área privada · ejemplo</p>
          </div>
          <Link
            className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            href="/"
          >
            Ir al sitio público
          </Link>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 md:grid-cols-[13rem_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="px-3 py-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Navegación
          </p>
          <nav aria-label="Navegación privada">
            <ul className="flex gap-2 md:flex-col">
              {privateNavigation.map((item) => (
                <li className="flex-1" key={item.href}>
                  <Link
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-800"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
