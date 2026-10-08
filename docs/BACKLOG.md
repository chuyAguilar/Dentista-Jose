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
  - [A4 — Lighthouse móvil completo](#a4--lighthouse-móvil-completo)
  - [A5 — Despliegue en Vercel y prueba en Android](#a5--despliegue-en-vercel-y-prueba-en-android)
- [Media](#media)
  - [M1 — Dominio propio](#m1--dominio-propio)
  - [M2 — Medir clics en los botones](#m2--medir-clics-en-los-botones)
  - [M3 — Los roles pueden escribir por Bash](#m3--los-roles-pueden-escribir-por-bash)
  - [M4 — Probar el respaldo del copiado en Android](#m4--probar-el-respaldo-del-copiado-en-android)
  - [M5 — Metadatos para SEO y para compartir](#m5--metadatos-para-seo-y-para-compartir)
  - [M6 — Etiquetas de los datos de pago](#m6--etiquetas-de-los-datos-de-pago)
- [Baja](#baja)
  - [B1 — Subir a TypeScript 7](#b1--subir-a-typescript-7)
  - [B2 — Paquetes «extraneous» en npm ls](#b2--paquetes-extraneous-en-npm-ls)
  - [B3 — El hook global no ve alias ni scripts](#b3--el-hook-global-no-ve-alias-ni-scripts)
  - [B4 — Falsos positivos de la palabra «info»](#b4--falsos-positivos-de-la-palabra-info)
  - [B5 — Pruebas de componente o de punta a punta](#b5--pruebas-de-componente-o-de-punta-a-punta)
  - [B6 — Archivos .gitkeep que sobran](#b6--archivos-gitkeep-que-sobran)
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

### A4 — Lighthouse móvil completo
- **Qué es:** medir Lighthouse móvil ≥ 90 en las cuatro categorías (P9).
- **Por qué se pospone:** la meta 001 mide el peso con un script propio (ADR-005).
- **De dónde viene:** plan 001, 2026-10-07.
- **Para cerrarla:** en la meta 002, correr Lighthouse sobre la URL de Vercel y reportar los cuatro puntajes.

### A5 — Despliegue en Vercel y prueba en Android
- **Qué es:** publicar en Vercel (vista previa y producción) y correr `/prueba-android` con HTTPS real (antes C8 de la meta 001).
- **Por qué se pospone:** sin HTTPS, Chrome en Android no deja copiar al portapapeles. El autor prefirió esperar a Vercel (clarify 001 #1).
- **De dónde viene:** plan y clarify 001, 2026-10-07.
- **Para cerrarla:** en la meta 002, desplegar y obtener 9 de 9 en `/prueba-android`.

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

### M3 — Los roles pueden escribir por Bash
- **Qué es:** el hook de rol revisa Write, Edit y NotebookEdit. Un rol con Bash puede escribir un archivo con una redirección (`>`).
- **Por qué se pospone:** analizar todo comando de shell es frágil. Los roles con Bash son `direccion`, `desarrollo` y `pruebas`.
- **De dónde viene:** Fase 2.8, 2026-10-07.
- **Para cerrarla:** que el hook de rol niegue en Bash las redirecciones y `tee` hacia rutas fuera del rol, con sus pruebas. Mientras tanto, `git diff` del autor antes de cada commit lo detecta.

### M4 — Probar el respaldo del copiado en Android
- **Qué es:** forzar el fallo del portapapeles y comprobar que aparece el campo con los 16 dígitos y «Mantén presionado para copiar».
- **Por qué se pospone:** la lógica del respaldo se prueba con Vitest en la 001; falta verlo en un teléfono.
- **De dónde viene:** plan 001, 2026-10-07.
- **Para cerrarla:** un paso extra en `/prueba-android` durante la meta 002.

### M5 — Metadatos para SEO y para compartir
- **Qué es:** descripción, Open Graph e ícono, para que el enlace se vea bien al compartirlo por WhatsApp.
- **Por qué se pospone:** no es parte del esqueleto caminante.
- **De dónde viene:** plan 001, 2026-10-07.
- **Para cerrarla:** en la meta 002, con la vista previa del enlace comprobada en WhatsApp.

### M6 — Etiquetas de los datos de pago
- **Qué es:** poner «Banco», «Titular» y «Tarjeta» junto a cada dato del bloque de pago.
- **Por qué se pospone:** esos textos no están aprobados (P8, clarify 001 #9). En la 001 los datos van sin etiqueta.
- **De dónde viene:** bloque 1 de la meta 001, 2026-10-07.
- **Para cerrarla:** el autor aprueba los textos en la meta 002 y van a `src/content/`.

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

### B3 — El hook global no ve alias ni scripts
- **Qué es:** `guard.mjs` lee el texto del comando. No ve un alias de git, un script que haga commit por dentro, ni una ruta a `info/` armada con variables.
- **Por qué se pospone:** no hay alias ni scripts así en el repo. Los agentes no pueden crearlos en `.claude/` y una negación nunca se rodea (CLAUDE.md §4).
- **De dónde viene:** Fase 2.8, 2026-10-07.
- **Para cerrarla:** solo si aparece un caso. Agregar el patrón a `guard.mjs` y su prueba en `tests/harness.test.ts`.

### B4 — Falsos positivos de la palabra «info»
- **Qué es:** el hook niega comandos de shell que usan «info» como palabra suelta, por ejemplo `npm info`.
- **Por qué se pospone:** se prefiere negar de más (P1). Para versiones existe `npm view`.
- **De dónde viene:** Fase 2.8, 2026-10-07.
- **Para cerrarla:** solo si estorba. Afinar la expresión de `guard.mjs` y agregar el caso a las pruebas.

### B5 — Pruebas de componente o de punta a punta
- **Qué es:** Testing Library o Playwright para probar la interfaz en automático.
- **Por qué se pospone:** con una sola página, la lógica en `src/lib/` y la prueba en Android bastan (ADR-006).
- **De dónde viene:** plan 001, 2026-10-07.
- **Para cerrarla:** solo si la interfaz crece. Nuevo ADR y versión comprobada con `npm view`.

### B6 — Archivos .gitkeep que sobran
- **Qué es:** `src/app/`, `src/content/` y `src/lib/` ya tienen código, pero conservan su `.gitkeep`.
- **Por qué se pospone:** no estorban y borrarlos no lo pide el plan 001.
- **De dónde viene:** bloque 1 de la meta 001, 2026-10-07.
- **Para cerrarla:** borrarlos en cualquier bloque que toque esas carpetas.

## Cerrados
- Ninguno todavía.
