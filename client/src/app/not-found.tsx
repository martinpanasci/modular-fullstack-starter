import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-sm font-semibold text-violet-700">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Página no encontrada</h1>
        <Link
          className="mt-6 inline-block underline underline-offset-4"
          href="/"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
