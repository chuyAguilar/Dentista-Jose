# Constitución — Integración Dental

Última actualización: 2026-10-07 (P2 enmendado por ADR-003)

## Índice
- [Jerarquía de verdad](#jerarquía-de-verdad)
- [Principios](#principios)
  - [P1. Datos sensibles](#p1-datos-sensibles)
  - [P2. Roles, fases y commits](#p2-roles-fases-y-commits)
  - [P3. Verificación medible](#p3-verificación-medible)
  - [P4. Alcance](#p4-alcance)
  - [P5. Registro](#p5-registro)
  - [P6. Reproducibilidad](#p6-reproducibilidad)
  - [P7. Separación entre lógica e interfaz](#p7-separación-entre-lógica-e-interfaz)
  - [P8. Exactitud de los datos de contacto y pago](#p8-exactitud-de-los-datos-de-contacto-y-pago)
  - [P9. Rendimiento y accesibilidad](#p9-rendimiento-y-accesibilidad)
  - [P10. Estilo de los textos](#p10-estilo-de-los-textos)
  - [P11. Enseñar lo nuevo](#p11-enseñar-lo-nuevo)
- [Enmiendas](#enmiendas)

## Jerarquía de verdad

constitución > ADR vigentes > spec activo > plan > código.

- Si dos fuentes chocan, manda la de arriba.
- El choque se reporta al autor. No se resuelve en silencio.
- El código nunca justifica romper un documento superior.

## Principios

### P1. Datos sensibles
**Regla.**
- La carpeta `info/` guarda las fotos originales, con datos bancarios.
- Ningún agente la lee, la lista ni la edita.
- `info/` nunca entra a git.
- Los datos publicables viven solo en `src/content/`, revisados por el autor.
- Por un MCP nunca salen rutas de `info/`, datos bancarios ni datos personales.

**Porqué.** Una foto en el historial de git o en un servicio externo no se puede borrar del todo.

### P2. Roles, fases y commits
**Regla.**
- Claude escribe el código. El autor dirige, decide, prueba en Android y hace los commits.
- Ningún agente ejecuta `git commit` ni `git push`, ni reescribe el historial.
- Al cerrar un bloque, el agente propone un título de una línea, sin coautor, y el `git add` exacto.
- Se trabaja por bloques: un bloque agrupa varias fases relacionadas y cierra con un solo commit (ADR-003).
- Dentro del bloque, cada fase se verifica con su número antes de pasar a la siguiente.
- Al cerrar el bloque, el agente se detiene. Se detiene antes si una fase falla o necesita una decisión del autor.
- El commit del autor equivale a «sigue»: después de él se avanza sin preguntar.
- Las decisiones del autor (objetivo, alcance, datos sensibles, stack, roles y criterios de terminado) no se inventan. Se proponen como «propuesta», con su recomendación y su porqué.

**Porqué.** El autor responde ante el cliente. Cada cambio pasa por sus manos y queda revisable.

### P3. Verificación medible
**Regla.**
- Nada se cierra «porque se ve bien».
- Cada fase se cierra con una prueba, una medición o una comparación.
- Se reporta el número obtenido contra el criterio.
- La suite completa queda en verde antes de proponer el commit.

**Porqué.** Un número se puede repetir y comparar. Una impresión, no.

### P4. Alcance
**Regla.**
- Se construye solo lo que pide el spec activo.
- Lo no pedido, aunque sea buena idea, va al BACKLOG en ese momento.

**Porqué.** Una landing crece sin control si cada fase agrega «algo más».

### P5. Registro
**Regla.**
- Cada decisión de arquitectura o de stack va a `docs/DECISIONS.md` como ADR.
- Lo pospuesto va a `docs/BACKLOG.md` en el momento en que se decide no hacerlo.
- El estado vivo va a `memory.md`. Nada se guarda en la memoria privada del agente.
- El registro se actualiza en el mismo cambio que lo motiva.

**Porqué.** La siguiente sesión solo sabe lo que está escrito en el repo.

### P6. Reproducibilidad
**Regla.**
- Las versiones van fijadas exactas (`save-exact=true`) y el `package-lock.json` entra a git.
- Se instala con `npm ci` desde el lockfile.
- Antes de dar por hecho una versión o herramienta, se comprueba con su comando.
- Los finales de línea van en LF en el repo.
- Los comandos de verificación quedan escritos con su timeout exacto.

**Porqué.** Lo que pasa en la PC del autor debe pasar igual en Vercel y en la próxima sesión.

### P7. Separación entre lógica e interfaz
**Regla.**
- `src/lib/` contiene lógica pura: sin React, sin DOM y sin estilos. Se prueba con Vitest.
- `src/content/` contiene solo datos.
- `src/app/` presenta. No calcula enlaces ni formatea números por su cuenta: llama a `src/lib/`.

**Porqué.** La lógica pura se prueba rápido y sin navegador. La interfaz cambia sin romperla.

### P8. Exactitud de los datos de contacto y pago
**Regla.**
- En general manda: comodidad > velocidad > exactitud.
- Excepción: el teléfono, el WhatsApp, la tarjeta, la CLABE, las cédulas y las direcciones son exactos.
- Cada uno tiene una prueba que lo compara dígito por dígito con `src/content/`.
- Un cambio en esos datos lo aprueba el autor.

**Porqué.** Un dígito equivocado manda un pago o un paciente al lugar incorrecto.

### P9. Rendimiento y accesibilidad
**Regla.**
- La primera carga transfiere 500 KB como máximo.
- Lighthouse móvil da ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO.
- La página se diseña primero para celular.

**Porqué.** Los pacientes abren la página desde el celular, a menudo con datos móviles.

### P10. Estilo de los textos
**Regla.**
- La página habla de tú, cálida y cercana, en español de México («Agenda tu cita»).
- Documentos y reportes: español, frases cortas, una idea por frase.
- Código en inglés. Comentarios en español.
- Ninguna línea de los archivos del arnés pasa de 2 000 caracteres.

**Porqué.** Un tono constante transmite confianza. Las frases cortas se revisan rápido.

### P11. Enseñar lo nuevo
**Regla.**
- Si el autor usa por primera vez una librería, herramienta o comando, se le enseña la mecánica desde cero, paso a paso.

**Porqué.** El autor mantiene el proyecto. Lo que no entiende no lo puede dirigir.

## Enmiendas

- Solo el autor enmienda esta constitución.
- Cada enmienda lleva un ADR en `docs/DECISIONS.md` que la justifica.
- El texto anterior se copia literal a `docs/history/` antes de cambiarlo.
