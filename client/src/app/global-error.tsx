'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="es">
      <body className="grid min-h-screen place-items-center p-6">
        <main className="max-w-lg text-center">
          <h1 className="text-3xl font-semibold">Algo salió mal</h1>
          <p className="mt-3 text-slate-600">
            No pudimos mostrar esta página. Podés intentar nuevamente.
          </p>
          <button
            className="mt-6 rounded-lg bg-slate-950 px-4 py-2 font-medium text-white"
            onClick={reset}
            type="button"
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  );
}
