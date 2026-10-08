# Spec 003 — página completa

Última actualización: 2026-10-07
Estado: aprobado por el autor el 2026-10-07 (tácito, ADR-008; pedido del autor: «aun se ve bien basica la web»)

## Índice
- [Por qué](#por-qué)
- [Qué se construye](#qué-se-construye)
- [Criterio de cierre medible](#criterio-de-cierre-medible)
- [Lo que no se toca](#lo-que-no-se-toca)
- [Preguntas para el plan](#preguntas-para-el-plan)

## Por qué
- La página publicada solo tiene nombre, WhatsApp y tarjeta. Al autor le parece demasiado básica.
- El brief pide portada con cédulas, servicios y dos consultorios con mapa y horario.
- La confianza del paciente depende de que la página se vea profesional (Etapa 1, ronda 1).
- ADR-012 junta aquí las secciones (antes 003) y el diseño visual (antes 004).

## Qué se construye
1. **Barra superior** con el nombre del consultorio y el teléfono para llamar.
2. **Portada** con profesión, nombre, especialidad, una frase, las dos cédulas, el botón de WhatsApp y un acceso a los datos de pago.
3. **Servicios:** ortodoncia e implantes, en tarjetas con ícono.
4. **Consultorios:** Tula y Pachuca, con dirección, horario provisional y botón «Cómo llegar» a Google Maps.
5. **Agenda tu cita** y **Datos para tu pago** con etiquetas (M6) y la tarjeta dibujada como tarjeta.
6. **Pie** con cédulas y teléfono, y botón flotante de WhatsApp.

## Criterio de cierre medible
| # | Criterio | Umbral | Cómo se mide |
|---|---|---|---|
| C1 | La suite pasa | 100 % en verde | `npm test` |
| C2 | Datos de las secciones exactos | cédulas, servicios, direcciones y horarios iguales al brief, carácter por carácter | `tests/content.test.ts` |
| C3 | El HTML final lleva las secciones | 2 enlaces de mapas, enlace `tel:`, todos los externos con `target="_blank"` y `rel="noopener noreferrer"` | `tests/build-output.test.ts` |
| C4 | Sin scroll horizontal a 360 px | 0 cortes visibles | captura en 360 px y en 1280 px |
| C5 | Peso | ≤ 500 000 B gzip | `npm run weight` |
| C6 | Producción igual al build | `check-deploy <url>` sale con 0 | después del push del autor |

## Lo que no se toca
- La lógica del copiado y los datos bancarios.
- Logotipo, fuente propia y vista previa al compartir: meta 004 (M5).
- Lighthouse: se mide al final de la 004 (A4, ADR-012).
- Correo del dentista: solo está en la referencia y no se adivina (A8).

## Preguntas para el plan
1. ¿Mapa incrustado o enlace a Google Maps?
2. ¿Íconos en archivos, en una librería o en línea?
3. ¿Qué cédula va con qué título?
