# Documentation

Documentación transversal del monorepo. Este directorio puede alojar decisiones y material que afectan a más de un proyecto, por ejemplo:

- ADRs y decisiones de arquitectura;
- diagramas;
- convenciones compartidas entre client y server;
- material de onboarding;
- notas de deployment;
- decisiones de diseño.

Una estructura futura posible es:

```text
docs/
├── adr/
├── architecture/
└── guides/
```

Estas carpetas deben crearse cuando exista contenido real.

Un ADR, o Architectural Decision Record, documenta una decisión importante, su contexto, las alternativas consideradas y sus consecuencias. No hace falta escribir un ADR para decisiones triviales o fácilmente reversibles.

La documentación específica de cada aplicación permanece en `client/` o `server/`.
