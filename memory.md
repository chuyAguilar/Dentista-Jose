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
Spec activo: specs/002-publicacion/
- Meta 002: bloque 1 (fases 1–2) hecho el 2026-10-07, sin commit. `scripts/check-deploy.mjs` con 4 pruebas; guía en `Claude outputs/002-publicacion/guia-publicar.md`.
- Spec, plan y clarify 002 aprobados en tácito (ADR-008). ADR-009 a ADR-011 registrados.
- Meta 001 cerrada: bloque 1 `b5234c8`, cierre `2ebaf76`, paridad 7 de 7. Falta la prueba del agente `pruebas`.
- Etapa 2 cerrada. Commits: 2.1 `ef995f0`, 2.2 `22f72ab`, 2.3 `9bd0223`, bloque 2.4–2.10 `6921fce`.

## Siguiente
1. El autor hace el commit del bloque 1 de la 002 (título y `git add` en `Claude outputs/002-publicacion/bloque-1.md`).
2. Bloque 2 (fases 3 y 4), del autor: sigue `Claude outputs/002-publicacion/guia-publicar.md`. Publica en GitHub privado y Vercel, prueba en Android y corre PageSpeed. Devuelve la tabla de la sección 14.
3. Bloque 3 (fase 5), automático: medir contra producción y cerrar la meta.
- Después: 003 secciones · 004 diseño · 005 datos reales.
- En paralelo: el autor lanza a `pruebas` sobre 001 (`Claude outputs/pruebas/001-esqueleto-caminante/encargo.md`).
- Se trabaja por bloques (ADR-003). El commit del autor equivale a «sigue» (P2).

## Decisiones abiertas
- Ninguna sin entrada. Ver BACKLOG: A1 (CLABE), A2 (horarios reales), A3 (iPhone), M3 (escritura por Bash).

## Pendientes del autor
- Commit del bloque 1 de la 002.
- Fases 3 y 4 según la guía: cuenta de GitHub, repositorio privado, renombrar la rama a `main` (hoy es `master`), subir, cuenta de Vercel, prueba en Android y PageSpeed.
- Leer las reglas vigentes del plan Hobby de Vercel antes de anunciar la página (A7).
- Decidir qué hacer con el `AGENTS.md` que crea `next dev` (B8).
- Lanzar al agente `pruebas` sobre la meta 001.
- Conseguir la CLABE de BBVA (A1).
- Conseguir los horarios reales y su reparto por consultorio (A2).
- Aprobar las etiquetas de los datos de pago (M6), en la meta 003.

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
- Resultado al cerrar el bloque 1 de la 002: 129/129 en verde. `npm test` tarda 10,1–11,4 s en total (Vitest ≈ 3,2–3,3 s). Arnés: 96/96.
- Peso C7: 177 921 B gzip de 500 000.
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
