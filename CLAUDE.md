# CLAUDE.md — instrucciones de operación

Última actualización: 2026-10-07
Esto es instrucción de herramienta. Las reglas viven en `docs/constitution.md` (P1–P11) y aquí solo se citan.

## Índice
- [1. Al arrancar](#1-al-arrancar)
- [2. Flujo de una meta](#2-flujo-de-una-meta)
- [3. Cerrar una fase o un bloque](#3-cerrar-una-fase-o-un-bloque)
- [4. Reglas de operación](#4-reglas-de-operación)
- [5. Entorno](#5-entorno)

## 1. Al arrancar
1. Leer completos: `docs/constitution.md`, `memory.md`, `docs/CONTEXT.md`.
2. Leer `spec.md` y `tasks.md` del spec activo (línea «Spec activo:» de `memory.md`).
3. El resto de `docs/` se consulta por su índice y solo la sección que haga falta.
4. Presupuesto de arranque: 48 KB en total. Lo mide la rutina `cerrar-fase` y lo vigila `tests/harness.test.ts`.
5. Nunca abrir `info/` (P1).

## 2. Flujo de una meta
1. **Spec.** `direccion` escribe `specs/NNN-nombre/spec.md` desde `specs/_plantilla/`. El autor lo aprueba.
2. **Plan.** `/planear NNN-nombre` → `planificacion` escribe `plan.md` sin código.
3. **Aclarar.** Las preguntas abiertas van a `clarify.md`. El autor responde.
4. **Autorizar.** El autor autoriza. `direccion` cambia la primera línea de `tasks.md` a «Plan autorizado por el autor el AAAA-MM-DD».
5. **Implementar.** `/fase n` → `desarrollo` implementa solo la fase n (o el bloque autorizado, ADR-003), con la suite en verde.
6. **Cerrar.** Rutina `cerrar-fase`. Resumen de seis líneas. Título de commit y `git add` exacto (P2).
7. **Commit.** Lo hace el autor. Su commit equivale a «sigue» (P2).
8. **Probar.** Al cerrar la meta: rutina `encargo-pruebas`, y el autor lanza a `pruebas` sobre HEAD limpio.

## 3. Cerrar una fase o un bloque
En el mismo cambio se actualiza:
- `specs/<activo>/tasks.md`: la casilla con criterio · número · fecha · commit (el commit lo llena el autor o la siguiente sesión).
- `memory.md`: «Dónde estamos», «Siguiente», «Pendientes del autor», «Cómo se verifica hoy» y la fecha.
- `docs/BACKLOG.md`: entradas nuevas o cerradas, con su índice.
- `docs/DECISIONS.md`: ADR nuevos, si los hay.
- `docs/ARCHITECTURE.md`: solo si cambió la estructura.
- `docs/CONTEXT.md`: «Trabajo en curso» y parámetros nuevos.
- Lo que sale de un archivo vivo se copia literal a `docs/history/`.
- Se corre `npm run test:harness` y se reporta el número.

## 4. Reglas de operación
**Git (P2).**
- Prohibido: `git commit`, `git push`, `git rebase`, `git reset --hard`, `git commit --amend`, cualquier reescritura de historial.
- Permitido: `git status`, `git log`, `git diff`, `git show`, `git ls-files`.
- Una negación de permisos o de un hook nunca se rodea. Se reporta al autor.

**Verificación (P3).**
- Suite completa: `npm test` con timeout de 300 000 ms.
- Solo el arnés: `npm run test:harness` con timeout de 120 000 ms.
- Se reporta: pruebas pasadas / totales y la duración.

**Comentarios (P10).**
- En español. Explican el porqué, no el qué.
- Densidad baja: un comentario por bloque no obvio.

**Alcance (P4).**
- Lo no pedido va a `docs/BACKLOG.md` con id estable, en el momento.

**Memoria (P5).**
- Todo va a `memory.md` o a `docs/`. Nunca a la memoria privada del agente (`autoMemoryEnabled: false`).

**MCP (P1, ADR-004).**
- context7: solo nombres de librerías y preguntas técnicas genéricas.
- Por ningún MCP salen rutas del repo, ids REF-NN, datos del dentista ni datos bancarios.

## 5. Entorno
- Windows 11 con Git Bash. Rutas con barras `/`.
- Node v24.15.0 en `C:/Program Files/nodejs/node.exe`. npm 11.12.1.
- Instalar: `npm ci`. Versiones exactas (P6).
- Los hooks corren con Node por su ruta completa y fallan cerrado.
- Sesión principal: `claude --agent direccion`.
- Reportes de los agentes: `Claude outputs/<meta>/` (fuera de git).
