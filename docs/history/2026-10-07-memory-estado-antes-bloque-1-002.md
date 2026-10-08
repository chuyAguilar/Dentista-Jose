# Copia literal — memory.md y CONTEXT.md antes del bloque 1 de la meta 002

Copiado el 2026-10-07. No se edita.

## Dónde estamos
Spec activo: specs/002-publicacion/
- Meta 002: spec en borrador, esperando la aprobación del autor.
- Meta 001 cerrada: bloque 1 `b5234c8`, cierre `2ebaf76`, paridad 7 de 7. Falta la prueba del agente `pruebas`.
- Etapa 2 cerrada. Commits: 2.1 `ef995f0`, 2.2 `22f72ab`, 2.3 `9bd0223`, bloque 2.4–2.10 `6921fce`.

## Siguiente
Orden del autor (fijado el 2026-10-07 con el commit `2ebaf76`, orden recomendado):
1. 002 — Publicación: Vercel, Android 9 de 9, Lighthouse ≥ 90 (A4, A5, M4).
2. 003 — Secciones completas: cédulas, servicios, consultorios con mapas, horarios provisionales, correo (M6).
3. 004 — Diseño y marca: paleta, tipografía, ícono, metadatos (M5).
4. 005 — Datos reales: CLABE y horarios por consultorio (A1, A2), cuando lleguen.
- En paralelo: el autor lanza a `pruebas` sobre 001 (`Claude outputs/pruebas/001-esqueleto-caminante/encargo.md`).
- Se trabaja por bloques (ADR-003).
- El commit del autor equivale a «sigue» (P2).

## Pendientes del autor
- Aprobar o corregir `specs/002-publicacion/spec.md`.
- Lanzar al agente `pruebas` sobre la meta 001.
- Crear una cuenta de Vercel cuando el plan 002 lo pida (se enseña paso a paso).
- Conseguir la CLABE de BBVA (A1).
- Conseguir los horarios reales y su reparto por consultorio (A2).
- Aprobar las etiquetas de los datos de pago (M6), en la meta 002.

## Cómo se verifica hoy
- Suite completa: `npm test` (timeout 300 000 ms). `pretest` corre `next build` antes (ADR-007).
- Solo el arnés: `npm run test:harness` (timeout 120 000 ms). No construye.
- Solo el build: `npm run build`. Solo el peso: `npm run weight` (después del build).
- Resultado al cerrar el bloque 1 de la 001: 125/125 en verde. `npm test` tarda 8,5–9,6 s en total (build ≈ 5,5 s + Vitest ≈ 3 s). Build en frío (sin `.next/`): 7–19 s.
- Peso C7: 177 917–177 922 B gzip de 500 000 (5 builds).

## CONTEXT.md — Trabajo en curso
- Meta 001, esqueleto caminante: cerrada (`b5234c8`, `2ebaf76`). Falta la prueba del agente `pruebas`.
- Meta 002, publicación: spec en borrador.
- Orden fijado: 002 publicación · 003 secciones · 004 diseño · 005 datos reales.
- Etapa 2 (arnés) cerrada. Commit del bloque: `6921fce`.
