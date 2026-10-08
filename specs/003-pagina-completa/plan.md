# Plan 003 — página completa

Última actualización: 2026-10-07
Sin código. Solo nombres, firmas y criterios.

## Índice
- [Archivos que crea o modifica](#archivos-que-crea-o-modifica)
- [Firmas](#firmas)
- [Fases](#fases)
- [ADR propuestos](#adr-propuestos)
- [Al BACKLOG](#al-backlog)
- [Dependencias nuevas](#dependencias-nuevas)
- [Preguntas abiertas](#preguntas-abiertas)

## Archivos que crea o modifica
- `src/content/dentist.ts` · modifica · consultorio, profesión, cédulas, frase, servicios, consultorios, nota de horario y textos nuevos.
- `src/lib/maps.ts` · crea · enlace de búsqueda de Google Maps.
- `src/lib/phone.ts` · crea · formato 3-3-2-2 y enlace `tel:`.
- `src/app/icons.tsx` · crea · íconos SVG en línea.
- `src/app/page.tsx` · modifica · siete bloques de la página.
- `src/app/globals.css` · modifica · diseño con variables de color, móvil primero y dos columnas desde 40rem.
- `src/app/layout.tsx` · modifica · descripción en los metadatos.
- `tests/content.test.ts`, `tests/build-output.test.ts` · modifican · C2 y C3.
- `tests/maps-phone.test.ts` · crea · pruebas de `maps.ts` y `phone.ts`.

## Firmas
- `buildMapsUrl(parts: string[]): string` · une las partes no vacías y devuelve `https://www.google.com/maps/search/?api=1&query=…`; lanza error si queda vacía.
- `formatMxPhone(number: string): string` · 10 dígitos → «771 143 78 89»; lanza error si no son 10 dígitos.
- `buildTelUrl(countryCode: string, number: string): string` · `tel:+<código><número>`; lanza error si no son dígitos.
- Tipos `Service` y `Office` en `dentist.ts`.

## Fases
Un solo bloque (ADR-003), automático.
- Fase 1 · contenido y lógica · C2 y pruebas de `maps-phone` en verde · `npm test`.
- Fase 2 · página y diseño · C3, C4 y C5 · `npm test`, capturas, `npm run weight`.
- Fase 3 (autor) · push y revisión en el teléfono · C6 · `check-deploy`.

## ADR propuestos
- ADR-012: juntar secciones y diseño en la 003, y medir Lighthouse al final de la 004.

## Al BACKLOG
- A8 (Alta): correo del dentista.
- M9 (Media): reparto exacto de las cédulas por título.

## Dependencias nuevas
- Ninguna.

## Preguntas abiertas
Copiadas a `clarify.md`.
