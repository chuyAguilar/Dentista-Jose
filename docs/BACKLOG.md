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
  - [A7 — Plan de Vercel para uso comercial](#a7--plan-de-vercel-para-uso-comercial)
  - [A8 — Correo del dentista](#a8--correo-del-dentista)
  - [A9 — Logotipo real del consultorio](#a9--logotipo-real-del-consultorio)
- [Media](#media)
  - [M1 — Dominio propio](#m1--dominio-propio)
  - [M2 — Medir clics en los botones](#m2--medir-clics-en-los-botones)
  - [M3 — Los roles pueden escribir por Bash](#m3--los-roles-pueden-escribir-por-bash)
  - [M7 — Pasos de mapas en la prueba de Android](#m7--pasos-de-mapas-en-la-prueba-de-android)
  - [M8 — Correr npm test en cada push](#m8--correr-npm-test-en-cada-push)
  - [M9 — Qué cédula va con qué título](#m9--qué-cédula-va-con-qué-título)
- [Baja](#baja)
  - [B1 — Subir a TypeScript 7](#b1--subir-a-typescript-7)
  - [B2 — Paquetes «extraneous» en npm ls](#b2--paquetes-extraneous-en-npm-ls)
  - [B3 — El hook global no ve alias ni scripts](#b3--el-hook-global-no-ve-alias-ni-scripts)
  - [B4 — Falsos positivos de la palabra «info»](#b4--falsos-positivos-de-la-palabra-info)
  - [B5 — Pruebas de componente o de punta a punta](#b5--pruebas-de-componente-o-de-punta-a-punta)
  - [B6 — Archivos .gitkeep que sobran](#b6--archivos-gitkeep-que-sobran)
  - [B7 — vercel.json para encabezados e instalación](#b7--verceljson-para-encabezados-e-instalación)
  - [B8 — next dev crea AGENTS.md](#b8--next-dev-crea-agentsmd)
- [Cerrados](#cerrados)
  - [A5 — Despliegue en Vercel y prueba en Android](#a5--despliegue-en-vercel-y-prueba-en-android)
  - [M4 — Probar el respaldo del copiado en Android](#m4--probar-el-respaldo-del-copiado-en-android)
  - [M6 — Etiquetas de los datos de pago](#m6--etiquetas-de-los-datos-de-pago)
  - [M5 — Metadatos para SEO y para compartir](#m5--metadatos-para-seo-y-para-compartir)

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
- **Para cerrarla:** al cerrar la meta 004 (ADR-012), PageSpeed Insights móvil sobre producción, mediana de 3 corridas, ≥ 90 en las cuatro categorías.

### A7 — Plan de Vercel para uso comercial
- **Qué es:** decidir el plan de Vercel antes de anunciar la página a los pacientes.
- **Por qué se pospone:** según el plan 002, las reglas de Vercel limitan el plan Hobby (gratis) al uso personal y no comercial. La página es de un consultorio. Hay que leer el texto vigente en la página de precios de Vercel.
- **De dónde viene:** plan 002, clarify #12, 2026-10-07.
- **Para cerrarla:** el autor lee las reglas vigentes y elige el plan (Hobby, Pro u otro hosting) antes del lanzamiento. Si cambia el hosting, nuevo ADR.

### A8 — Correo del dentista
- **Qué es:** mostrar el correo de la tarjeta de presentación en el pie.
- **Por qué se pospone:** solo está en la referencia (REF-01, REF-03) y ningún agente la lee (P1). No se adivina.
- **De dónde viene:** meta 003, 2026-10-07.
- **Para cerrarla:** el autor da el correo por escrito. Va a `src/content/` con su prueba.

### A9 — Logotipo real del consultorio
- **Qué es:** usar el logotipo de «Integración Dental» (REF-04) en la barra, el ícono y la imagen para compartir.
- **Por qué se pospone:** solo existe en la referencia, que ningún agente abre (P1). Hoy se usa un diente dibujado.
- **De dónde viene:** meta 004, 2026-10-07.
- **Para cerrarla:** el autor pone el logotipo en SVG o PNG en `public/` (sin datos bancarios en la imagen) y avisa.

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

### M7 — Pasos de mapas en la prueba de Android
- **Qué es:** los pasos 7 y 8 de `/prueba-android` («Cómo llegar» a Tula y a Pachuca).
- **Por qué se pospone:** los mapas no existen hasta la meta 003.
- **De dónde viene:** plan 002, clarify #7, 2026-10-07.
- **Para cerrarla:** con la 003 publicada, el autor toca «Cómo llegar» de Tula y de Pachuca en Android: 2 de 2 en «sí».

### M8 — Correr npm test en cada push
- **Qué es:** que cada push corra la suite antes de publicar (por ejemplo, en el build de Vercel o en GitHub Actions).
- **Por qué se pospone:** hoy el autor corre `npm test` antes de cada commit; la meta 002 solo publica.
- **De dónde viene:** plan 002, 2026-10-07.
- **Para cerrarla:** elegir dónde corre la suite, con un ADR, y comprobar que un fallo detiene la publicación.

### M9 — Qué cédula va con qué título
- **Qué es:** decir cuál cédula es de Cirujano Dentista y cuál de la especialidad en Ortodoncia.
- **Por qué se pospone:** el brief da los dos números sin asignarlos. Hoy se muestran como «Cédula 3490657» y «Cédula 6595318» (clarify 003 #3).
- **De dónde viene:** meta 003, 2026-10-07.
- **Para cerrarla:** el autor confirma el reparto con la tarjeta de papel.

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

### B7 — vercel.json para encabezados e instalación
- **Qué es:** declarar en el repo los encabezados de seguridad y el Install Command, en vez de fijarlos en el panel de Vercel.
- **Por qué se pospone:** los encabezados no cuentan en Lighthouse y `role-guard.mjs` no deja a `desarrollo` escribir `vercel.json` (ADR-009).
- **De dónde viene:** plan 002, 2026-10-07.
- **Para cerrarla:** solo si estorba. Permitir `vercel.json` en `role-guard.mjs` (sesión normal), con su prueba en el arnés.

### B8 — next dev crea AGENTS.md
- **Qué es:** Next 16.4 escribe `AGENTS.md` en la raíz cada vez que corre `next dev`, con instrucciones para agentes de IA. Si se borra, lo vuelve a crear. Se apaga con `agentRules: false` en `next.config.ts`, según el aviso del propio `next dev`.
- **Por qué se pospone:** el plan 002 no toca `next.config.ts` ni `.gitignore`. Elegir entre apagarlo, ignorarlo o versionarlo es decisión del autor.
- **De dónde viene:** bloque 1 de la meta 002, 2026-10-07 (prueba de `next dev -H`).
- **Para cerrarla:** el autor elige. Recomendación: `agentRules: false` en `next.config.ts`, porque el arnés ya guía a los agentes desde `CLAUDE.md` y la documentación instalada. Mientras tanto, la guía 002 pide borrarlo después del paso 10.

## Cerrados

### A5 — Despliegue en Vercel y prueba en Android
- **Qué es:** publicar en Vercel (vista previa y producción) y correr `/prueba-android` con HTTPS real (antes C8 de la meta 001).
- **Por qué se pospone:** sin HTTPS, Chrome en Android no deja copiar al portapapeles. El autor prefirió esperar a Vercel (clarify 001 #1).
- **De dónde viene:** plan y clarify 001, 2026-10-07.
- **Para cerrarla:** en la meta 002, desplegar y obtener 7 de 7 pasos aplicables en `/prueba-android` (pasos 7 y 8 en la meta 003, M7).
- **Cerrada:** 2026-10-07, meta 002. Producción en https://dentista-jose.vercel.app, `check-deploy` código 0, Android 7 de 7.

### M4 — Probar el respaldo del copiado en Android
- **Qué es:** forzar el fallo del portapapeles y comprobar que aparece el campo con los 16 dígitos y «Mantén presionado para copiar».
- **Por qué se pospone:** la lógica del respaldo se prueba con Vitest en la 001; falta verlo en un teléfono.
- **De dónde viene:** plan 001, 2026-10-07.
- **Para cerrarla:** un paso extra en `/prueba-android` durante la meta 002.
- **Cerrada:** 2026-10-07, meta 002. Paso 10 en «sí» por red local.

### M6 — Etiquetas de los datos de pago
- **Qué es:** poner «Banco», «Titular» y «Tarjeta» junto a cada dato del bloque de pago.
- **Por qué se pospone:** esos textos no están aprobados (P8, clarify 001 #9). En la 001 los datos van sin etiqueta.
- **De dónde viene:** bloque 1 de la meta 001, 2026-10-07.
- **Para cerrarla:** el autor aprueba los textos en la meta 003 (secciones completas) y van a `src/content/`.
- **Cerrada:** 2026-10-07, meta 003. Etiquetas «Tarjeta de débito» y «Titular» en `src/content/` (tácito, ADR-008; el autor las revisa en la paridad).

### M5 — Metadatos para SEO y para compartir
- **Qué es:** descripción, Open Graph e ícono, para que el enlace se vea bien al compartirlo por WhatsApp.
- **Por qué se pospone:** no es parte del esqueleto caminante.
- **De dónde viene:** plan 001, 2026-10-07.
- **Para cerrarla:** en la meta 004 (diseño y marca), con la vista previa del enlace comprobada en WhatsApp.
- **Cerrada:** 2026-10-07, meta 004. Descripción, Open Graph con `og.png` de 1200×630, ícono SVG y color de tema. Falta ver la vista previa real en WhatsApp después del push.
