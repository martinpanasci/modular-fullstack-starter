import Link from 'next/link';

import type { ArchitectureLayers, RouteExample } from '../types/architecture';
import { ArchitectureExplorer } from './architecture-explorer';
import { RouteExampleCard } from './route-example-card';

const routes: readonly RouteExample[] = [
  {
    href: '/login',
    label: 'Login de ejemplo',
    access: 'Pública',
    description:
      'Muestra cómo otra página reutiliza el Header y el Footer del layout público.',
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    access: 'Privada',
    description:
      'Demuestra una ruta agrupada como privada y envuelta por el layout de aplicación.',
  },
  {
    href: '/profile',
    label: 'Profile',
    access: 'Privada',
    description:
      'Comparte navegación y estructura con dashboard sin duplicarlas en la página.',
  },
];

const architectureLayers: ArchitectureLayers = [
  {
    id: 'app',
    name: 'App',
    path: 'src/app',
    summary: 'Routing y composición de Next.js',
    includes: ['pages pequeñas', 'layouts', 'providers y estados globales'],
    avoids: 'lógica de negocio o componentes grandes',
  },
  {
    id: 'features',
    name: 'Features',
    path: 'src/features',
    summary: 'Dominios completos y encapsulados',
    includes: ['UI del dominio', 'hooks React', 'lógica pura y tipos propios'],
    avoids: 'exponer internals fuera de su index.ts',
  },
  {
    id: 'shared',
    name: 'Shared',
    path: 'src/shared',
    summary: 'Infraestructura transversal reutilizable',
    includes: [
      'UI genérica',
      'cliente HTTP',
      'configuración y utilidades puras',
    ],
    avoids: 'conceptos o reglas de un dominio específico',
  },
];

export function FoundationPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="border-b border-slate-200">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-semibold tracking-wider text-violet-700 uppercase">
              Frontend foundation
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Un starter que explica dónde va cada cosa.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explorá rutas públicas y privadas, una feature encapsulada y
              piezas compartidas sin sumar lógica de producto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                href="#architecture"
              >
                Explorar arquitectura
              </Link>
              <Link
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                href="/login"
              >
                Ver layout público
              </Link>
            </div>
          </div>
          <div
            aria-label="Estructura principal"
            className="rounded-3xl border border-slate-800 bg-slate-950 p-6 font-mono text-sm text-slate-300 shadow-2xl shadow-violet-950/15"
          >
            <p className="text-slate-500">src/</p>
            <p className="mt-3">
              <span className="text-violet-300">├── app/</span>{' '}
              <span className="text-slate-500">rutas y layouts</span>
            </p>
            <p className="mt-3">
              <span className="text-cyan-300">├── features/</span>{' '}
              <span className="text-slate-500">dominios</span>
            </p>
            <p className="mt-3">
              <span className="text-emerald-300">├── shared/</span>{' '}
              <span className="text-slate-500">código transversal</span>
            </p>
            <p className="mt-3">
              <span className="text-amber-300">└── assets/</span>{' '}
              <span className="text-slate-500">recursos importados</span>
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="routes-title"
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-violet-700">
            Rutas de ejemplo
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-slate-950"
            id="routes-title"
          >
            Los grupos organizan; la URL sigue limpia.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            <code>(public)</code> y <code>(private)</code> no aparecen en la
            URL. En este starter las rutas privadas quedan abiertas para poder
            recorrer el ejemplo; la autorización real se agrega junto con el
            backend.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {routes.map((route) => (
            <RouteExampleCard key={route.href} route={route} />
          ))}
        </div>
      </section>

      <section className="bg-slate-100" id="architecture">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold text-violet-700">
              Responsabilidades
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Tres capas con límites fáciles de recordar.
            </h2>
          </div>
          <ArchitectureExplorer layers={architectureLayers} />
        </div>
      </section>
    </main>
  );
}
