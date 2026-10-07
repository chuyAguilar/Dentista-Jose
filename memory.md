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
- Etapa 2 (arnés), Fase 2.3 en curso: memoria y documentación.
- El spec activo es la plantilla hasta que exista `specs/001-esqueleto-caminante/` (Etapa 3).
- Hecho: Etapa 1 (brief aprobado), Fase 2.1 (`ef995f0`), Fase 2.2 (`22f72ab`).

## Siguiente
Orden del autor:
1. Fases 2.4 a 2.10 del arnés, una por commit.
2. Etapa 3: spec 001-esqueleto-caminante.
- El commit del autor equivale a «sigue» (P2).

## Decisiones abiertas
- Ninguna sin entrada. Ver BACKLOG: A1 (CLABE), A2 (horarios reales), A3 (iPhone).

## Pendientes del autor
- Commit de la Fase 2.3 (ver resumen de la fase).
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
- Comando: `npm test` (timeout 120 000 ms).
- Resultado: 1 prueba, 1 en verde, 187 ms de Vitest, 1,4 s en total.

## Trampas conocidas
- El número de REF-05 tiene 16 dígitos: es tarjeta. Una CLABE tiene 18 y en BBVA empieza con 012.
- `vitest.config` va con extensión `.mts`. Con `.ts`, Vite avisa que carga ESM como CommonJS.
- `npm ls` marca `@img/sharp-wasm32` y `@emnapi/runtime` como «extraneous». Son opcionales de Next. No rompen nada (B2).
- TypeScript va fijo en 5.9.3. La 7.x no está verificada con Next 16.4 (B1).
- La carpeta no tenía git al empezar. El autor hizo `git init` en la Fase 2.1.
