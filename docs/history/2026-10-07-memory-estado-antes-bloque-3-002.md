# memory.md y CONTEXT.md antes del bloque 3 de la meta 002

Copia literal del 2026-10-07.

## memory.md

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

## Pendientes del autor
- Commit del bloque 1 de la 002.
- Fases 3 y 4 según la guía: cuenta de GitHub, repositorio privado, renombrar la rama a `main` (hoy es `master`), subir, cuenta de Vercel, prueba en Android y PageSpeed.
- Leer las reglas vigentes del plan Hobby de Vercel antes de anunciar la página (A7).
- Decidir qué hacer con el `AGENTS.md` que crea `next dev` (B8).
- Lanzar al agente `pruebas` sobre la meta 001.
- Conseguir la CLABE de BBVA (A1).
- Conseguir los horarios reales y su reparto por consultorio (A2).
- Aprobar las etiquetas de los datos de pago (M6), en la meta 003.

## Cómo se verifica hoy
- Suite completa: `npm test` (timeout 300 000 ms). `pretest` corre `next build` antes (ADR-007).
- Solo el arnés: `npm run test:harness` (timeout 120 000 ms). No construye.
- Solo el build: `npm run build`. Solo el peso: `npm run weight` (después del build).
- Despliegue (C2, C3): `npm run check-deploy -- <url>`. `precheck-deploy` construye antes. Sin red: `node scripts/check-deploy.mjs --html out/index.html --json`.
- Resultado al cerrar el bloque 1 de la 002: 129/129 en verde. `npm test` tarda 10,1–11,4 s en total (Vitest ≈ 3,2–3,3 s). Arnés: 96/96.
- Peso C7: 177 921 B gzip de 500 000.
- Revisión previa a la subida (P1): 0 rutas de la carpeta sensible en `git ls-files` y 0 en `git log --all --name-only --format=` (2026-10-07).

## CONTEXT.md

## Trabajo en curso
- Meta 001, esqueleto caminante: cerrada (`b5234c8`, `2ebaf76`). Falta la prueba del agente `pruebas`.
- Meta 002, publicación: bloque 1 (fases 1–2) hecho el 2026-10-07, sin commit. Siguen las fases 3 y 4, del autor, con la guía `Claude outputs/002-publicacion/guia-publicar.md`.
- Orden fijado: 002 publicación · 003 secciones · 004 diseño · 005 datos reales.
- Etapa 2 (arnés) cerrada. Commit del bloque: `6921fce`.
