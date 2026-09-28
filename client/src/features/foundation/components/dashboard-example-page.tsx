const metrics = [
  { label: 'Rutas públicas', value: '2', detail: '/ y /login' },
  { label: 'Rutas privadas', value: '2', detail: '/dashboard y /profile' },
  { label: 'Feature de ejemplo', value: '1', detail: 'foundation' },
] as const;

export function DashboardExamplePage() {
  return (
    <section aria-labelledby="dashboard-title">
      <p className="text-sm font-semibold text-violet-700">
        Ruta privada · /dashboard
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight text-slate-950"
            id="dashboard-title"
          >
            Dashboard de arquitectura
          </h1>
          <p className="mt-2 text-slate-600">
            Datos estáticos para mostrar cómo una página vive dentro del layout
            privado.
          </p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Acceso abierto en el starter
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            key={metric.label}
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-slate-500">{metric.detail}</p>
          </article>
        ))}
      </div>

      <section
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        aria-labelledby="composition-title"
      >
        <h2 className="text-lg font-semibold" id="composition-title">
          Qué demuestra esta pantalla
        </h2>
        <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-3">
          <li className="rounded-xl bg-slate-50 p-4">
            <strong className="block text-slate-900">1. Proxy</strong>Queda
            listo para incorporar una sesión real.
          </li>
          <li className="rounded-xl bg-slate-50 p-4">
            <strong className="block text-slate-900">2. Layout</strong>Agrega
            barra superior y navegación.
          </li>
          <li className="rounded-xl bg-slate-50 p-4">
            <strong className="block text-slate-900">3. Feature</strong>
            Renderiza el contenido específico.
          </li>
        </ol>
      </section>
    </section>
  );
}
