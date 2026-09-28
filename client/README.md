# Frontend

Frontend modular construido con **Next.js App Router, React, TypeScript strict y Tailwind CSS 4**.

Este proyecto funciona como base reutilizable para aplicaciones full stack. La arquitectura prioriza encapsulación por dominio, límites claros entre módulos, mantenibilidad, testing y calidad automática.

En esta etapa no se incluye lógica de producto real salvo implementaciones mínimas necesarias para validar la infraestructura.

---

## Arquitectura

```text
src/
├── app/
├── assets/
├── features/
├── shared/
└── proxy.ts
```

### `src/app`

Contiene exclusivamente responsabilidades propias de Next.js:

- routing;
- layouts;
- metadata;
- providers;
- loading states;
- error boundaries;
- 404;
- composición de páginas.

Las páginas deben ser mínimas.

Idealmente, una `page.tsx` importa la pantalla correspondiente desde la API pública de una feature y la renderiza.

```tsx
import { AdminHomePage } from '@/features/admin';

export default function AdminHome() {
  return <AdminHomePage />;
}
```

No debe existir lógica de negocio dentro de `app`.

Las rutas se organizan mediante route groups como:

```text
(public)/
(private)/
```

Los grupos permiten separar áreas de navegación sin modificar la URL.

El ejemplo incluido se puede recorrer así:

```text
(public)/page.tsx             → /
(public)/login/page.tsx       → /login
(private)/dashboard/page.tsx  → /dashboard
(private)/profile/page.tsx    → /profile
```

El layout público reutiliza `Header` y `Footer` desde `shared/ui`. El layout privado aporta su propia estructura de aplicación. `/dashboard` y `/profile` quedan abiertos para recorrer el starter; `(private)` expresa organización y composición, no autenticación. `src/proxy.ts` queda como punto de extensión para una sesión real futura.

---

## Features

Cada dominio funcional vive en:

```text
src/features/<domain>/
```

Ejemplos:

```text
features/
├── auth/
├── catalog/
├── customers/
├── checkout/
└── admin/
```

Una feature puede contener, cuando corresponda:

```text
components/
context/
hooks/
api/
lib/
types/
schemas/
index.ts
```

No todas las features necesitan todas estas carpetas.

### Responsabilidades

- `components/`: UI específica del dominio.
- `hooks/`: comportamiento que depende de React.
- `api/`: comunicación HTTP con endpoints del dominio.
- `lib/`: funciones puras, transformaciones y helpers.
- `context/`: estado React compartido dentro del dominio.
- `types/`: tipos y contratos.
- `schemas/`: validación runtime cuando sea necesaria.
- `index.ts`: API pública de la feature.

El `index.ts` define qué puede consumir el resto de la aplicación.

Permitido:

```ts
import { useAuth } from '@/features/auth';
```

No permitido:

```ts
import { useAuth } from '@/features/auth/context/use-auth';
```

Una feature puede consumir la API pública de otra feature, pero nunca debe depender de sus internals.

No existe un barrel global `src/features/index.ts`.

---

## Shared

`src/shared` contiene únicamente código transversal y sin dueño de dominio.

```text
shared/
├── api/
├── config/
├── hooks/
├── lib/
├── types/
└── ui/
```

### Responsabilidades

- `api/`: infraestructura HTTP común.
- `config/`: configuración global del frontend.
- `hooks/`: hooks realmente reutilizables entre dominios.
- `lib/`: utilidades puras y agnósticas al negocio.
- `types/`: tipos verdaderamente globales.
- `ui/`: componentes visuales reutilizables.

Que algo se utilice en dos features no significa automáticamente que pertenezca a `shared`.

Si el código representa un concepto de negocio, debe seguir perteneciendo a su feature.

---

## API

Se utiliza `fetch` nativo.

La infraestructura HTTP común pertenece a:

```text
shared/api/
```

Las llamadas concretas a endpoints pertenecen a la feature correspondiente.

Ejemplo:

```text
features/catalog/api/get-products.ts
features/customers/api/create-customer.ts
```

No se realizan llamadas HTTP directamente desde componentes salvo que exista una razón técnica clara.

Separación habitual:

```text
api      → comunicación HTTP
hooks    → coordinación con React
lib      → lógica pura
components → presentación
```

---

## Server y Client Components

Los **Server Components son el default**.

Usá `"use client"` únicamente cuando sea necesario por:

