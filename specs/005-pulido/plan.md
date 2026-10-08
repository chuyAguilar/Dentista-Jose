# Plan 005 — pulido

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
- `src/content/dentist.ts` · tipo `Step` y `steps`.
- `src/app/page.tsx`, `src/app/globals.css` · lista `.steps` y menos relleno de `.cta` en el teléfono.
- `next.config.ts` · `agentRules: false`.
- `tests/content.test.ts`, `tests/build-output.test.ts` · C2.
- Borra `.gitkeep` de `docs/`, `scripts/`, `specs/`, `src/app/`, `src/content/` y `src/lib/`.

## Firmas
- `Step = { title: string; description: string }`.

## Fases
- Fase 1 (bloque único, automático) · C1 a C5.

## ADR propuestos
- Ninguno.

## Al BACKLOG
- Cierra B6 y B8.

## Dependencias nuevas
- Ninguna.

## Preguntas abiertas
- Ninguna.
