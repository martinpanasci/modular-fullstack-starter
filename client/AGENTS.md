# Frontend Agent Rules

Estas reglas aplican a todo `client/`.

Antes de realizar cambios, inspeccioná la implementación existente y respetá las convenciones del proyecto.

No introduzcas una arquitectura alternativa si el requerimiento puede resolverse correctamente dentro de la actual.

---

# 1. Architecture boundaries

La estructura principal es:

```text
src/
├── app/
├── assets/
├── features/
├── shared/
└── proxy.ts
```

## `app`

`src/app` existe exclusivamente para responsabilidades propias de Next.js:

- routing;
- layouts;
- metadata;
- providers;
- loading states;
- error boundaries;
- 404;
- composición.

No agregues lógica de negocio en `app`.

Una `page.tsx` debe ser mínima.

Preferí:

```tsx
import { CustomersPage } from '@/features/customers';

export default function Page() {
  return <CustomersPage />;
}
```

Evitá:

```tsx
export default function Page() {
  // fetches
  // filtering logic
  // business rules
  // large UI implementation
}
```

La lógica de dominio pertenece a su feature.

---

# 2. Feature ownership

Cada dominio funcional vive en:

```text
src/features/<domain>/
```

Una feature puede contener únicamente las carpetas que realmente necesite:

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

No crees carpetas vacías preventivamente.

Cada feature debe ser dueña de:

- su comportamiento;
- sus tipos;
- su estado;
- sus componentes específicos;
- sus llamadas HTTP;
- sus reglas de presentación;
- su API pública.

---

# 3. Feature public APIs

El `index.ts` de una feature es su API pública.

Desde afuera de una feature:

```ts
import { useAuth } from '@/features/auth';
```

Nunca:

```ts
import { useAuth } from '@/features/auth/context/use-auth';
```

No importes internals de otra feature.

No crees:

```text
src/features/index.ts
```

Una feature puede depender de la API pública de otra feature cuando tenga sentido funcional.

Evitar dependencia entre features no significa prohibir colaboración entre dominios; significa mantener encapsulada la implementación interna.

---

# 4. Placement rules

Antes de crear un archivo, clasificá su responsabilidad.

## `components/`

Usar cuando el archivo:

- renderiza UI;
- pertenece específicamente al dominio;
- contiene lógica visual/local pequeña.

Ejemplos:

```text
ProductCard
CustomerForm
ProfileHeader
```

No extraigas lógica a un hook únicamente para reducir líneas del componente.

---

## `hooks/`

Usar cuando la lógica depende de React:

- `useState`;
- `useEffect`;
- `useContext`;
- ciclo de vida;
- coordinación de estado;
- comportamiento reutilizable entre componentes.

Ejemplo:

```ts
useProducts(filters);
```

No pongas funciones puras en `hooks`.

---

## `lib/`

Usar para lógica pura:

- transformaciones;
- formatters;
- parsers;
- builders;
- cálculos;
- validaciones sin dependencia de React.

Ejemplo:

```ts
buildProductQuery(filters);
```

Una función en `lib` debería poder ejecutarse fuera de React.

---

## `api/`

Usar para llamadas HTTP específicas del dominio.

Ejemplos:

```text
features/catalog/api/get-products.ts
features/customers/api/create-customer.ts
```

No hagas requests HTTP directamente desde componentes si pueden encapsularse razonablemente en `api`.

No uses Axios.

Usá la infraestructura `fetch` existente.

---

## `context/`

Usar únicamente cuando existe estado React que realmente necesita compartirse entre múltiples partes del dominio.

No introduzcas Context para evitar pasar una prop uno o dos niveles.

No uses Context como reemplazo genérico de arquitectura de estado.

---

## `types/`

Usar para tipos relevantes al dominio o contratos compartidos dentro de la feature.

No dupliques un tipo si ya existe una fuente canónica apropiada.

No uses `any` para evitar modelar correctamente los datos.

---

## `schemas/`

Usar cuando se necesita validación runtime.

No agregues schemas únicamente porque existe la carpeta.

---

# 5. Shared rules

`shared` contiene únicamente código transversal y domain-agnostic.

Puede contener:

```text
shared/
├── api/
├── config/
├── hooks/
├── lib/
├── types/
└── ui/
```

