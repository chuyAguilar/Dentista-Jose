# Clarify 002 — publicación

Última actualización: 2026-10-07

## Índice
- [Preguntas](#preguntas)

## Preguntas
Vienen de `plan.md`, sección «Preguntas abiertas». La respuesta la escribe `direccion` con las palabras del autor. Con ADR-008 avanza la recomendada, que va primero.

| # | Pregunta | Opciones (recomendada primero) | Respuesta del autor | Fecha |
|---|---|---|---|---|
| 1 | ¿Dónde vive el remoto y cómo publica Vercel? | (a) GitHub privado + integración Git de Vercel; publica en cada push, vista previa por rama, el push sigue siendo del autor · (b) GitHub público; expone arnés y pruebas sin necesidad · (c) CLI de Vercel sin remoto; token local, sin vista previa automática | (a), tácito (ADR-008) | 2026-10-07 |
| 2 | ¿Cómo se mide Lighthouse? | (a) PageSpeed Insights Móvil sobre producción, mediana de tres corridas; cero dependencias · (b) paquete `lighthouse` por línea de comandos · (c) Lighthouse de las DevTools de Chrome en la PC | (a), tácito (ADR-008) | 2026-10-07 |
| 3 | ¿Hace falta configuración en el repo? | (a) Ninguna; Install Command `npm ci` y Node 24.x en el panel de Vercel, anotados en ADR-009; los encabezados no suben el puntaje · (b) `vercel.json` con Install Command y encabezados; pide cambiar `role-guard.mjs` · (c) nada, y aceptar `npm install` | (a), tácito (ADR-008) | 2026-10-07 |
| 4 | ¿Qué pasa si una categoría queda < 90? | (a) Se corrige aquí solo si no cambia texto visible ni estilos (metadatos, atributos, configuración); lo demás a A6, meta 004 · (b) todo al BACKLOG · (c) todo en esta meta | (a), tácito (ADR-008) | 2026-10-07 |
| 5 | ¿Cómo se fuerza el respaldo del copiado (C5)? | (a) Red local por HTTP con `npm run dev -- -H 0.0.0.0`; si Next 16.4 bloquea el origen, `allowedDevOrigins` solo para desarrollo, previo aviso · (b) servir `out/` por la red local con un script propio · (c) parámetro de prueba en producción (descartada) | (a), tácito (ADR-008) | 2026-10-07 |
| 6 | ¿En cuántas fases y bloques se divide la meta? | (a) 5 fases en 3 bloques: 1–2 automático, 3–4 del autor, 5 automático · (b) 4 bloques, con publicar y verificar separados | (a), tácito (ADR-008) | 2026-10-07 |
| 7 | ¿Qué se hace con los pasos 7 y 8 de `/prueba-android` («Cómo llegar»)? | (a) «No aplica (meta 003)»; C4 = 7 de 7 aplicables; M7 los retoma; `direccion` corrige C4 en `spec.md` · (b) adelantar los mapas (rompe P4) · (c) dejar C4 abierto hasta la 003 | (a), tácito (ADR-008) | 2026-10-07 |
| 8 | ¿Cómo se prueba `check-deploy.mjs`? | (a) Funciones exportadas del `.mjs`; la prueba lo corre como proceso hijo con `--html`, sin red, como ADR-005 · (b) lógica en `src/lib/deploy-check.ts` importada por Node con eliminación de tipos · (c) `.mjs` con archivo de tipos `.d.mts` | (a), tácito (ADR-008) | 2026-10-07 |
| 9 | ¿Qué versión de Node usa Vercel? | (a) `engines.node` = `"24.x"` y Node 24.x en el panel · (b) dejar `">=24.0.0"` y fijarla solo en el panel | (a), tácito (ADR-008) | 2026-10-07 |
| 10 | ¿Cómo se comprueba la vista previa? | (a) El commit de cierre va a la rama `cierre-002`; Preview en Ready; luego `git merge --ff-only` y push · (b) rama de prueba con commit vacío, borrada después · (c) no se comprueba | (a), tácito (ADR-008) | 2026-10-07 |
| 11 | ¿Dónde vive la guía para el autor? | (a) `Claude outputs/002-publicacion/guia-publicar.md`, fuera de git · (b) `docs/guia-publicar.md`, versionada; pide cambiar `role-guard.mjs` | (a), tácito (ADR-008) | 2026-10-07 |
| 12 | ¿Qué plan de Vercel se usa? | (a) Hobby mientras la página no se anuncia a pacientes; A7 decide el plan antes del lanzamiento · (b) Pro desde ahora, con costo mensual · (c) otro proveedor con uso comercial gratis; cambia ADR-002 | (a), tácito (ADR-008) | 2026-10-07 |
