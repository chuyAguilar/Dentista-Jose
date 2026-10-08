# Spec 005 — pulido

Última actualización: 2026-10-07
Estado: aprobado por el autor el 2026-10-07 (tácito, ADR-008; pedido del autor: «continuemos»)

## Índice
- [Por qué](#por-qué)
- [Qué se construye](#qué-se-construye)
- [Criterio de cierre medible](#criterio-de-cierre-medible)
- [Lo que no se toca](#lo-que-no-se-toca)
- [Preguntas para el plan](#preguntas-para-el-plan)

## Por qué
- Los datos reales (CLABE, horarios, correo, logotipo, cédulas) dependen del autor. Mientras llegan, se pule lo que no los necesita.
- Un paciente nuevo no sabe qué pasa después de escribir por WhatsApp.
- B6 y B8 eran limpieza pendiente.

## Qué se construye
1. Tres pasos «Escríbeme · Elige consultorio · Confirma tu cita» en la sección de la cita.
2. `agentRules: false` en `next.config.ts`: `next dev` ya no crea `AGENTS.md` (B8).
3. Se borran los `.gitkeep` de carpetas con archivos (B6). Se queda el de `public/`, que sigue vacía.

## Criterio de cierre medible
| # | Criterio | Umbral | Cómo se mide |
|---|---|---|---|
| C1 | La suite pasa | 100 % en verde | `npm test` |
| C2 | Pasos en el HTML | lista ordenada con 3 elementos | `tests/build-output.test.ts` |
| C3 | Sin `AGENTS.md` | 0 archivos tras correr `next dev` | `ls AGENTS.md` |
| C4 | Sin cortes a 360 px | botón en una línea, sin scroll horizontal | captura |
| C5 | Peso | ≤ 500 000 B gzip | `npm run weight` |

## Lo que no se toca
- Datos del dentista: meta 006.
- Los pasos no prometen tiempos ni precios.

## Preguntas para el plan
- Ninguna abierta. Plan corto en `plan.md`.