`shared` nunca puede depender de `features`.

No muevas algo a `shared` simplemente porque se utiliza dos veces.

Antes de mover código a `shared`, preguntate:

> ¿Este código sigue teniendo sentido si elimino completamente el dominio que lo originó?

Si la respuesta es no, probablemente pertenece a una feature.

---

# 6. HTTP rules

Usá `fetch`.

La infraestructura común pertenece a:

```text
shared/api/
```

Las llamadas concretas pertenecen a:

```text
features/<domain>/api/
```

No dupliques configuración HTTP entre features.

No hardcodees base URLs.

Usá la configuración existente.

Manejá explícitamente los estados relevantes:

- success;
- validation error;
- unauthorized;
- forbidden;
- not found;
- server error.

No asumas que una request siempre será exitosa.

---

# 7. Server and Client Components

Preferí Server Components por default.

Agregá:

```ts
'use client';
```

únicamente cuando sea necesario por:

- React state;
- effects;
- event handlers;
- Context;
- browser APIs;
- librerías client-only.

No conviertas una página o layout completo en Client Component porque un hijo necesite interacción.

Empujá la frontera client-side tan abajo en el árbol como sea razonablemente posible.

Antes de agregar `"use client"`, verificá que realmente sea necesario.

---

# 8. Routing

Mantené:

```text
(public)
(private)
```

como route groups principales.

Los grupos pueden subdividirse según las necesidades del producto.

No utilices route groups como mecanismo real de autorización.

Al agregar una nueva URL privada:

1. verificá si debe ser interceptada por `src/proxy.ts`;
2. actualizá sus matchers cuando corresponda;
3. mantené la validación real de permisos en backend.

El proxy es una barrera temprana de navegación/UX.

No es la autoridad de seguridad.

---

# 9. State management

Preferí el estado más local posible.

Orden de preferencia:

```text
local state
↓
lift state when reasonable
↓
feature Context when genuinely shared
↓
external state library only when justified
```

No introduzcas Redux, Zustand u otra librería de estado sin un requerimiento concreto.

No conviertas información derivable en nuevo estado.

---

# 10. TypeScript

Mantené `strict: true`.

No debilites TypeScript para resolver errores.

Evitá:

```ts
any
as any
// @ts-ignore
```

salvo casos excepcionalmente justificados.

Preferí:

- unions;
- narrowing;
- tipos explícitos;
- nullability correcta;
- contratos claros.

Los errores de TypeScript deben resolverse en la causa, no silenciarse.

---

# 11. Accessibility

No deshabilites reglas de accesibilidad para hacer pasar ESLint.

Preferí elementos HTML semánticos.

Usá:

```tsx
<button />
<a />
<label />
<input />
<nav />
main
section
```

cuando representen correctamente la intención.

Evitá implementar controles interactivos mediante `div` o `span` salvo que exista una razón técnica real y se implemente correctamente toda la accesibilidad necesaria.

Los flujos interactivos relevantes deben funcionar mediante teclado.

Considerá:

- Tab;
- Shift+Tab;
- Enter;
- Escape;
- focus visible;
- orden de focus;
- labels;
- estados disabled;
- feedback de errores.

---

# 12. Styling

Usá Tailwind CSS 4 como sistema principal de styling.

No introduzcas:

- otro framework CSS;
- CSS-in-JS;
- styled-components;
- design systems externos;

sin un requerimiento concreto.

No conviertas estilos globales en solución para estilos específicos de una feature.

Mantené los estilos cerca de la responsabilidad que representan.

---

# 13. Imports

Preferí los aliases existentes:

```ts
@/features/...
@/shared/...
```

Evitá paths relativos profundos como:

```ts
../../../../shared/lib/...
```

No rompas boundaries para evitar crear una exportación pública apropiada.

---

# 14. Testing strategy

Elegí el nivel de test según la responsabilidad.

## Vitest

Usar para:

- funciones puras;
- transformaciones;
- parsers;
- cálculos;
- validaciones;
- builders.

El test vive junto al archivo:

```text
build-product-query.ts
build-product-query.test.ts
```

---

## React Testing Library

Usar para comportamiento observable de componentes.

Probá:

