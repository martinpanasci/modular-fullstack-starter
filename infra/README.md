# Infrastructure

Espacio para Infrastructure as Code y configuración de deployment cuando un proyecto concreto la requiera. El starter no depende de un proveedor cloud ni instala tooling de infraestructura.

Aquí podrían vivir recursos para:

- networking;
- compute;
- databases;
- storage y CDN;
- infraestructura de secrets;
- monitoring;
- recursos de deployment.

Una implementación futura podría usar AWS CDK, Terraform u otra herramienta específica del proveedor elegido. No agregues recursos cloud hasta que exista una necesidad real.

La infraestructura de despliegue no debe mezclarse dentro de `server/`. Nunca hardcodees secretos, credenciales ni valores sensibles en código de IaC.
