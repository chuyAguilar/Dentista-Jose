# memory.md — estado vivo

Última actualización: 2026-10-07
Tope: 12 KB. Lo que sale de aquí se copia literal a `docs/history/`.

## Índice
- [Dónde estamos](#dónde-estamos)
- [Siguiente](#siguiente)
- [Decisiones abiertas](#decisiones-abiertas)
- [Pendientes del autor](#pendientes-del-autor)
- [Bloqueado](#bloqueado)
- [Datos de referencia](#datos-de-referencia)
- [Cómo se verifica hoy](#cómo-se-verifica-hoy)
- [Trampas conocidas](#trampas-conocidas)

## Dónde estamos
Spec activo: specs/005-pulido/
- Meta 005: hecha el 2026-10-07, sin commit. Pasos para agendar, B6 y B8.
- Metas 003 (`8e089a5`, `3caa260`) y 004 (`5c5aba9`): en git, sin push. Producción sigue con la versión de la 002.
- Meta 002 cerrada (C6 pospuesto, ADR-012). Meta 001 cerrada. Etapa 2 cerrada.

## Siguiente
1. El autor hace el commit de la 005 y `git push origin master` (sube 003, 004 y 005).
2. Con el push: `check-deploy` contra producción.
3. El autor hace su prueba completa (teléfono, «Cómo llegar», vista previa en WhatsApp, PageSpeed) y se corrige lo que salga.
- Después: 006 datos reales (A1 CLABE, A2 horarios, A8 correo, A9 logotipo, M9 cédulas).
- En paralelo: el autor lanza a `pruebas` sobre 001.
- Se trabaja por bloques (ADR-003). El commit del autor equivale a «sigue» (P2).

## Decisiones abiertas
- Ninguna sin entrada. Ver BACKLOG: A1 (CLABE), A2 (horarios reales), A3 (iPhone), M3 (escritura por Bash).

## Pendientes del autor
- Commit de la 005 y `git push origin master`.
- Prueba completa en el teléfono: página, dos «Cómo llegar» (M7), vista previa al compartir, PageSpeed (A4).
- Revisar los textos de `src/content/dentist.ts`, incluidos los pasos.
- Datos: CLABE (A1), horarios (A2), correo (A8), logotipo en `public/` (A9), qué cédula es cuál (M9).
- Plan de Vercel antes de anunciar (A7). Lanzar `pruebas` sobre 001.

## Bloqueado
- Nada.

## Datos de referencia
Solo por id. Los originales están en `info/` y ningún agente los lee (P1).
- REF-01: tarjeta de presentación azul, frente (nombre, cédulas, teléfono, correo).
- REF-02: tarjeta de presentación azul, reverso (servicios, dos direcciones).
- REF-03: tarjeta impresa «Integración Dental» (dirección de Tula, teléfono, correo).
- REF-04: tarjeta impresa con logotipo (nombre, especialidad).
- REF-05: nota a mano con datos bancarios (BBVA, titular). Es número de tarjeta, no CLABE.

## Cómo se verifica hoy
- Suite completa: `npm test` (timeout 300 000 ms). `pretest` corre `next build` antes (ADR-007).
- Solo el arnés: `npm run test:harness` (timeout 120 000 ms). No construye.
- Solo el build: `npm run build`. Solo el peso: `npm run weight` (después del build).
- Despliegue (C2, C3): `npm run check-deploy -- <url>`. `precheck-deploy` construye antes. Sin red: `node scripts/check-deploy.mjs --html out/index.html --json`.
- Resultado de la 005 (2026-10-07): 152/152 en verde, Vitest 3,33 s. Arnés: 96/96.
- Producción: `check-deploy` sale con 1 mientras falte el push (versión vieja detectada por la lista de enlaces).
- Peso: 212 542 B gzip de 500 000 (la fuente suma unos 30 KB).
- Capturas: Edge sin ventana tiene ancho mínimo de 492 px. Para ver 360 px, la página va dentro de un iframe de 360 px.
- Lighthouse (C6): PageSpeed Insights en el navegador, al cerrar la 004 (ADR-012). La API sin clave puede dar 429.
- Revisión previa a la subida (P1): 0 rutas de la carpeta sensible en `git ls-files` y 0 en `git log --all --name-only --format=` (2026-10-07).

## Trampas conocidas
- El número de REF-05 tiene 16 dígitos: es tarjeta. Una CLABE tiene 18 y en BBVA empieza con 012.
- `vitest.config` va con extensión `.mts`. Con `.ts`, Vite avisa que carga ESM como CommonJS.
- `npm ls` marca `@img/sharp-wasm32` y `@emnapi/runtime` como «extraneous» (B2).
- TypeScript va fijo en 5.9.3 (B1).
- Los hooks fallan cerrado: si `guard.mjs` se rompe, se niegan todas las herramientas. Se arregla editando el archivo a mano, fuera de Claude.
- Un hook que termina con código distinto de 0 y de 2 deja pasar la herramienta. Por eso cada hook va con `|| exit 2`.
- `direccion` no puede editar `.claude/` ni la constitución. El mantenimiento del arnés se hace en una sesión normal (`claude`, sin `--agent`).
- `npm info` está negado por el hook (B4). Usar `npm view`.
- `next build` reescribe `tsconfig.json` si falta `"jsx": "react-jsx"` o `.next/dev/types/**/*.ts` en `include`. Ya están; no quitarlos.
- El peso de C7 varía unos bytes entre builds (177 917–177 922): el id del build cambia de largo.
- Red local: `npm run dev -- -H <IP>`. Con `-H 0.0.0.0` o sin `-H`, Next 16.4 responde 403 a sus recursos de desarrollo pedidos desde otra dirección.
- En Windows, salir con `process.exit` tras un `fetch` puede romper libuv (código 127). `check-deploy.mjs` usa `process.exitCode`.
- En la herramienta Bash, un heredoc puede perder o convertir las barras invertidas (`\b` salió como el byte 0x08). Código con `\`: editar con Edit o Write, no con heredoc.
- `check-deploy` compara también la lista de enlaces `https:` y `tel:`. Con solo WhatsApp y tarjeta, una versión vieja en producción pasaba con 0.
