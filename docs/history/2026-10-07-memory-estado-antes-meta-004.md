# memory.md antes de la meta 004

Copia literal del 2026-10-07.

## Dónde estamos
Spec activo: specs/003-pagina-completa/
- Meta 003: bloque 1 (fases 1–2) hecho el 2026-10-07, sin commit. Página completa: barra superior, portada con cédulas, servicios, consultorios con «Cómo llegar», cita, pago con etiquetas, pie y botón flotante.
- Meta 002 cerrada el 2026-10-07: producción en https://dentista-jose.vercel.app, Android 7 de 7, respaldo en «sí». C6 pospuesto (ADR-012).
- Meta 001 cerrada: `b5234c8`, `2ebaf76`. Etapa 2 cerrada: `6921fce`.

## Siguiente
1. Commit `8e089a5` hecho (cierre 002 + bloque 1 de la 003). Falta el push de `master` y el commit del refuerzo de `check-deploy`. Vercel publica solo.
2. Fase 3 de la 003 (autor): revisar la página en el teléfono y tocar «Cómo llegar» de Tula y Pachuca (M7).
3. Después se corre `check-deploy` contra producción y se cierra la 003.
- Después: 004 marca (logotipo, fuente, vista previa al compartir, Lighthouse) · 005 datos reales.
- En paralelo: el autor lanza a `pruebas` sobre 001.
- Se trabaja por bloques (ADR-003). El commit del autor equivale a «sigue» (P2).

## Pendientes del autor
- Commit y push del cierre 002 + bloque 1 de la 003.
- Revisar en el teléfono la página nueva y los dos «Cómo llegar» (M7).
- Revisar los textos nuevos de `src/content/dentist.ts` (clarify 003 #4).
- Decir qué cédula va con qué título (M9) y dar el correo del dentista (A8).
- Leer las reglas del plan Hobby de Vercel antes de anunciar la página (A7).
- Decidir qué hacer con `AGENTS.md` (B8).
- Lanzar al agente `pruebas` sobre la meta 001.
- Conseguir la CLABE (A1) y los horarios reales (A2).

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

