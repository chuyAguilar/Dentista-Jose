# BACKLOG — lo pospuesto

Última actualización: 2026-10-07

Prioridades:
- **Alta:** puede dar un resultado equivocado o impide usar la página.
- **Media:** mejora clara sin riesgo.
- **Baja:** espera datos, o solo si estorba.

## Índice
- [Alta](#alta)
  - [A1 — CLABE de BBVA](#a1--clabe-de-bbva)
  - [A2 — Horarios reales por consultorio](#a2--horarios-reales-por-consultorio)
  - [A3 — Prueba en iPhone](#a3--prueba-en-iphone)
- [Media](#media)
  - [M1 — Dominio propio](#m1--dominio-propio)
  - [M2 — Medir clics en los botones](#m2--medir-clics-en-los-botones)
- [Baja](#baja)
  - [B1 — Subir a TypeScript 7](#b1--subir-a-typescript-7)
  - [B2 — Paquetes «extraneous» en npm ls](#b2--paquetes-extraneous-en-npm-ls)
- [Cerrados](#cerrados)

## Alta

### A1 — CLABE de BBVA
- **Qué es:** mostrar la CLABE de 18 dígitos junto a la tarjeta.
- **Por qué se pospone:** el dato no existe todavía. En `info/` solo hay el número de tarjeta.
- **De dónde viene:** Etapa 1, 2026-10-07.
- **Para cerrarla:** el autor da la CLABE (empieza con 012). Se agrega a `src/content/` con su prueba dígito por dígito (P8).

### A2 — Horarios reales por consultorio
- **Qué es:** el horario de Tula y el de Pachuca, que son distintos.
- **Por qué se pospone:** el autor no tiene el reparto. Mientras tanto, ambos muestran lunes a sábado, 8:00–18:00, «sujeto a cambios, confirma por WhatsApp».
- **De dónde viene:** Etapa 1, 2026-10-07.
- **Para cerrarla:** el autor da los días y horas de cada consultorio.

### A3 — Prueba en iPhone
- **Qué es:** probar la página en Safari de iOS, en especial el botón de copiar.
- **Por qué se pospone:** el autor solo tiene Android y PC.
- **De dónde viene:** Etapa 1, ronda 3, 2026-10-07.
- **Para cerrarla:** alguien con iPhone sigue el protocolo de prueba en hardware y reporta sí/no por botón.

## Media

### M1 — Dominio propio
- **Qué es:** publicar en un dominio propio (por ejemplo, `integraciondental.mx`).
- **Por qué se pospone:** el autor lo quiere, pero después de la v1.
- **De dónde viene:** Etapa 1, ronda 3, 2026-10-07.
- **Para cerrarla:** elegir y comprar el dominio, y configurar el DNS en Vercel.

### M2 — Medir clics en los botones
- **Qué es:** contar cuántas personas tocan WhatsApp y los datos bancarios.
- **Por qué se pospone:** la v1 mide la confianza con la aprobación del dentista.
- **De dónde viene:** brief, criterio de éxito 6, 2026-10-07.
- **Para cerrarla:** elegir una analítica sin cookies (por ejemplo, Vercel Web Analytics) con un ADR, y revisar el aviso de privacidad.

## Baja

### B1 — Subir a TypeScript 7
- **Qué es:** pasar de TypeScript 5.9.3 a la 7.x.
- **Por qué se pospone:** su compatibilidad con Next 16.4 no está verificada.
- **De dónde viene:** Fase 2.1, 2026-10-07.
- **Para cerrarla:** que Next declare soporte para la 7.x y que la suite y el build pasen.

### B2 — Paquetes «extraneous» en npm ls
- **Qué es:** `npm ls` marca `@img/sharp-wasm32` y `@emnapi/runtime` como «extraneous».
- **Por qué se pospone:** son opcionales de Next y no afectan a las pruebas.
- **De dónde viene:** Fase 2.1, 2026-10-07.
- **Para cerrarla:** solo si estorba. Probar `npm ci` limpio y ver si desaparecen.

## Cerrados
- Ninguno todavía.
