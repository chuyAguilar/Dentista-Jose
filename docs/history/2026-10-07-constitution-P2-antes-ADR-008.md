# Copia literal — constitution.md, P2 antes de ADR-008

Copiado el 2026-10-07. No se edita.

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

