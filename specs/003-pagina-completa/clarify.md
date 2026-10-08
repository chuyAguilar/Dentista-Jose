# Clarify 003 — página completa

Última actualización: 2026-10-07

## Índice
- [Preguntas](#preguntas)

## Preguntas
Con ADR-008 avanza la recomendada, que va primero.

| # | Pregunta | Opciones (recomendada primero) | Respuesta del autor | Fecha |
|---|---|---|---|---|
| 1 | ¿Mapa incrustado o enlace? | (a) Enlace de búsqueda de Google Maps: sin llave, sin iframe, abre la app en Android · (b) iframe de Google Maps; pesa cientos de KB y baja Lighthouse | (a), tácito (ADR-008) | 2026-10-07 |
| 2 | ¿Cómo van los íconos? | (a) SVG en línea en `icons.tsx`: cero peticiones y cero dependencias · (b) librería de íconos; dependencia nueva (P7) | (a), tácito (ADR-008) | 2026-10-07 |
| 3 | ¿Qué cédula va con qué título? | (a) Mostrar «Cédula 3490657» y «Cédula 6595318» sin asignar título hasta que el autor lo confirme (M9) · (b) asignarlas por orden; riesgo de un dato equivocado | (a), tácito (ADR-008) | 2026-10-07 |
| 4 | ¿Textos nuevos de la página? | (a) Los de `dentist.ts`, de tú; el autor los revisa en la paridad · (b) esperar textos del dentista | (a), tácito (ADR-008) | 2026-10-07 |
