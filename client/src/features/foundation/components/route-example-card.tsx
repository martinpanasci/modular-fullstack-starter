import Link from 'next/link';

import type { RouteExample } from '../types/architecture';

type RouteExampleCardProps = Readonly<{
  route: RouteExample;
}>;

export function RouteExampleCard({ route }: RouteExampleCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <code className="text-sm font-semibold text-violet-700">
          {route.href}
        </code>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {route.access}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950">
        {route.label}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {route.description}
      </p>
      <Link
        className="mt-5 text-sm font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 group-hover:decoration-violet-500"
        href={route.href}
      >
        Abrir ejemplo
      </Link>
    </article>
  );
}
