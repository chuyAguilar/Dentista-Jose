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
Spec activo: specs/001-esqueleto-caminante/
- Meta 001 cerrada por implementación: fases 1–5 marcadas. Bloque 1 en `b5234c8`. Paridad 7 de 7 (C2 firmado).
- C2 a C7 cumplidos. C8 pasó a la meta 002 (clarify #1, A5).
- Falta: commit del cierre y la prueba independiente del agente `pruebas`.
- Etapa 2 cerrada. Commits: 2.1 `ef995f0`, 2.2 `22f72ab`, 2.3 `9bd0223`, bloque 2.4–2.10 `6921fce`.

## Siguiente
Orden del autor:
1. Commit del cierre de la meta 001.
2. Lanzar a `pruebas` con `Claude outputs/pruebas/001-esqueleto-caminante/encargo.md`.
3. Fijar el orden de las metas 002 en adelante (propuesta en el resumen del cierre de 001).
- Se trabaja por bloques (ADR-003).
- El commit del autor equivale a «sigue» (P2).

## Decisiones abiertas
- Ninguna sin entrada. Ver BACKLOG: A1 (CLABE), A2 (horarios reales), A3 (iPhone), M3 (escritura por Bash).

## Pendientes del autor
- Commit del cierre de la meta 001.
- Lanzar al agente `pruebas` (ver «Siguiente»).
- Fijar el orden de las metas siguientes.
- Conseguir la CLABE de BBVA (A1).
- Conseguir los horarios reales y su reparto por consultorio (A2).
- Aprobar las etiquetas de los datos de pago (M6), en la meta 002.

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
- Suite completa: `npm test` (timeout 300 000 ms). `pretest` corre `next build` antes (ADR-007).
- Solo el arnés: `npm run test:harness` (timeout 120 000 ms). No construye.
- Solo el build: `npm run build`. Solo el peso: `npm run weight` (después del build).
- Resultado al cerrar el bloque 1 de la 001: 125/125 en verde. `npm test` tarda 8,5–9,6 s en total (build ≈ 5,5 s + Vitest ≈ 3 s). Build en frío (sin `.next/`): 7–19 s.
- Peso C7: 177 917–177 922 B gzip de 500 000 (5 builds).

## Trampas conocidas
- El número de REF-05 tiene 16 dígitos: es tarjeta. Una CLABE tiene 18 y en BBVA empieza con 012.
- `vitest.config` va con extensión `.mts`. Con `.ts`, Vite avisa que carga ESM como CommonJS.
- `npm ls` marca `@img/sharp-wasm32` y `@emnapi/runtime` como «extraneous» (B2).
- TypeScript va fijo en 5.9.3 (B1).
- Los hooks fallan cerrado: si `guard.mjs` se rompe, se niegan todas las herramientas. Se arregla editando el archivo a mano, fuera de Claude.
- Un hook que termina con código distinto de 0 y de 2 deja pasar la herramienta. Por eso cada hook va con `|| exit 2`.
- `direccion` no puede editar `.claude/` ni la constitución. El mantenimiento del arnés se hace en una sesión normal (`claude`, sin `--agent`).
- `npm info` está negado por el hook (B4). Usar `npm view`.
- `next build` reescribe `tsconfig.json` si falta `"jsx": "react-jsx"` o `.next/dev/types/**/*.ts` en `include`. Ya están; no quitarlos.
- El peso de C7 varía unos bytes entre builds (177 917–177 922): el id del build cambia de largo.
