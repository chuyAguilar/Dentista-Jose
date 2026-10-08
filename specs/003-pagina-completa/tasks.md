Plan autorizado por el autor el 2026-10-07 (tácito, ADR-008)

# Tasks 003 — página completa

Última actualización: 2026-10-07

## Índice
- [Fases](#fases)

## Fases
Bloque 1 (fases 1–2): automático, un commit. Fase 3: el autor.

- [x] Fase 1 — Contenido y lógica · criterio: C2 y `maps-phone` en verde · número: 147/147 (18 nuevas), Vitest 3,45 s · fecha: 2026-10-07 · commit: pendiente del autor
- [x] Fase 2 — Página y diseño · criterio: C3 en verde; C4 sin cortes a 360 y 1280 px; C5 ≤ 500 000 B · número: C3 3 pruebas nuevas en verde; C4 capturas sin cortes ni scroll horizontal; C5 182 801 B de 500 000; `check-deploy --html out/index.html` código 0 · fecha: 2026-10-07 · commit: `8e089a5`
  - Refuerzo: `check-deploy` compara también la lista de enlaces; 148/148; contra producción sin push sale con 1 (versión vieja detectada) · fecha: 2026-10-07 · commit: pendiente del autor
- [ ] Fase 3 — Push y revisión en el teléfono (autor) · criterio: C6 `check-deploy https://dentista-jose.vercel.app` sale con 0 · número: … · fecha: … · commit: no aplica
