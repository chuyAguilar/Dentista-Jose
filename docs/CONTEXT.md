# CONTEXT — entorno y estado

Última actualización: 2026-10-07

## Índice
- [Reglas de negocio](#reglas-de-negocio)
- [Parámetros por defecto](#parámetros-por-defecto)
- [Variables de entorno](#variables-de-entorno)
- [Entorno de desarrollo](#entorno-de-desarrollo)
- [Glosario](#glosario)
- [Trabajo en curso](#trabajo-en-curso)

## Reglas de negocio
- La página es del C.D. José Ángel Jiménez Tapia, «Integración Dental».
- Es especialista en Ortodoncia y Cirujano Dentista. Tiene dos cédulas profesionales.
- Ofrece ortodoncia e implantes.
- Atiende en dos consultorios: Tula, Hgo., y Pachuca, Hgo.
- Las citas se piden por WhatsApp. No hay agenda en línea.
- Los pagos se hacen por depósito o transferencia. La página no cobra.
- Mientras no haya CLABE, solo se muestra la tarjeta BBVA (A1).
- Los horarios son provisionales y se avisa al paciente que los confirme por WhatsApp (A2).
- Fuera de la v1: citas en línea, cobro en línea, blog, galería, CMS y dominio propio.

## Parámetros por defecto
| Parámetro | Valor | Origen |
|---|---|---|
| Teléfono y WhatsApp | 771 143 78 89 | REF-01 y REF-03. Confirmado por el autor el 2026-10-07. |
| Código de país | 52 (México) | Formato wa.me. |
| Mensaje de WhatsApp | «Hola, doctor. Quiero agendar una cita.» (propuesta) | Brief. Se confirma en el spec 001. |
| Horario | Lunes a sábado, 8:00–18:00, sujeto a cambios | Autor, 2026-10-07. Provisional (A2). |
| Nota de horario | «Sujeto a cambios, confirma por WhatsApp» | Autor, 2026-10-07. |
| Banco | BBVA, tarjeta de débito | REF-05. Confirmado por el autor el 2026-10-07. |
| CLABE | pendiente | A1. |
| Peso máximo | 500 KB transferidos | Brief, P9. |
| Lighthouse móvil mínimo | 90 en cuatro categorías | Brief, P9. |
| Tono | de tú, cálido, español de México | Autor, P10. |
- Los números completos viven solo en `src/content/`. No se copian a la documentación.

## Variables de entorno
- Ninguna. El sitio es estático y no usa secretos.
- Si alguna vez hace falta una, va en `.env.local` (fuera de git) y se documenta aquí.

## Entorno de desarrollo
- Windows 11 con Git Bash.
- Node v24.15.0 y npm 11.12.1 (comprobados el 2026-10-07).
- Git 2.51.1. Python 3.10.11 instalado, pero no se usa en el proyecto.
- No están instalados pnpm ni la CLI de Vercel.

## Glosario
- **CLABE:** clave bancaria estandarizada de 18 dígitos para transferencias SPEI en México.
- **SPEI:** sistema de transferencias electrónicas entre bancos de México.
- **Cédula profesional:** registro oficial que autoriza a ejercer una profesión.
- **CTA (call to action):** botón que invita a una acción. Aquí: WhatsApp y datos bancarios.
- **wa.me:** dominio oficial de WhatsApp para abrir un chat desde un enlace.
- **Exportación estática:** Next.js genera HTML fijo en el build, sin servidor.
- **Lighthouse:** auditoría de Chrome que puntúa rendimiento, accesibilidad, buenas prácticas y SEO de 0 a 100.
- **ADR:** registro de una decisión de arquitectura.
- **Spec:** descripción de una meta: qué se construye y cómo se sabe que terminó.
- **REF-NN:** id de un dato de referencia original en `info/`.

## Trabajo en curso
- Meta: 001, esqueleto caminante. Spec aprobado y plan autorizado el 2026-10-07.
- Bloque 1 (fases 1–4): implementado, 125/125 en verde. Esperando el commit del autor.
- Bloque 2 (fase 5): `/paridad-tarjeta` del autor. C8 (Android) pasó a la meta 002.
- Etapa 2 (arnés) cerrada. Commit del bloque: `6921fce`.
