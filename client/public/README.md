# Public assets

Esta carpeta contiene archivos estáticos que Next.js sirve directamente desde la raíz del sitio, sin importarlos desde TypeScript o React.

Ejemplos:

```text
public/logo.svg        → /logo.svg
public/images/hero.jpg → /images/hero.jpg
public/robots.txt      → /robots.txt
```

Usá `public/` para recursos que necesitan una URL pública estable, como favicons, archivos descargables, imágenes referenciadas por URL o archivos de verificación.

Usá `src/assets/` cuando el recurso se importe desde el código y deba pasar por el pipeline de build.

No coloques aquí componentes React, código TypeScript, secretos, variables de entorno ni archivos generados por tests o builds.
