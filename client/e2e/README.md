# End-to-end tests

Playwright prueba flujos completos en un navegador real: navegación entre rutas, redirects, formularios, responsive behavior y teclado. Un flujo conceptual puede abrir `/login`, usar el botón Ingresar para llegar a `/dashboard` y navegar a `/profile` conservando el layout privado.

Los E2E deben observar comportamiento visible y reservarse para recorridos importantes. No reemplazan tests unitarios de funciones puras ni tests de componentes con React Testing Library.

Comandos útiles:

```bash
npx playwright install
npm run test:e2e
npx playwright test --project=chromium
npx playwright test --ui
```

Los reportes y resultados generados no se documentan ni versionan dentro de sus carpetas.
