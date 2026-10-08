# memory.md y CONTEXT.md antes del cierre del bloque 1 de la meta 001

Copia literal, 2026-10-07. Sale al cerrar el bloque 1 (fases 1–4).

# De memory.md

## Dónde estamos
Spec activo: specs/001-esqueleto-caminante/
- Etapa 3, meta 001: spec en borrador, esperando la aprobación del autor.
- Etapa 2 cerrada. Commits: 2.1 `ef995f0`, 2.2 `22f72ab`, 2.3 `9bd0223`, bloque 2.4–2.10 `6921fce`.

## Siguiente
Orden del autor:
1. Aprobar el spec 001. Después, `/planear 001-esqueleto-caminante`.
- Se trabaja por bloques (ADR-003).
- El commit del autor equivale a «sigue» (P2).

## Pendientes del autor
- Aprobar o corregir `specs/001-esqueleto-caminante/spec.md`.
- Conseguir la CLABE de BBVA (A1).
- Conseguir los horarios reales y su reparto por consultorio (A2).

## Cómo se verifica hoy
- Suite completa: `npm test` (timeout 300 000 ms).
- Solo el arnés: `npm run test:harness` (timeout 120 000 ms).
- Resultado al cerrar la Etapa 2: 97/97 en verde, 3,2 s.

# De docs/CONTEXT.md

## Trabajo en curso
- Meta: arnés del proyecto (Etapa 2).
- Hecho: esqueleto (2.1), constitución (2.2), memoria y docs (2.3).
- Hecho en un bloque (ADR-003): CLAUDE.md, plantilla SDD, roles, rutinas, guardarraíles, MCP y pruebas del arnés (2.4–2.10).
- Commit del bloque: `6921fce`.
- En curso: meta 001, esqueleto caminante. Spec en borrador.
