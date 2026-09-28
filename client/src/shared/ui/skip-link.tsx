export function SkipLink() {
  return (
    <a
      className="sr-only z-50 rounded-md bg-white px-4 py-2 text-slate-950 shadow focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      href="#main-content"
      tabIndex={0}
    >
      Saltar al contenido principal
    </a>
  );
}
