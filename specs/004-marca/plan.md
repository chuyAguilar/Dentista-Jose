# Plan 004 — marca

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
- `src/content/site.ts` · crea · URL pública.
- `src/app/layout.tsx` · modifica · fuente, `metadataBase`, Open Graph y color de tema.
- `src/app/icon.svg` · crea · ícono.
- `src/app/og.png/route.tsx` · crea · imagen para compartir, estática.
- `src/app/globals.css` · modifica · usa la variable de la fuente.
- `tests/build-output.test.ts` · modifica · C2.

## Firmas
- `site: { url: string }`.
- `GET(): ImageResponse` en `og.png/route.tsx`, con `dynamic = "force-static"`.

## Fases
Bloque 1 (fase 1) automático. Fase 2 del autor.
- Fase 1 · marca · C1, C2 y C3 · `npm test`, `npm run weight`.
- Fase 2 (autor) · push, vista previa en WhatsApp y Lighthouse · C4, C5 y C6.

## ADR propuestos
- Ninguno. Todo lo trae Next (`next/font`, `next/og`).

## Al BACKLOG
- A9 (Alta): logotipo real.

## Dependencias nuevas
- Ninguna.

## Preguntas abiertas
Copiadas a `clarify.md`.
