# Monorepo Agent Rules

Estas reglas aplican a todo el repositorio.

El objetivo raíz es preservar la separación entre proyectos y evitar introducir acoplamiento o tooling global innecesario.

---

## Client

Antes de modificar cualquier archivo dentro de:

```text
client/
```

leé y respetá:

```text
client/AGENTS.md
client/README.md
```

Las reglas específicas del frontend tienen prioridad para cualquier cambio dentro de `client/`.

---

## Server

Antes de modificar cualquier archivo dentro de:

```text
server/
```

leé y respetá:

```text
server/AGENTS.md
server/README.md
```

Las reglas específicas del backend tienen prioridad para cualquier cambio dentro de `server/`.

---

## Cross-project changes

Si una tarea modifica client y server:

1. respetá las reglas de ambos proyectos;
2. mantené explícito el contrato entre frontend y backend;
3. evitá compartir implementación interna entre ambos;
4. no introduzcas dependencias cruzadas directas.

Frontend y backend pueden compartir contratos cuando exista una necesidad real, pero no deben compartir lógica de negocio únicamente para evitar duplicación.

---

## Root architecture

La raíz contiene:

```text
client/
server/
docs/
infra/
packages/
.github/
```

Cada carpeta tiene una responsabilidad específica.

No agregues nuevas carpetas globales sin una necesidad arquitectónica clara.

---

## docs/

Usá:

```text
docs/
```

para documentación transversal al monorepo.

Ejemplos:

- ADRs;
- arquitectura general;
- diagramas;
- convenciones compartidas;
- onboarding;
- decisiones que afectan client y server.

No mover documentación específica de frontend o backend a `docs/` si ya pertenece claramente a uno de esos proyectos.

---

## infra/

Usá:

```text
infra/
```

exclusivamente para:

- Infrastructure as Code;
- deployment;
- networking;
- compute;
- database infrastructure;
- cloud resources;
- monitoring infrastructure.

No colocar lógica de aplicación dentro de `infra/`.

No introducir una plataforma cloud concreta sin que el proyecto la requiera.

---

## packages/

Usá:

```text
packages/
```

únicamente cuando exista una necesidad real de compartir un paquete.

Casos razonables:

- configuración TypeScript compartida;
- configuración ESLint compartida;
- contratos compartidos;
- tipos generados;
- librerías internas verdaderamente reutilizables.

No mover código a `packages/` simplemente porque aparece en client y server.

No usar `packages/` para compartir lógica de negocio y acoplar ambas aplicaciones.

No crear paquetes preventivamente.

---

## .github/

`.github/` contiene configuración global del repositorio.

Los workflows y Dependabot deben vivir únicamente en:

```text
.github/
```

No crear:

```text
client/.github/
server/.github/
```

salvo que exista una razón explícita y compatible con GitHub.

Preservá los pipelines de client y server cuando una tarea no requiera modificarlos.

---

## Package management

`client/` y `server/` son proyectos npm independientes.

No crear:

- root workspaces;
- root package.json;
- root package manager configuration;
- scripts agregados;

salvo que la tarea lo requiera explícitamente.

Ejecutá installs, builds y quality checks desde el proyecto correspondiente.

---

## Dependencies

No introduzcas dependencias globales en la raíz.

Antes de instalar una dependencia nueva dentro de client o server:

1. verificá si el stack existente ya resuelve el problema;
2. confirmá que exista una necesidad real;
3. respetá las reglas del AGENTS.md correspondiente.

---

## Scope discipline

No modifiques simultáneamente client y server si el requerimiento puede resolverse correctamente dentro de uno solo.

No hagas refactors globales no relacionados con la tarea.

No cambies estructura, naming o tooling únicamente por preferencia personal.

---

## Documentation

Si una modificación cambia:

- arquitectura;
- comandos;
- estructura;
- contratos relevantes;
- workflow;

actualizá la documentación correspondiente.

Usá:

```text
README.md
```

para visión general del repositorio.

Usá:

```text
client/README.md
server/README.md
```

para documentación específica.

Usá:

```text
AGENTS.md
```

para reglas prescriptivas dirigidas a agentes.

No dupliques grandes bloques de documentación si pueden referenciarse desde otro README.

---

## Generated files

No modificar manualmente código generado.

Ejemplos actuales incluyen código generado por Prisma dentro del backend.

Modificá siempre la fuente correspondiente y regenerá mediante el tooling existente.

---

## Environment and secrets

Nunca commitear:

- `.env`;
- `.env.local`;
- secrets;
- API keys;
- credentials;
- tokens.

Los archivos `.env.example` sí deben mantenerse actualizados y sin secretos reales.

---

## Quality checks

Antes de entregar cambios ejecutá los checks definidos por cada proyecto modificado.

### Client

Seguí la Definition of Done de:

```text
client/AGENTS.md
```

### Server

Seguí la Definition of Done de:

```text
server/AGENTS.md
```

Si una tarea modifica ambos, ambos conjuntos de checks deben pasar.

---

## Architectural changes

No introduzcas desde la raíz:

- nuevos frameworks;
- nuevos package managers;
- nuevas capas arquitectónicas;
- nuevas plataformas cloud;
- tooling global;
- shared business logic;
- nuevas estrategias de deployment;

sin una necesidad explícita.

Los cambios arquitectónicos deben ser deliberados, no consecuencias accidentales de una tarea pequeña.

---

## General rule

Preferí:

- cambios acotados;
- ownership claro;
- boundaries explícitos;
- documentación actualizada;
- tooling existente;
- soluciones simples que puedan evolucionar.

Evitá:

- abstracciones preventivas;
- dependencias cruzadas;
- duplicación de configuración raíz;
- complejidad sin caso de uso;
- cambios no relacionados con la tarea.