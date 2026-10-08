# Clarify 004 — marca

Última actualización: 2026-10-07

## Índice
- [Preguntas](#preguntas)

## Preguntas
Con ADR-008 avanza la recomendada, que va primero.

| # | Pregunta | Opciones (recomendada primero) | Respuesta del autor | Fecha |
|---|---|---|---|---|
| 1 | ¿Qué fuente? | (a) Plus Jakarta Sans con `next/font/google`: moderna, legible, con acentos; se sirve desde el sitio · (b) la del sistema; cero bytes, menos identidad | (a), tácito (ADR-008) | 2026-10-07 |
| 2 | ¿Cómo se genera la imagen para compartir? | (a) Route handler estático `og.png/route.tsx` con `next/og`: sale `out/og.png` con extensión · (b) `opengraph-image.tsx`: con exportación estática sale sin extensión · (c) PNG hecho a mano en `public/` | (a), tácito (ADR-008) | 2026-10-07 |
