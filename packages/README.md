# Packages

Reservado para paquetes internos realmente compartidos dentro del monorepo. Posibles usos futuros:

- configuración TypeScript compartida;
- configuración ESLint compartida;
- contratos que sean verdaderamente comunes a client y server;
- tipos de API generados;
- librerías internas reutilizables.

No muevas código aquí solamente porque se utiliza en dos lugares. Compartir lógica de negocio entre client y server puede crear acoplamiento indebido y ownership confuso.

No crees paquetes vacíos preventivamente. Hasta que exista una necesidad concreta, este README es el único contenido necesario.
