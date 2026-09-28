const profileFields = [
  { label: 'Nombre', value: 'Ada Developer' },
  { label: 'Rol', value: 'Frontend Engineer' },
  { label: 'Zona horaria', value: 'America/Buenos_Aires' },
] as const;

export function ProfileExamplePage() {
  return (
    <section aria-labelledby="profile-title">
      <p className="text-sm font-semibold text-violet-700">
        Ruta privada · /profile
      </p>
      <h1
        className="mt-2 text-3xl font-bold tracking-tight text-slate-950"
        id="profile-title"
      >
        Perfil de ejemplo
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Esta ruta hermana reutiliza exactamente el mismo layout que dashboard.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div
            aria-hidden="true"
            className="mx-auto grid size-20 place-items-center rounded-full bg-violet-100 text-2xl font-bold text-violet-800"
          >
            AD
          </div>
          <h2 className="mt-4 font-semibold text-slate-950">Ada Developer</h2>
          <p className="mt-1 text-sm text-slate-500">Perfil estático</p>
        </aside>
        <section
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          aria-labelledby="details-title"
        >
          <h2 className="text-lg font-semibold" id="details-title">
            Datos visibles
          </h2>
          <dl className="mt-5 divide-y divide-slate-200">
            {profileFields.map((field) => (
              <div
                className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]"
                key={field.label}
              >
                <dt className="text-sm font-medium text-slate-500">
                  {field.label}
                </dt>
                <dd className="text-sm font-semibold text-slate-900">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </section>
  );
}
