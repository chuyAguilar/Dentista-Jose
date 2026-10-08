# Spec 004 — marca

Última actualización: 2026-10-07
Estado: aprobado por el autor el 2026-10-07 (tácito, ADR-008)

## Índice
- [Por qué](#por-qué)
- [Qué se construye](#qué-se-construye)
- [Criterio de cierre medible](#criterio-de-cierre-medible)
- [Lo que no se toca](#lo-que-no-se-toca)
- [Preguntas para el plan](#preguntas-para-el-plan)

## Por qué
- Al compartir el enlace por WhatsApp hoy no sale imagen ni descripción (M5).
- La pestaña del navegador no tiene ícono y la letra es la del sistema.
- ADR-012 deja aquí la marca y la única medición de Lighthouse.

## Qué se construye
1. Fuente propia servida desde el sitio.
2. Ícono SVG y color de tema.
3. Descripción e imagen de Open Graph de 1200×630.
4. Lighthouse móvil sobre producción, ya con la página en su forma final.

## Criterio de cierre medible
| # | Criterio | Umbral | Cómo se mide |
|---|---|---|---|
| C1 | La suite pasa | 100 % en verde | `npm test` |
| C2 | Metadatos | `og:image` absoluta, PNG 1200×630, ícono, color de tema, fuente sin peticiones a Google | `tests/build-output.test.ts` |
| C3 | Peso | ≤ 500 000 B gzip | `npm run weight` |
| C4 | Producción igual al build | `check-deploy <url>` sale con 0 | después del push |
| C5 | Vista previa en WhatsApp | sale imagen, título y descripción | el autor comparte el enlace (sí/no) |
| C6 | Lighthouse móvil | ≥ 90 en las cuatro categorías | PageSpeed Insights, mediana de 3 (A4) |

## Lo que no se toca
- Contenido y secciones (003).
- Logotipo real: solo está en la referencia (A9).

## Preguntas para el plan
1. ¿Qué fuente?
2. ¿Cómo se genera la imagen para compartir con exportación estática?
