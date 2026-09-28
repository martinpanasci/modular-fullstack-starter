# Test infrastructure

Esta carpeta contiene configuración global de Vitest y React Testing Library, como los matchers DOM cargados por `setup.ts`.

Los tests unitarios y de componentes no van aquí: viven junto al archivo probado, por ejemplo `format-value.ts` con `format-value.test.ts` o `profile-card.tsx` con `profile-card.test.tsx`.

Usá `npm test` para una ejecución y `npm run test:watch` durante el desarrollo. No coloques tests E2E aquí; pertenecen a `e2e/` y se ejecutan con `npm run test:e2e`.