- estado React;
- event handlers;
- efectos;
- Context;
- browser APIs;
- librerías que requieran ejecución en cliente.

La frontera cliente debe mantenerse tan abajo en el árbol como sea razonablemente posible.

No conviertas una página o layout completo en Client Component únicamente porque un componente hijo necesita interacción.

---

## Routing y acceso

`src/proxy.ts` puede interceptar rutas privadas para mejorar navegación y UX.

Puede utilizar información de sesión disponible server-side para decidir redirects tempranos.

El proxy **no es la autoridad de seguridad**.

El backend debe validar siempre:

- autenticación;
- roles;
- permisos;
- autorización sobre recursos;
- reglas de negocio.

Ocultar una ruta o componente en frontend no reemplaza autorización backend.

---

## Testing

El frontend utiliza tres niveles principales.

### Vitest

Para lógica aislada:

- helpers;
- transformaciones;
- parsers;
- validaciones;
- cálculos;
- builders.

Los tests unitarios viven junto al archivo probado.

```text
build-product-query.ts
build-product-query.test.ts
```

### React Testing Library

Para comportamiento observable de componentes React.

Los tests deben interactuar con la UI como lo haría una persona y evitar detalles internos de implementación.

```text
login-form.tsx
login-form.test.tsx
```

### Playwright

Para flujos E2E reales.

Los tests viven en:

```text
e2e/
```

Puede validar:

- navegación;
- formularios;
- redirects;
- autenticación;
- responsive behavior;
- integración entre pantallas;
- navegación mediante teclado.

Cuando corresponda deben cubrir:

- `Tab`;
- `Shift + Tab`;
- `Enter`;
- `Escape`;
- focus visible;
- navegación coherente.

---

## Accessibility

La accesibilidad forma parte de la Definition of Done.

Preferí HTML semántico y controles nativos.

Ejemplos:

```tsx
<button>Guardar</button>
```

en lugar de:

```tsx
<div onClick={save}>Guardar</div>
```

Los formularios deben utilizar labels correctamente asociados y los flujos importantes deben poder navegarse mediante teclado.

No deshabilites reglas de accessibility simplemente para eliminar warnings.

---

## TypeScript

TypeScript funciona en modo estricto.

```json
{
  "strict": true
}
```

No uses `any` para evitar resolver problemas de tipado.

El proyecto dispone además de un chequeo independiente:

```bash
npm run typecheck
```

Este ejecuta TypeScript sin emitir archivos.

---

## Quality gates

La calidad del código se controla mediante:

- ESLint;
- Prettier;
- TypeScript strict;
- typecheck;
- Husky;
- lint-staged;
- Vitest;
- React Testing Library;
- Playwright;
- GitHub Actions.

El pre-commit ejecuta validaciones rápidas únicamente sobre archivos staged.

CI vuelve a validar el proyecto antes de integrar cambios.

---

## Bundle analysis

Para inspeccionar qué módulos y dependencias contribuyen al tamaño final del cliente:

```bash
npm run analyze
```

Utilizalo cuando:

- se agregue una dependencia importante;
- aumente inesperadamente el bundle;
- se investiguen problemas de performance.

No forma parte del flujo normal de desarrollo diario.

---

## Dependencias

Dependabot mantiene visibles:

- nuevas versiones;
- actualizaciones importantes;
- vulnerabilidades conocidas.

Las actualizaciones deben entrar mediante PR y pasar los mismos checks que cualquier otro cambio.

No se introducen nuevas dependencias si el problema puede resolverse razonablemente con el stack existente.

---

## Comandos

```bash
npm run dev
npm run build
npm run start

npm run lint
npm run typecheck

npm test
npm run test:e2e

npm run format
npm run format:check

npm run analyze
```

Instalá los navegadores de Playwright una vez:

```bash
npx playwright install
```

Si necesitás configurar variables locales:

```text
.env.example
↓
.env.local
```

---

## Antes de abrir un PR

Como mínimo:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Ejecutá además:

```bash
npm run test:e2e
```

cuando el cambio afecte navegación, formularios, rutas, redirects o flujos reales.

Un feature no se considera terminado solamente porque “se ve bien”.

También debe:

- estar correctamente tipado;
- respetar los boundaries;
- manejar estados relevantes;
- cumplir accesibilidad;
- tener tests razonables;
- pasar los checks automáticos.
