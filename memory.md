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
Spec activo: specs/003-pagina-completa/
- Meta 003: bloque 1 (fases 1–2) hecho el 2026-10-07, sin commit. Página completa: barra superior, portada con cédulas, servicios, consultorios con «Cómo llegar», cita, pago con etiquetas, pie y botón flotante.
- Meta 002 cerrada el 2026-10-07: producción en https://dentista-jose.vercel.app, Android 7 de 7, respaldo en «sí». C6 pospuesto (ADR-012).
- Meta 001 cerrada: `b5234c8`, `2ebaf76`. Etapa 2 cerrada: `6921fce`.

## Siguiente
1. El autor hace el commit (cierre 002 + bloque 1 de la 003) y el push. Vercel publica solo.
2. Fase 3 de la 003 (autor): revisar la página en el teléfono y tocar «Cómo llegar» de Tula y Pachuca (M7).
3. Después se corre `check-deploy` contra producción y se cierra la 003.
- Después: 004 marca (logotipo, fuente, vista previa al compartir, Lighthouse) · 005 datos reales.
- En paralelo: el autor lanza a `pruebas` sobre 001.
- Se trabaja por bloques (ADR-003). El commit del autor equivale a «sigue» (P2).

## Decisiones abiertas
- Ninguna sin entrada. Ver BACKLOG: A1 (CLABE), A2 (horarios reales), A3 (iPhone), M3 (escritura por Bash).

## Pendientes del autor
- Commit y push del cierre 002 + bloque 1 de la 003.
- Revisar en el teléfono la página nueva y los dos «Cómo llegar» (M7).
- Revisar los textos nuevos de `src/content/dentist.ts` (clarify 003 #4).
- Decir qué cédula va con qué título (M9) y dar el correo del dentista (A8).
- Leer las reglas del plan Hobby de Vercel antes de anunciar la página (A7).
- Decidir qué hacer con `AGENTS.md` (B8).
- Lanzar al agente `pruebas` sobre la meta 001.
- Conseguir la CLABE (A1) y los horarios reales (A2).

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
- Resultado del bloque 1 de la 003 (2026-10-07): 147/147 en verde, Vitest 3,45 s. Arnés: 96/96.
- Producción (C2, C3 de la 002): `check-deploy https://dentista-jose.vercel.app --json` salió con 0 el 2026-10-07.
- Peso: 182 801 B gzip de 500 000.
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
- `next dev` crea `AGENTS.md` en la raíz (B8). No entra a git sin decisión del autor.
- Red local: `npm run dev -- -H <IP>`. Con `-H 0.0.0.0` o sin `-H`, Next 16.4 responde 403 a sus recursos de desarrollo pedidos desde otra dirección.
- En Windows, salir con `process.exit` tras un `fetch` puede romper libuv (código 127). `check-deploy.mjs` usa `process.exitCode`.
