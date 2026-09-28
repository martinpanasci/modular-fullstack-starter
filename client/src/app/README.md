# App Router

Esta carpeta define URLs y composición propia de Next.js. Debe contener archivos especiales del framework y páginas muy pequeñas; la UI y la lógica de cada dominio pertenecen a `features`.

## Convenciones principales

- `page.tsx`: hace pública una ruta. Idealmente importa una pantalla desde `@/features/<dominio>` y la renderiza.
- `layout.tsx`: envuelve rutas hijas y conserva UI compartida durante la navegación, como Header, Footer o sidebar.
- `loading.tsx`: fallback inmediato del segmento mientras su contenido se resuelve.
- `error.tsx`: error boundary del segmento; requiere Client Component.
- `not-found.tsx`: UI para `notFound()` y rutas no encontradas en el nivel raíz.
- `global-error.tsx`: último error boundary; reemplaza el root layout y por eso incluye `<html>` y `<body>`.

Los route groups entre paréntesis organizan rutas sin modificar la URL:

```text
(public)/page.tsx             → /
(public)/login/page.tsx       → /login
(private)/dashboard/page.tsx  → /dashboard
(private)/profile/page.tsx    → /profile
```

No pueden existir dos `page.tsx` que resuelvan a la misma URL aunque estén en grupos diferentes. `(private)` sirve para composición y no protege rutas por sí mismo. En este starter sus páginas quedan abiertas y `src/proxy.ts` es un punto de extensión sin validación ficticia. Cuando exista autenticación real, el proxy podrá hacer redirects tempranos y el backend deberá seguir aplicando la autorización definitiva.

No coloques aquí lógica de negocio, clientes HTTP de dominio ni componentes extensos. Ejemplo correcto:

```tsx
import { DashboardPage } from '@/features/dashboard';

export default function Page() {
  return <DashboardPage />;
}
```
