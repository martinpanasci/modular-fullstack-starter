# Assets

Esta carpeta contiene recursos que el código importa y que pasan por el pipeline de build, por ejemplo imágenes, íconos o fuentes usados desde componentes.

Usá `public/` cuando un archivo deba servirse directamente por una URL estable como `/robots.txt` o `/images/logo.svg`. No dupliques un recurso en ambos lugares ni guardes aquí componentes React, estilos globales o archivos generados.

Ejemplos:

```text
src/assets/illustration.png  → import illustration from '@/assets/illustration.png'
public/brand.svg             → <img src="/brand.svg" alt="..." />
```
