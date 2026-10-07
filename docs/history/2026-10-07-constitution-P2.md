# Copia literal — constitution.md, P2 antes de ADR-003

Copiado el 2026-10-07. No se edita.

### P2. Roles, fases y commits
**Regla.**
- Claude escribe el código. El autor dirige, decide, prueba en Android y hace los commits.
- Ningún agente ejecuta `git commit` ni `git push`, ni reescribe el historial.
- Al cerrar una fase, el agente propone un título de una línea, sin coautor, y el `git add` exacto.
- Se trabaja una fase por vez. Al cerrarla, el agente se detiene.
- El commit del autor equivale a «sigue»: después de él se avanza sin preguntar.
- Las decisiones del autor (objetivo, alcance, datos sensibles, stack, roles y criterios de terminado) no se inventan. Se proponen como «propuesta», con su recomendación y su porqué.

**Porqué.** El autor responde ante el cliente. Cada cambio pasa por sus manos y queda revisable.

