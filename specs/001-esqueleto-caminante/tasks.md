Plan autorizado por el autor el 2026-10-07

# Tasks 001 — esqueleto-caminante

Última actualización: 2026-10-07

## Índice
- [Fases](#fases)

## Fases
Bloque 1 (fases 1–4): un commit. Bloque 2 (fase 5): el autor. C8 pasó a la meta 002 (clarify #1).

- [x] Fase 1 — Contenido · criterio: C2 automático (campos exactos, 16 dígitos, Luhn) · número: 7/7 pruebas de contenido; 16 dígitos; Luhn válido; suite 104/104 · fecha: 2026-10-07 · commit: b5234c8
- [x] Fase 2 — Lógica · criterio: C3 enlace exacto, C4 16 dígitos copiados, respaldo → "fallback" · número: C3 igual carácter por carácter; C4 16 de 16 dígitos sin espacios; respaldo 3 de 3 casos (ausente, rechaza, lanza); suite 120/120 · fecha: 2026-10-07 · commit: b5234c8
- [x] Fase 3 — Exportación estática y página · criterio: C5 build con código 0 y `out/index.html` existe · número: código 0; `out/index.html` 7 235 B; suite 120/120 · fecha: 2026-10-07 · commit: b5234c8
- [x] Fase 4 — HTML final y peso · criterio: C6 enlace y tarjeta en `out/index.html`, C7 ≤ 500 000 B gzip · número: C6 enlace en `href` y tarjeta agrupada como un solo nodo; C7 177 917–177 922 B gzip en 5 builds (9 archivos; el id del build cambia de largo); suite 125/125 con build · fecha: 2026-10-07 · commit: b5234c8
- [x] Fase 5 — Verificación del autor · criterio: C2 firmado, 7 de 7 campos en `/paridad-tarjeta` · número: 7 de 7 «sí» (hoja `Claude outputs/paridad/2026-10-07.md`) · fecha: 2026-10-07 · commit: no aplica
