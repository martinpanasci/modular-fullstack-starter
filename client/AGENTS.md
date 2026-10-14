# Frontend Agent Rules

Estas reglas aplican a todo `client/`.

Antes de realizar cambios, inspeccioná la implementación existente y respetá las convenciones del proyecto.

No introduzcas una arquitectura alternativa si el requerimiento puede resolverse correctamente dentro de la actual.

## Reglas prioritarias

Estas decisiones guían todos los features, especialmente al crecer:

1. **Organizá componentes por bloques funcionales y relación padre-hijo.** La estructura debe permitir reconocer rápidamente qué compone cada parte de la pantalla.
2. **Separá composición, comportamiento React y lógica pura.** Cada archivo debe tener una responsabilidad concreta; evitá tanto componentes gigantescos como fragmentación sin propósito.
3. **Separá contratos de datos y presentación.** Los datos canónicos no deben depender de cómo se muestran; modelá variantes explícitamente.
4. **Mantené estado local y límites de dominio.** Compartir código no implica llevarlo a `shared` ni introducir Context.
5. **Implementá estilos con Tailwind CSS 4 y flujos accesibles.** No agregues CSS Modules ni estilos inline a componentes o features.

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

### Organización por bloques funcionales y relación padre-hijo

- Las pantallas de `components/pages/`, cuando exista esa organización, componen bloques; no concentran filtrado, HTTP ni toda la interacción del feature.
- Agrupá una tabla con sus filas, un formulario con sus campos y un detalle con sus secciones dentro de su bloque funcional.
- Un hijo exclusivo vive con el bloque que lo utiliza. Los componentes usados por varios bloques del mismo feature pueden quedar en el nivel común de `components/`.
- Evitá carpetas genéricas como `modals/` cuando separen un diálogo de la funcionalidad a la que pertenece.
- Creá subcarpetas cuando hagan explícita una relación o responsabilidad. No crees una carpeta por archivo ni jerarquías profundas sin necesidad.
- Extraé secciones con responsabilidad propia; no cada fragmento de JSX. No uses un límite arbitrario de líneas como criterio de separación.

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

Un hook debe expresar una responsabilidad concreta, por ejemplo coordinar filtros y paginación o gestionar el ciclo de vida de un diálogo. No extraigas un hook por cada `useState`: selección, apertura o etapa de un formulario pueden permanecer locales si su comportamiento es pequeño.

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

Ubicá aquí las transformaciones de contratos a valores visibles y el formato de importes y fechas. Íconos, clases Tailwind y decisiones visuales permanecen en componentes. Las reglas de negocio autoritativas pertenecen al backend; el frontend puede preparar una previsualización que el backend valide.

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

- Dividí los contratos por responsabilidad cuando crezcan: listado, detalle, filtros y formulario. Evitá un archivo que mezcle todos los contratos y props del feature.
- Las props exclusivas de un componente viven junto a él. Los contratos y tipos compartidos dentro del dominio viven en `types/`.
- Modelá variantes de entidades mediante uniones discriminadas, por ejemplo `kind: 'product' | 'service'`. Evitá un tipo con numerosos campos opcionales que permita combinaciones inválidas.
- Si IDs de entidades diferentes pueden coincidir, usá la identidad completa (`kind + id`) para selección, resolución del detalle y claves de React.

### Contratos y presentación

- Respetá los formatos canónicos del contrato: fechas ISO para eventos y strings decimales para importes y cotizaciones cuando el contrato requiera precisión decimal, por ejemplo `"140000.00"`. No uses importes localizados como `"140.000,00"` ni etiquetas de fecha como datos fuente.
- Generá etiquetas y valores visibles en la capa de presentación. Los borradores de inputs pueden conservar texto transitorio; validalo y normalizalo antes de construir el contrato.
- Separá resumen de listado y detalle cuando tengan necesidades diferentes. Una fila no debe cargar todos los datos y acciones del detalle.
- Al definir listados paginados por página, explicitá `items`, `total`, `page` y `pageSize`, junto con filtros y orden. Respetá otro esquema si el contrato existente lo requiere; no impongas consultas separadas si la pantalla no las necesita.

### Mocks compatibles con el contrato

Los mocks deben respetar los tipos y formatos previstos para la API y mantenerse fuera de los componentes. Separá resúmenes y detalles cuando corresponda y resolvelos por su identidad. Usar mocks no justifica crear `api/` vacío ni afirmar que una acción persiste cuando solo es una previsualización.

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

Mantené local la selección de un registro, el booleano de apertura y la etapa formulario/revisión cuando solo los utiliza su bloque. Elevá únicamente el estado que de verdad deban compartir sus componentes.

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

### Diálogos

El ciclo de vida del diálogo debe tener un responsable claro: apertura/cierre, Escape, foco inicial y restauración al disparador, navegación por teclado y bloqueo/restauración del scroll. Usá controles nativos y un hook cuando coordinar ese comportamiento lo justifique. Al cambiar etapas internas, evitá que sus efectos de foco compitan con la apertura del diálogo. Los nombres accesibles y el HTML permanecen en el componente.

---

# 12. Styling

Implementá los estilos de componentes y features con Tailwind CSS 4. No agregues CSS Modules, hojas de estilos por feature, `scopeClasses` ni estilos inline. El CSS global se reserva para configuración de Tailwind, tokens y reglas realmente globales.

No introduzcas:

- otro framework CSS;
- CSS-in-JS;
- styled-components;
- design systems externos;

sin un requerimiento concreto.

No conviertas estilos globales en solución para estilos específicos de una feature.

Mantené los estilos cerca de la responsabilidad que representan.

## Iconografía

Usá `lucide-react` como estándar para los iconos de la interfaz en todos los desarrollos y modificaciones futuros.

- Importá individualmente los iconos utilizados desde `lucide-react`.
- Usá sus componentes en lugar de escribir iconos mediante SVG manuales.
- Ajustá tamaño, color y grosor con props y clases Tailwind, respetando la identidad visual.
- Mantené los nombres accesibles de los controles y marcá como decorativos los iconos que acompañan texto.
- Los logos y las ilustraciones de marca son recursos gráficos propios; esta regla no exige reemplazarlos por iconos.
- Si la dependencia no está instalada, incorporala al paquete `client/` cuando una tarea necesite iconos. Esta regla no implica que ya esté instalada ni autoriza una migración global fuera del alcance de la tarea.

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
- los componentes reflejan bloques funcionales y relaciones padre-hijo;
- contratos y presentación están separados cuando corresponde;
- no se rompieron boundaries;
- no hay imports internos entre features;
- no existe lógica de negocio en `app`;
- Server Components siguen siendo default cuando corresponde;
- los tipos son correctos;
- no se introdujo `any` innecesario;
- existen loading/error/empty states cuando corresponden;
- accessibility relevante está cubierta;
- se revisó manualmente el comportamiento afectado cuando corresponde;
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
