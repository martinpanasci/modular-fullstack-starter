import Link from 'next/link';

export function LoginExamplePage() {
  return (
    <main
      className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center"
      id="main-content"
      tabIndex={-1}
    >
      <div>
        <p className="text-sm font-semibold tracking-wider text-violet-700 uppercase">
          Ruta pública · /login
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          Una página pequeña dentro del layout público.
        </h1>
        <p className="mt-5 max-w-xl leading-7 text-slate-600">
          El Header y el Footer vienen de <code>shared/ui</code> y son
          renderizados por <code>(public)/layout.tsx</code>.
        </p>
        <div className="mt-6 max-w-xl rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm leading-6 text-violet-950">
          <strong className="font-semibold">Acceso didáctico:</strong> este
          starter todavía no valida credenciales. El botón Ingresar sólo navega
          al dashboard para que puedas recorrer el layout privado.
        </div>
        <Link
          className="mt-7 inline-flex text-sm font-semibold text-slate-950 underline decoration-violet-400 underline-offset-4"
          href="/"
        >
          Volver al mapa del starter
        </Link>
      </div>

      <section
        aria-labelledby="login-title"
        className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-violet-950/5 sm:p-9"
      >
        <div className="mb-7">
          <p className="text-sm text-slate-500">Mockup didáctico</p>
          <h2
            className="mt-1 text-2xl font-semibold text-slate-950"
            id="login-title"
          >
            Iniciar sesión
          </h2>
        </div>
        <form action="/dashboard" className="space-y-5">
          <div>
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-400"
              id="email"
              placeholder="dev@ejemplo.com"
              type="email"
            />
          </div>
          <div>
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-400"
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <button
            className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-violet-700"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </section>
    </main>
  );
}
