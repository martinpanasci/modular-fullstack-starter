# Modular Fullstack Starter

A pragmatic, production-oriented TypeScript monorepo starter for medium-sized full stack applications and small teams.

The goal is to provide a reusable foundation with architecture, testing, quality tooling and operational defaults already defined, so new projects can focus on product logic instead of rebuilding the same setup every time.

The starter prioritizes:

- modularity;
- maintainability;
- explicit boundaries;
- type safety;
- testing;
- pragmatic architecture;
- production-oriented defaults.

It intentionally avoids adding complexity before there is a real requirement for it.

The repository includes small pedagogical examples that demonstrate the architecture. They can be removed when starting a real product.

---

## Stack

### Frontend

- Next.js App Router
- React
- TypeScript strict
- Tailwind CSS 4
- Vitest
- React Testing Library
- Playwright

### Backend

- NestJS
- TypeScript strict
- Prisma
- PostgreSQL
- Jest
- Supertest
- Swagger / OpenAPI
- Pino

### Tooling

- ESLint
- Prettier
- Husky
- lint-staged
- GitHub Actions
- Dependabot

---

## Monorepo structure

```text
modular-fullstack-starter/
├── client/      Next.js application
├── server/      NestJS API and PostgreSQL access
├── infra/       Infrastructure as Code and deployment resources
├── packages/    Internal packages shared only when justified
├── docs/        Cross-project documentation and architecture decisions
└── .github/     CI and repository automation
```

`client` and `server` are independent npm projects.

The repository currently does not use root workspaces or aggregated root scripts.

---

## Philosophy

### Modular architecture

Frontend features and backend modules own their behavior and implementation details.

### Explicit boundaries

Dependencies should have a clear direction and internal implementation details should not leak across modules.

### Testability

Important rules and contracts should be testable without requiring unnecessary external infrastructure.

### Type safety

Both applications use TypeScript strict mode and validate data at their boundaries.

### Production-oriented defaults

CI, structured logging, health checks, validation and basic security are available from the beginning.

### Complexity must be justified

New abstractions, infrastructure and dependencies should solve an actual problem.

The goal is not to maximize the number of architectural layers.

---

## Frontend architecture

The frontend uses Next.js App Router with minimal route files.

Application behavior is organized by domain inside:

```text
src/features/
```

Each feature owns its internal implementation and exposes an intentional public API.

```text
src/shared/
```

contains reusable, domain-agnostic code such as generic UI, hooks, helpers and HTTP infrastructure.

Read [client/README.md](client/README.md) for the complete frontend architecture, routing strategy, testing approach and available commands.

---

## Backend architecture

The backend organizes business domains inside:

```text
src/modules/
```

Business modules use a pragmatic Hexagonal / Clean Architecture:

```text
domain
application
infrastructure
```

The dependency direction is:

```text
infrastructure → application → domain
```

Application interacts with external capabilities through ports, while infrastructure provides the corresponding adapters.

Read [server/README.md](server/README.md) for modules, Prisma, HTTP contracts, health checks, testing and operational conventions.

---

## Getting started

### Requirements

- Node.js 22.12 or newer
- npm
- PostgreSQL for migrations and persistent backend operations

### 1. Clone the repository

```bash
git clone https://github.com/martinpanasci/modular-fullstack-starter.git
cd modular-fullstack-starter
```


### 2. Install the frontend

```bash
cd client
npm install
```

### 3. Install the backend

```bash
cd ../server
npm install
```

### 4. Configure local environments

Frontend:

```bash
cd client
cp .env.example .env.local
```

Backend:

```bash
cd server
cp .env.example .env
```

On PowerShell, `Copy-Item` can be used instead of `cp`.

### 5. Prepare Prisma

From `server/`:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

### 6. Start the frontend

From `client/`:

```bash
npm run dev
```

### 7. Start the backend

From `server/`:

```bash
npm run dev
```

The frontend API URL and backend port must point to the same local backend address.

Check:

```text
client/.env.example
server/.env.example
```

before starting integration work.

---

## Quality

Client and server provide their own scripts for:

- linting;
- type checking;
- tests;
- builds;
- formatting.

CI is separated by project:

```text
.github/workflows/frontend-ci.yml
.github/workflows/server-ci.yml
```

Run the quality checks from the project being modified.

There is intentionally no root command that runs both applications.

---

## Documentation

### Frontend

- [Frontend README](client/README.md)
- [Frontend agent rules](client/AGENTS.md)

### Backend

- [Backend README](server/README.md)
- [Backend agent rules](server/AGENTS.md)

### Monorepo

- [Cross-project documentation](docs/README.md)
- [Infrastructure](infra/README.md)
- [Shared packages](packages/README.md)

---

## What is intentionally not included

The starter does not include by default:

- authentication;
- JWT;
- Redis;
- BullMQ;
- queues;
- API versioning;
- rate limiting;
- cloud infrastructure;
- global frontend state management;
- Sentry;
- OpenTelemetry;
- Kafka;
- CQRS;
- event sourcing.

These capabilities should be introduced when a product actually requires them.

---

## Intended use

Clone the repository and adapt it to a concrete product.

The example frontend features and backend modules are educational references and may be removed.

The architecture is intended primarily for medium-sized business applications developed by small teams.

It is opinionated enough to provide consistency while remaining flexible enough to evolve with the product.

---

## License

MIT. See [LICENSE](LICENSE).

---

## Status

This repository is a reusable foundation, not a complete product application.