import Link from 'next/link';

const navigation = [
  { href: '/', label: 'Inicio' },
  { href: '/login', label: 'Login' },
] as const;

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link className="font-semibold tracking-tight text-slate-950" href="/">
          Modular Starter
        </Link>
        <nav aria-label="Navegación pública">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
