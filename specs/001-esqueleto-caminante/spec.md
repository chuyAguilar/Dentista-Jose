# Spec 001 — esqueleto caminante

Última actualización: 2026-10-07
Estado: aprobado por el autor el 2026-10-07

## Índice
- [Por qué](#por-qué)
- [Qué se construye](#qué-se-construye)
- [Criterio de cierre medible](#criterio-de-cierre-medible)
- [Lo que no se toca](#lo-que-no-se-toca)
- [Preguntas para el plan](#preguntas-para-el-plan)

## Por qué
- El brief pide dos botones: WhatsApp directo y datos bancarios.
- Antes de diseñar secciones, hay que probar que el camino completo funciona.
- El camino es: dato real → lógica mínima → HTML estático → botón en el celular.
- Si algo falla en ese camino (exportación estática, enlace de WhatsApp, copiar en Android), se descubre ahora y no al final.

## Qué se construye
1. **Contenido real.** Un archivo en `src/content/` con los datos aprobados: nombre, especialidad, teléfono, mensaje de WhatsApp, banco, titular y número de tarjeta.
2. **Lógica mínima.** En `src/lib/`: armar el enlace de WhatsApp y agrupar los dígitos de la tarjeta de 4 en 4.
3. **Página mínima.** Una sola página, de tú (P10), con:
   - el nombre y la especialidad;
   - el botón «Escríbeme por WhatsApp»;
   - el bloque de datos bancarios con el botón «Copiar».
4. **Salida estática.** `npm run build` genera `out/index.html` con exportación estática.
5. **Prueba en Android.** Pasa a la meta 002, con HTTPS en Vercel (clarify #1).

## Criterio de cierre medible
| # | Criterio | Umbral | Cómo se mide |
|---|---|---|---|
| C1 | La suite pasa | 100 % en verde | `npm test` |
| C2 | Los datos coinciden con la referencia | 100 % de los campos (P8) | Prueba dígito por dígito del contenido + `/paridad-tarjeta` firmada por el autor |
| C3 | El enlace de WhatsApp es exacto | igual a `https://wa.me/527711437889?text=<mensaje codificado>` | Prueba de la lógica |
| C4 | Copiar entrega solo dígitos | 16 dígitos, sin espacios | Prueba de la lógica |
| C5 | El build estático funciona | código de salida 0 y `out/index.html` existe | `npm run build` |
| C6 | El HTML final lleva los datos | contiene el enlace de C3 y la tarjeta agrupada | Prueba sobre `out/index.html` |
| C7 | La página es ligera | ≤ 500 KB transferidos (P9) | Medición propuesta en el plan |
| C8 | Funciona en Android | Movido a la meta 002 por decisión del autor (clarify #1, 2026-10-07): sin HTTPS, Chrome no deja copiar | — |

## Lo que no se toca
- Servicios, consultorios, mapas y horarios: meta siguiente.
- Diseño visual final, logotipo e imágenes: meta siguiente.
- CLABE (A1) y horarios reales (A2): siguen en el BACKLOG.
- Lighthouse completo y despliegue en Vercel: el plan propone en qué meta van.
- `info/` (P1) y el arnés (`.claude/`, constitución).

## Preguntas para el plan
1. ¿Cómo prueba el autor en Android en esta meta: red local con `npm run dev`, o un despliegue de vista previa en Vercel?
2. ¿Cómo se mide C7 sin Lighthouse: suma de bytes comprimidos de `out/`, o Lighthouse ya en esta meta?
3. ¿Hacen falta pruebas de componente para el botón «Copiar» (por ejemplo, Testing Library con jsdom), o basta la prueba de la lógica más la prueba en Android?
4. ¿El mensaje de WhatsApp es «Hola, doctor. Quiero agendar una cita.»? (propuesta de CONTEXT.md)
5. ¿Qué pasa si el navegador no permite copiar? Proponer el comportamiento de respaldo.
6. ¿En cuántas fases y bloques se divide la meta (ADR-003)?
