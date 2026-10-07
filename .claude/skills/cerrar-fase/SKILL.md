---
name: cerrar-fase
description: Al cerrar una fase o bloque, pone al día memory.md, el BACKLOG y los índices, revisa líneas de más de 2 000 caracteres y mide los KB del arranque.
---

# cerrar-fase

1. Actualiza lo que pide CLAUDE.md §3, en el mismo cambio.
2. En cada archivo tocado: el índice coincide con sus títulos y la fecha «Última actualización» es la de hoy.
3. Si algo sale de un archivo vivo, lo copia literal a `docs/history/AAAA-MM-DD-<archivo>-<sección>.md`.
4. Corre `npm run test:harness` (timeout 120 000 ms). Comprueba:
   - las líneas de más de 2 000 caracteres (debe haber 0);
   - los KB del arranque (≤ 48 KB);
   - `memory.md` ≤ 12 KB;
   - los índices.
5. Reporta: pruebas del arnés pasadas/totales · KB del arranque · KB de memory.md · línea más larga.
6. Si algo falla, lo corrige solo si es del registro (índice, fecha). Si es otra cosa, lo reporta y se detiene.
