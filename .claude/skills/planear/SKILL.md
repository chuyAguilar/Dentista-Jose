---
name: planear
description: Escribe plan.md de un spec aprobado, sin código, y se detiene. Uso /planear NNN-nombre.
disable-model-invocation: true
argument-hint: NNN-nombre
---

# /planear $ARGUMENTS

1. Comprueba que existe `specs/$ARGUMENTS/spec.md` y que su «Estado» dice «aprobado por el autor». Si no, se detiene y lo reporta.
2. Lanza al subagente `planificacion` con la ruta `specs/$ARGUMENTS/`.
3. `planificacion` escribe `specs/$ARGUMENTS/plan.md` desde `specs/_plantilla/plan.md`. Sin código (CLAUDE.md §2).
4. Copia las preguntas abiertas a `specs/$ARGUMENTS/clarify.md`, una fila por pregunta.
5. Si no existe, crea `specs/$ARGUMENTS/tasks.md` desde la plantilla, con la primera línea «Plan pendiente de autorización».
6. Devuelve: ruta del plan · bytes · número de fases · preguntas abiertas con su recomendada.
7. Se detiene. No implementa nada hasta que el autor autorice.
