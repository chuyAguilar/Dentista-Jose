# memory.md antes de la meta 005

Copia literal del 2026-10-07.

## Dónde estamos
Spec activo: specs/004-marca/
- Meta 004: fase 1 hecha el 2026-10-07, sin commit. Fuente Plus Jakarta Sans, ícono SVG, color de tema, Open Graph con `og.png`.
- Meta 003: código en `8e089a5` y refuerzo de `check-deploy` en `3caa260`. Sin push: producción sigue con la versión de la 002. Falta su fase 3 (revisión en el teléfono).
- Meta 002 cerrada (C6 pospuesto, ADR-012). Meta 001 cerrada. Etapa 2 cerrada.

## Siguiente
1. El autor hace el commit de la 004 y el push de `master` (sube 003 y 004 juntas).
2. Con el push: `check-deploy` contra producción (C6 de la 003, C4 de la 004).
3. El autor revisa en el teléfono, toca los dos «Cómo llegar» (M7), comparte el enlace por WhatsApp (C5) y corre PageSpeed (C6, A4).
- Después: 005 datos reales (A1 CLABE, A2 horarios, A8 correo, A9 logotipo, M9 cédulas).
- En paralelo: el autor lanza a `pruebas` sobre 001.
- Se trabaja por bloques (ADR-003). El commit del autor equivale a «sigue» (P2).

## Pendientes del autor
- Commit de la 004 y `git push origin master`.
- En el teléfono: revisar la página, los dos «Cómo llegar» (M7) y la vista previa al compartir por WhatsApp.
- PageSpeed móvil, mediana de 3: cuatro puntajes (A4).
- Revisar los textos nuevos de `src/content/dentist.ts`.
- Datos: CLABE (A1), horarios (A2), correo (A8), logotipo en `public/` (A9), qué cédula es cuál (M9).
- Plan de Vercel antes de anunciar (A7). `AGENTS.md` (B8). Lanzar `pruebas` sobre 001.

## Cómo se verifica hoy
- Suite completa: `npm test` (timeout 300 000 ms). `pretest` corre `next build` antes (ADR-007).
- Solo el arnés: `npm run test:harness` (timeout 120 000 ms). No construye.
- Solo el build: `npm run build`. Solo el peso: `npm run weight` (después del build).
- Despliegue (C2, C3): `npm run check-deploy -- <url>`. `precheck-deploy` construye antes. Sin red: `node scripts/check-deploy.mjs --html out/index.html --json`.
- Resultado de la fase 1 de la 004 (2026-10-07): 150/150 en verde, Vitest 4,99 s. Arnés: 96/96.
- Producción: `check-deploy` sale con 1 mientras falte el push (versión vieja detectada por la lista de enlaces).
- Peso: 212 203 B gzip de 500 000 (la fuente suma unos 30 KB).
- Capturas: Edge sin ventana tiene ancho mínimo de 492 px. Para ver 360 px, la página va dentro de un iframe de 360 px.
- Lighthouse (C6): PageSpeed Insights en el navegador, al cerrar la 004 (ADR-012). La API sin clave puede dar 429.
- Revisión previa a la subida (P1): 0 rutas de la carpeta sensible en `git ls-files` y 0 en `git log --all --name-only --format=` (2026-10-07).

