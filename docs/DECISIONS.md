# DECISIONS — por qué es así

Última actualización: 2026-10-07
Registro aditivo. Un ADR viejo nunca se reescribe: se marca «Superseded por ADR-NNN».

## Índice
- [ADR-001 — Adopción del arnés de contexto y del flujo SDD](#adr-001--adopción-del-arnés-de-contexto-y-del-flujo-sdd)
- [ADR-002 — Stack: Next.js en Vercel](#adr-002--stack-nextjs-en-vercel)

## ADR-001 — Adopción del arnés de contexto y del flujo SDD
Fecha: 2026-10-07
Estado: Aceptado

**Contexto.**
- El proyecto se construye con agentes de IA en varias sesiones.
- Cada sesión empieza sin recordar la anterior.
- El autor necesita decidir, revisar y hacer cada commit.

**Decisión.**
- Se adopta un arnés: constitución, memoria viva, docs con índice, specs SDD, roles, rutinas, hooks y pruebas del arnés.
- Jerarquía: constitución > ADR > spec activo > plan > código.
- Flujo: spec → plan → autorización → una fase → verificación → commit del autor.

**Consecuencias.**
- Más archivos que mantener al cerrar cada fase.
- Cada sesión arranca leyendo ≤ 48 KB y sabe dónde está.
- Ningún agente puede hacer commits ni leer `info/`.

## ADR-002 — Stack: Next.js en Vercel
Fecha: 2026-10-07
Estado: Aceptado

**Contexto.**
- Hay que hacer una landing estática, móvil primero, publicada en Vercel.
- Las opciones fueron Astro, HTML sin framework y Next.js.
- La recomendación era Astro. El autor eligió Next.js.

**Decisión.**
- Next.js 16.4.0 con React 19.3.0.
- TypeScript 5.9.3. No se usa la 7.x porque su compatibilidad con Next 16.4 no está verificada.
- Exportación estática (`output: 'export'`), para no enviar JavaScript de servidor.
- Vitest 5.0.3 para la lógica y el contenido.
- npm como gestor, con versiones exactas.
- Hooks y pruebas del arnés en Node, ejecutado por su ruta.
- Playwright y Lighthouse se deciden en el plan de la meta 001.

**Consecuencias.**
- Más JavaScript base que Astro. El tope de 500 KB (P9) se vigila en cada meta.
- Vercel despliega Next.js sin configuración extra.
- El proyecto puede crecer a citas o pagos en línea sin cambiar de framework.
- El autor aprende React y el App Router. Se le enseña desde cero (P11).
