Plan autorizado por el autor el 2026-10-07 (tácito, ADR-008)

# Tasks 002 — publicacion

Última actualización: 2026-10-07

## Índice
- [Fases](#fases)

## Fases
Bloque 1 (fases 1–2): automático, un commit. Bloque 2 (fases 3–4): el autor. Bloque 3 (fase 5): automático, un commit.

- [x] Fase 1 — Script de verificación del despliegue · criterio: C1 suite en verde con las pruebas nuevas; C3 local `check-deploy --html out/index.html` sale con 0; C7 ≤ 500 000 B · número: C1 129/129 (4 nuevas), 10,1–11,4 s; C3 local código 0, `problems` vacío; C7 177 921 B de 500 000 · fecha: 2026-10-07 · commit: pendiente del autor
- [x] Fase 2 — Guía para el autor y revisión previa al push · criterio: 0 rutas de la carpeta sensible en `git ls-files` y en el historial; guía con clic o comando exacto por sección · número: 0 en `git ls-files` (66 rutas) y 0 en el historial (67 rutas únicas, 6 commits); guía con 15 de 15 secciones; red local con `-H <IP>` sin `allowedDevOrigins` · fecha: 2026-10-07 · commit: pendiente del autor
- [ ] Fase 3 — Publicar (autor) · criterio: C2 producción en «Ready» con candado · número: … · fecha: … · commit: no aplica
- [ ] Fase 4 — Verificar (autor) · criterio: C4 7 de 7 aplicables; C5 respaldo con 16 dígitos; C6 mediana ≥ 90 en 4 categorías; C7 en producción ≤ 500 000 B · número: … · fecha: … · commit: no aplica
- [ ] Fase 5 — Medir contra producción y cerrar · criterio: C1 en verde; C2 y C3 `check-deploy <url>` sale con 0; C7 · número: … · fecha: … · commit: …
