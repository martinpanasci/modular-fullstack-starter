# Features

Cada carpeta representa un dominio funcional y es dueña de su UI, comportamiento, tipos y reglas. En este starter, `foundation` muestra el patrón sin implementar producto real.

Una feature agrega sólo lo que utiliza:

- `components`: UI específica del dominio.
- `hooks`: comportamiento que depende de React, como estado o efectos.
- `lib`: funciones puras ejecutables fuera de React.
- `api`: llamadas a endpoints del dominio mediante la infraestructura de `shared/api`.
- `types`: contratos propios del dominio.
- `context` o `schemas`: únicamente cuando existe una necesidad real.

`index.ts` es la API pública. Desde otra capa usá:

```ts
import { FoundationPage } from '@/features/foundation';
```

No importes `@/features/foundation/components/foundation-page` ni otros internals. Tampoco crees un barrel global `features/index.ts`. Los tests Vitest y React Testing Library viven junto al archivo probado.