- qué ve el usuario;
- qué puede escribir;
- qué puede clickear;
- estados loading/error/empty;
- formularios;
- accesibilidad relevante.

No pruebes detalles internos.

Preferí queries como:

```ts
getByRole;
getByLabelText;
getByText;
```

sobre selectors ligados a implementación.

---

## Playwright

Usar para flujos reales que atraviesan la aplicación.

Ejemplos:

- login;
- navegación;
- formularios importantes;
- redirects;
- permisos visibles;
- interacción entre varias pantallas;
- comportamiento responsive;
- navegación por teclado.

Los E2E viven en:

```text
e2e/
```

No conviertas cada pequeño comportamiento en E2E.

---

# 15. Test expectations by change

Al modificar una función pura:

→ evaluá agregar/actualizar Vitest.

Al modificar comportamiento de un componente:

→ evaluá React Testing Library.

Al modificar rutas, navegación, formularios críticos o flujos completos:

→ evaluá Playwright.

No agregues tests artificiales únicamente para aumentar cantidad o cobertura.

Los tests deben proteger comportamiento significativo.

---

# 16. Error, loading and empty states

Cuando una feature consume datos asincrónicos, considerá siempre:

```text
loading
success
empty
error
```

No diseñes únicamente el happy path.

Los errores deben ser comprensibles para el usuario.

No expongas detalles internos del servidor directamente en la UI.

---

# 17. Architectural changes

No introduzcas sin necesidad explícita:

- nuevas carpetas globales;
- nuevas capas arquitectónicas;
- nuevos HTTP clients;
- nuevas librerías de state management;
- nuevas librerías de testing;
- nuevas soluciones de styling;
- Storybook;
- design systems;
- Axios;
- nuevas abstracciones globales.

Antes de introducir una dependencia, verificá que el problema no pueda resolverse razonablemente con el stack existente.

---

# 18. Refactoring

Podés refactorizar código directamente relacionado con la tarea cuando:

- reduzca duplicación real;
- mejore boundaries;
- facilite el cambio solicitado;
- corrija deuda evidente dentro del mismo alcance.

No realices refactors amplios no relacionados con la tarea.

No cambies naming, estructura o patrones globales únicamente por preferencia personal.

---

# 19. Performance

Evitá client-side JavaScript innecesario.

No agregues `"use client"` indiscriminadamente.

Evitá dependencias grandes para resolver problemas pequeños.

Al introducir una dependencia relevante para runtime, considerá su impacto en el bundle.

Usá:

```bash
npm run analyze
```

cuando el cambio pueda afectar significativamente el tamaño del cliente.

---

# 20. Formatting and linting

No modifiques configuraciones de ESLint, Prettier o TypeScript para hacer pasar código defectuoso.

Corregí el código.

El pre-commit ejecuta ESLint y Prettier sobre archivos staged.

Antes de entregar cambios ejecutá:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Si modificaste navegación, formularios, redirects o interacción real:

```bash
npm run test:e2e
```

---

# 21. Definition of Done

Antes de considerar una tarea terminada verificá:

- el código pertenece a la capa correcta;
- no se rompieron boundaries;
- no hay imports internos entre features;
- no existe lógica de negocio en `app`;
- Server Components siguen siendo default cuando corresponde;
- los tipos son correctos;
- no se introdujo `any` innecesario;
- existen loading/error/empty states cuando corresponden;
- accessibility relevante está cubierta;
- los tests apropiados existen y pasan;
- lint pasa;
- typecheck pasa;
- build pasa;
- no se agregaron dependencias innecesarias.

---

# 22. When uncertain

Si una responsabilidad no tiene ubicación obvia:

1. identificá a qué dominio pertenece;
2. determiná si depende de React;
3. determiná si realiza HTTP;
4. determiná si es lógica pura;
5. determiná si realmente es transversal.

Regla rápida:

```text
React behavior      → hooks
HTTP                → api
pure logic          → lib
domain UI           → components
shared React state  → context
domain contracts    → types
runtime validation  → schemas
domain-agnostic     → shared
```

No inventes una nueva categoría antes de intentar clasificarla con estas reglas.

---

Consultá `README.md` para arquitectura general, comandos y orientación para desarrolladores.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
