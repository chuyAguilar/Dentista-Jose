# Clarify 001 — esqueleto caminante

Última actualización: 2026-10-07

## Índice
- [Preguntas](#preguntas)

## Preguntas
Vienen de `plan.md`, sección «Preguntas abiertas». La respuesta la escribe `direccion` con las palabras del autor.

| # | Pregunta | Opciones (recomendada primero) | Respuesta del autor | Fecha |
|---|---|---|---|---|
| 1 | ¿Cómo prueba el autor en Android? | (a) `npm run dev` + USB con reenvío de puertos de Chrome; localhost es contexto seguro y el copiado funciona · (b) `next dev -H 0.0.0.0` + bandera de Chrome para tratar la IP como segura · (c) red local sin más; copiar siempre cae al respaldo y C8 no pasa · (d) vista previa en Vercel; adelanta la meta 002 | (d) Esperar a Vercel. C8 pasa a la meta 002, con HTTPS real. | 2026-10-07 |
| 2 | ¿Cómo se mide C7? | (a) Script propio que suma gzip de `out/index.html` y sus recursos · (b) Lighthouse ya en esta meta | (a) | 2026-10-07 |
| 3 | ¿Hacen falta pruebas de componente para «Copiar»? | (a) No: lógica en `src/lib/` con Vitest + prueba en Android · (b) Sí: Testing Library con jsdom | (a). La prueba en Android va en la meta 002. | 2026-10-07 |
| 4 | ¿Cuál es el mensaje de WhatsApp? | (a) «Hola, doctor. Quiero agendar una cita.» · (b) otro texto del autor | (a) | 2026-10-07 |
| 5 | ¿Qué pasa si el navegador no deja copiar? | (a) Campo seleccionado con los 16 dígitos sin espacios + «Mantén presionado para copiar» · (b) el número agrupado queda seleccionable; se copiaría con espacios · (c) `document.execCommand('copy')`, obsoleto | (a) | 2026-10-07 |
| 6 | ¿En cuántas fases y bloques se divide la meta? | (a) 5 fases en 2 bloques: 1–4 automático, 5 del autor · (b) 3 bloques: contenido y lógica · página y medición · autor | (a). El bloque 2 queda solo con /paridad-tarjeta. | 2026-10-07 |
| 7 | ¿Qué significa «500 KB»? | (a) 500 000 bytes gzip, la más estricta · (b) 512 000 bytes (500 × 1024) | (a) | 2026-10-07 |
| 8 | ¿`npm test` corre el build antes? | (a) Sí, con `pretest` que corre `next build` · (b) No: script aparte `npm run verify`, y `npm test` falla si falta `out/` | (a) | 2026-10-07 |
| 9 | ¿Qué textos lleva la página? | (a) «Agenda tu cita», «Escríbeme por WhatsApp», «Datos para tu pago», «Copiar», «Copiado», «Mantén presionado para copiar» · (b) los cambia el autor | (a) | 2026-10-07 |
| 10 | ¿La prueba de C2 revisa el dígito verificador de la tarjeta (Luhn)? | (a) Sí · (b) No | (a) | 2026-10-07 |
| 11 | ¿Se borra `tests/smoke.test.ts`? | (a) Sí, en la fase 4 · (b) Se deja | (a) | 2026-10-07 |
