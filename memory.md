# memory.md — estado vivo

Última actualización: 2026-10-07
Tope: 12 KB. Lo que sale de aquí se copia literal a `docs/history/`.

## Índice
- [Dónde estamos](#dónde-estamos)
- [Siguiente](#siguiente)
- [Decisiones abiertas](#decisiones-abiertas)
- [Pendientes del autor](#pendientes-del-autor)
- [Bloqueado](#bloqueado)
- [Datos de referencia](#datos-de-referencia)
- [Cómo se verifica hoy](#cómo-se-verifica-hoy)
- [Trampas conocidas](#trampas-conocidas)

## Dónde estamos
Spec activo: specs/_plantilla/
- Etapa 2 (arnés) cerrada en un bloque: Fases 2.4 a 2.10 (ADR-003).
- El spec activo es la plantilla hasta que exista `specs/001-esqueleto-caminante/` (Etapa 3).
- Commits: 2.1 `ef995f0`, 2.2 `22f72ab`, 2.3 `9bd0223`. Bloque 2.4–2.10: pendiente del autor.

## Siguiente
Orden del autor:
1. Etapa 3: spec 001-esqueleto-caminante. Se trabaja por bloques (ADR-003).
- El commit del autor equivale a «sigue» (P2).

## Decisiones abiertas
- Ninguna sin entrada. Ver BACKLOG: A1 (CLABE), A2 (horarios reales), A3 (iPhone), M3 (escritura por Bash).

## Pendientes del autor
- Commit del bloque 2.4–2.10 (ver el resumen del bloque).
- Conseguir la CLABE de BBVA (A1).
- Conseguir los horarios reales y su reparto por consultorio (A2).

## Bloqueado
- Nada.

## Datos de referencia
Solo por id. Los originales están en `info/` y ningún agente los lee (P1).
- REF-01: tarjeta de presentación azul, frente (nombre, cédulas, teléfono, correo).
- REF-02: tarjeta de presentación azul, reverso (servicios, dos direcciones).
- REF-03: tarjeta impresa «Integración Dental» (dirección de Tula, teléfono, correo).
- REF-04: tarjeta impresa con logotipo (nombre, especialidad).
- REF-05: nota a mano con datos bancarios (BBVA, titular). Es número de tarjeta, no CLABE.

## Cómo se verifica hoy
- Suite completa: `npm test` (timeout 300 000 ms).
- Solo el arnés: `npm run test:harness` (timeout 120 000 ms).
- Resultado y tiempos: ver el resumen del bloque 2.4–2.10.

## Trampas conocidas
- El número de REF-05 tiene 16 dígitos: es tarjeta. Una CLABE tiene 18 y en BBVA empieza con 012.
- `vitest.config` va con extensión `.mts`. Con `.ts`, Vite avisa que carga ESM como CommonJS.
- `npm ls` marca `@img/sharp-wasm32` y `@emnapi/runtime` como «extraneous» (B2).
- TypeScript va fijo en 5.9.3 (B1).
- Los hooks fallan cerrado: si `guard.mjs` se rompe, se niegan todas las herramientas. Se arregla editando el archivo a mano, fuera de Claude.
- Un hook que termina con código distinto de 0 y de 2 deja pasar la herramienta. Por eso cada hook va con `|| exit 2`.
- `direccion` no puede editar `.claude/` ni la constitución. El mantenimiento del arnés se hace en una sesión normal (`claude`, sin `--agent`).
- `npm info` está negado por el hook (B4). Usar `npm view`.
