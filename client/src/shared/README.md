# Shared

Contiene piezas transversales, reutilizables y sin dueño de dominio. `shared` nunca depende de `features`.

- `ui`: componentes genéricos como Header, Footer y SkipLink.
- `api`: cliente `fetch` e infraestructura HTTP común; los endpoints concretos pertenecen a una feature.
- `config`: configuración global y variables de entorno tipadas.
- `lib`: utilidades puras y agnósticas al negocio.
- `types`: contratos verdaderamente globales.
- `hooks`: hooks útiles para varios dominios, sólo cuando aparezca una necesidad real.

Que algo se use dos veces no alcanza para moverlo aquí. Si deja de tener sentido al borrar el dominio que lo originó, debe permanecer en esa feature. No coloques reglas de producto, endpoints específicos ni UI de un dominio en `shared`.
