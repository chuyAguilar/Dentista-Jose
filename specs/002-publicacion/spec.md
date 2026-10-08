# Spec 002 — publicación

Última actualización: 2026-10-07
Estado: aprobado por el autor el 2026-10-07 (tácito, ADR-008)

## Índice
- [Por qué](#por-qué)
- [Qué se construye](#qué-se-construye)
- [Criterio de cierre medible](#criterio-de-cierre-medible)
- [Lo que no se toca](#lo-que-no-se-toca)
- [Preguntas para el plan](#preguntas-para-el-plan)

## Por qué
- La página de la meta 001 solo existe en la PC del autor.
- Sin HTTPS, Chrome en Android no deja copiar al portapapeles (clarify 001 #1).
- Publicar primero permite probar cada meta siguiente en un teléfono real.
- Cierra A4 (Lighthouse), A5 (Vercel y Android) y M4 (respaldo del copiado).

## Qué se construye
1. **Repositorio remoto.** El código vive en un remoto que Vercel puede leer. El autor crea el remoto y hace el push (P2).
2. **Proyecto en Vercel.** Despliega la exportación estática (`out/`) con HTTPS, en una URL `*.vercel.app`.
3. **Vista previa y producción.** Cada cambio publicado tiene su URL de vista previa. La rama principal es producción.
4. **Prueba en Android.** El autor corre `/prueba-android` sobre la URL de producción, más un paso para el respaldo del copiado (M4).
5. **Lighthouse.** Se mide la URL de producción en modo móvil.
6. **Guía para el autor (P11).** Paso a paso: crear la cuenta de Vercel, crear el remoto, conectar y publicar.

## Criterio de cierre medible
| # | Criterio | Umbral | Cómo se mide |
|---|---|---|---|
| C1 | La suite pasa | 100 % en verde | `npm test` |
| C2 | Producción responde con HTTPS | código 200 y certificado válido | petición a la URL de producción |
| C3 | Producción sirve el mismo HTML que el build local | enlace de WhatsApp y tarjeta presentes, iguales a la meta 001 | comparar la página publicada con `out/index.html` |
| C4 | Android, botones | 7 de 7 pasos aplicables en `/prueba-android`; pasos 7 y 8 (mapas) no aplican hasta la meta 003 (clarify #7, M7) | prueba a mano del autor |
| C5 | Android, respaldo del copiado | aparece el campo con 16 dígitos y «Mantén presionado para copiar» | paso extra a mano (M4) |
| C6 | Lighthouse móvil | ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO | 4 números reportados |
| C7 | Peso | ≤ 500 000 B gzip (ADR-005) | `npm run weight` y, si se puede, bytes transferidos en producción |

## Lo que no se toca
- Contenido y secciones nuevas: meta 003.
- Diseño visual y metadatos para compartir: meta 004 (M5).
- Dominio propio (M1).
- La lógica de `src/lib/` y los datos de `src/content/`, salvo que una medición obligue. Eso se reporta antes de cambiar nada.
- Ningún agente hace push ni configura credenciales (P2).

## Preguntas para el plan
1. ¿Dónde vive el remoto: GitHub privado, GitHub público u otro? ¿Vercel lee del remoto o se publica con la CLI de Vercel sin remoto?
2. ¿Cómo se mide Lighthouse: PageSpeed Insights en el navegador (sin dependencias) o el paquete `lighthouse` por línea de comandos?
3. ¿Hace falta configuración en el repo (`vercel.json`, encabezados de seguridad) o basta con lo que Vercel detecta de Next.js?
4. Si una categoría de Lighthouse queda por debajo de 90, ¿se corrige en esta meta o va al BACKLOG?
5. ¿Cómo se fuerza el fallo del portapapeles en Android para probar el respaldo (C5)?
6. ¿En cuántas fases y bloques se divide, y qué fases son del autor?
