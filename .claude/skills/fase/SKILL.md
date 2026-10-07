---
name: fase
description: Implementa solo la fase n (o el bloque n-m) del plan autorizado del spec activo y devuelve el resumen de seis líneas. Uso /fase n.
disable-model-invocation: true
argument-hint: n | n-m
---

# /fase $ARGUMENTS

1. Lee la línea «Spec activo:» de `memory.md`.
2. Comprueba que la primera línea de `tasks.md` del spec activo dice «Plan autorizado por el autor el AAAA-MM-DD». Si no, se detiene y lo reporta. No implementa nada.
3. Comprueba que las fases anteriores tienen su casilla marcada. Si no, se detiene.
4. Lanza al subagente `desarrollo` con: spec activo, fase(s) $ARGUMENTS, criterio de cada fase copiado del plan.
5. `desarrollo` implementa solo esas fases, con `npm test` en verde (timeout 300 000 ms).
6. Corre la rutina `cerrar-fase`.
7. Devuelve el resumen de seis líneas:
   1. Fase · nombre.
   2. Qué cambió (archivos).
   3. Número obtenido contra el criterio.
   4. Pruebas pasadas/totales y tiempo.
   5. Entradas nuevas del BACKLOG (ids).
   6. Título del commit y `git add` exacto.
8. Se detiene y espera el commit del autor (P2).
