# DECISIONS — por qué es así

Última actualización: 2026-10-07
Registro aditivo. Un ADR viejo nunca se reescribe: se marca «Superseded por ADR-NNN».

## Índice
- [ADR-001 — Adopción del arnés de contexto y del flujo SDD](#adr-001--adopción-del-arnés-de-contexto-y-del-flujo-sdd)
- [ADR-002 — Stack: Next.js en Vercel](#adr-002--stack-nextjs-en-vercel)
- [ADR-003 — Trabajo por bloques con un commit por bloque](#adr-003--trabajo-por-bloques-con-un-commit-por-bloque)
- [ADR-004 — MCP: solo context7](#adr-004--mcp-solo-context7)
- [ADR-005 — Medición del peso de la página](#adr-005--medición-del-peso-de-la-página)
- [ADR-006 — Pruebas de la interfaz en la meta 001](#adr-006--pruebas-de-la-interfaz-en-la-meta-001)
- [ADR-007 — npm test construye antes de probar](#adr-007--npm-test-construye-antes-de-probar)

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

## ADR-003 — Trabajo por bloques con un commit por bloque
Fecha: 2026-10-07
Estado: Aceptado. Enmienda P2 de la constitución.

**Contexto.**
- P2 pedía una fase por vez, con un commit y una parada por fase.
- El autor pidió avanzar más por paso y no hacer un commit por fase.
- El texto anterior de P2 está en `docs/history/2026-10-07-constitution-P2.md`.

**Decisión.**
- Se trabaja por bloques. Un bloque agrupa fases relacionadas y cierra con un solo commit.
- Cada fase del bloque se verifica con su número antes de pasar a la siguiente.
- El agente se detiene al cerrar el bloque, o antes si una fase falla o necesita una decisión del autor.
- En la Etapa 3, una «fase» del plan sigue siendo la unidad que se autoriza. El plan puede agrupar fases en un bloque.

**Consecuencias.**
- Menos paradas y menos commits.
- Cada commit es más grande. El resumen del bloque lista el número de cada fase.
- Si un bloque falla a la mitad, se reporta qué fases quedaron verificadas.

## ADR-004 — MCP: solo context7
Fecha: 2026-10-07
Estado: Aceptado

**Contexto.**
- Las librerías del stack (Next.js 16, React 19, Vitest 5) cambian rápido.
- El conocimiento del modelo puede estar desactualizado.

**Decisión.**
- Se declara un solo servidor MCP en `.mcp.json`: context7, para leer la documentación de las librerías.
- Se habilita con `enabledMcpjsonServers` en `.claude/settings.json`.
- Por context7 solo salen nombres de librerías y preguntas técnicas genéricas.
- Nunca salen rutas, ids REF-NN, datos del dentista ni datos bancarios (P1).

**Consecuencias.**
- La documentación consultada está al día.
- Cualquier MCP nuevo necesita su propio ADR.

## ADR-005 — Medición del peso de la página
Fecha: 2026-10-07
Estado: Aceptado (plan 001, clarify #2 y #7)

**Contexto.**
- P9 pide ≤ 500 KB transferidos. Lighthouse agrega una dependencia grande y necesita Chrome.

**Decisión.**
- Un script propio (`scripts/measure-weight.mjs`) suma el gzip nivel 9 de `out/index.html` y de los recursos locales que referencia.
- «500 KB» significa 500 000 bytes gzip, la lectura más estricta.
- Lighthouse completo llega en la meta 002 (A4).

**Consecuencias.**
- La medición es repetible, sin red y sin dependencias.
- Gzip pesa más que Brotli, que Vercel puede usar: el número real es igual o menor.

## ADR-006 — Pruebas de la interfaz en la meta 001
Fecha: 2026-10-07
Estado: Aceptado (plan 001, clarify #3)

**Contexto.**
- El botón «Copiar» es el único componente con comportamiento.
- jsdom no reproduce el portapapeles real de Android.

**Decisión.**
- Sin Testing Library, jsdom ni Playwright en la meta 001.
- La lógica del copiado vive en `src/lib/` con el portapapeles inyectado y se prueba con Vitest.
- El HTML final se prueba como texto. El botón real se prueba en Android en la meta 002.

**Consecuencias.**
- Cero dependencias nuevas. P7 se cumple.
- El componente React no tiene prueba automática (B5).

## ADR-007 — npm test construye antes de probar
Fecha: 2026-10-07
Estado: Aceptado (plan 001, clarify #8)

**Contexto.**
- Las pruebas de C6 y C7 leen `out/`. Un `out/` viejo pasaría sin avisar.

**Decisión.**
- `pretest` corre `next build`. `npm run test:harness` no construye.

**Consecuencias.**
- `npm ci && npm test` en un clon limpio da el mismo resultado (P6).
- `npm test` tarda más. El tiempo se reporta en `memory.md`.
