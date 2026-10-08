# memory.md y CONTEXT.md antes de la meta 003

Copia literal del 2026-10-07.

## memory.md

## Dónde estamos
Spec activo: specs/002-publicacion/
- Meta 002: publicada en https://dentista-jose.vercel.app (bloque 1 `f168803`). Android 7 de 7 y respaldo del copiado en «sí». Bloque 3 medido el 2026-10-07, sin commit. Solo falta C6 (Lighthouse).
- Meta 001 cerrada: bloque 1 `b5234c8`, cierre `2ebaf76`, paridad 7 de 7. Falta la prueba del agente `pruebas`.
- Etapa 2 cerrada. Commits: 2.1 `ef995f0`, 2.2 `22f72ab`, 2.3 `9bd0223`, bloque 2.4–2.10 `6921fce`.

## Siguiente
1. El autor corre PageSpeed Insights (móvil, 3 corridas) sobre la URL de producción y da los 4 puntajes medianos y el «Total byte weight». La API sin clave dio 429 (cuota diaria agotada).
2. Con esos números: marcar fases 4 y 5, cerrar A4 (o abrir A6 si una categoría queda bajo 90), escribir el encargo de pruebas 002 y proponer el commit del bloque 3.
- Después: 003 secciones · 004 diseño · 005 datos reales.
- En paralelo: el autor lanza a `pruebas` sobre 001 (`Claude outputs/pruebas/001-esqueleto-caminante/encargo.md`).
- Se trabaja por bloques (ADR-003). El commit del autor equivale a «sigue» (P2).

## Pendientes del autor
- Los 4 puntajes de PageSpeed móvil (mediana de 3) y el «Total byte weight» (C6, A4).
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
- Resultado del bloque 3 de la 002 (2026-10-07): 129/129 en verde, Vitest 3,17 s. Arnés: 96/96.
- Producción (C2, C3): `check-deploy https://dentista-jose.vercel.app --json` sale con 0.
- Peso C7: 177 923 B gzip de 500 000.
- Lighthouse (C6): PageSpeed Insights en el navegador. La API `runPagespeed` sin clave comparte cuota diaria y puede dar 429.
- Revisión previa a la subida (P1): 0 rutas de la carpeta sensible en `git ls-files` y 0 en `git log --all --name-only --format=` (2026-10-07).

## CONTEXT.md

## Trabajo en curso
- Meta 001, esqueleto caminante: cerrada (`b5234c8`, `2ebaf76`). Falta la prueba del agente `pruebas`.
- Meta 002, publicación: en producción en https://dentista-jose.vercel.app desde `main`. Android 7 de 7 y respaldo en «sí». Falta C6 (Lighthouse) para cerrar.
- Orden fijado: 002 publicación · 003 secciones · 004 diseño · 005 datos reales.
- Etapa 2 (arnés) cerrada. Commit del bloque: `6921fce`.
