# Plan 001 — esqueleto caminante

Última actualización: 2026-10-07
Sin código. Solo nombres, firmas y criterios.
Spec: `specs/001-esqueleto-caminante/spec.md`, aprobado por el autor el 2026-10-07.

## Índice
- [Archivos que crea o modifica](#archivos-que-crea-o-modifica)
- [Firmas](#firmas)
- [Respuestas a las preguntas del spec](#respuestas-a-las-preguntas-del-spec)
- [Fases](#fases)
- [ADR propuestos](#adr-propuestos)
- [Al BACKLOG](#al-backlog)
- [Dependencias nuevas](#dependencias-nuevas)
- [Preguntas abiertas](#preguntas-abiertas)

## Archivos que crea o modifica
| Ruta | Acción | Para qué |
|---|---|---|
| `src/content/dentist.ts` | crea | Datos aprobados y textos de la página. Solo datos (P7). |
| `src/lib/whatsapp.ts` | crea | Arma el enlace de WhatsApp (C3). |
| `src/lib/digits.ts` | crea | Deja solo dígitos y los agrupa de 4 en 4 (C4, C6). |
| `src/lib/copy.ts` | crea | Decide qué va al portapapeles y cuándo usar el respaldo (C4). Sin DOM: recibe el portapapeles como parámetro. |
| `src/app/layout.tsx` | crea | Esqueleto HTML, `lang="es-MX"` y metadatos mínimos. |
| `src/app/page.tsx` | crea | La página mínima del spec. Componente de servidor. |
| `src/app/CopyButton.tsx` | crea | Único componente de cliente. Llama a `src/lib/copy.ts`. |
| `src/app/globals.css` | crea | Estilos mínimos para celular: texto legible y botones de 48 px de alto. No es el diseño final. |
| `next.config.ts` | crea | `output: 'export'` (ADR-002). |
| `scripts/measure-weight.mjs` | crea | Suma los bytes gzip de `out/index.html` y sus recursos (C7). Sin dependencias. |
| `package.json` | modifica | Agrega `pretest` (build antes de la suite) y `weight`. No agrega paquetes. |
| `tests/content.test.ts` | crea | Compara cada dato con su valor esperado, dígito por dígito (C2, P8). |
| `tests/whatsapp.test.ts` | crea | Enlace exacto (C3). |
| `tests/digits.test.ts` | crea | Solo dígitos y agrupado de 4 en 4 (C4). |
| `tests/copy.test.ts` | crea | Copiado con portapapeles falso: éxito, ausente y rechazo (C4, respaldo). |
| `tests/build-output.test.ts` | crea | Lee `out/index.html` como texto (C6) y corre el script de peso (C7). |
| `tests/smoke.test.ts` | borra (propuesta) | Ya no hace falta cuando hay pruebas reales. |
- `tests/harness.test.ts`, `vitest.config.mts`, `tsconfig.json` y `.gitignore` no se tocan. `out/` y `.next/` ya están ignorados.
- La carpeta sensible (P1) no se abre. El número de tarjeta lo escribe `desarrollo` desde lo que le pase `direccion`.

## Firmas
**Contenido (`src/content/dentist.ts`).**
- `type DentistContent` · campos: `title`, `name`, `specialty`, `phone: { countryCode, number }`, `whatsappMessage`, `bank: { name, holder, cardNumber }`, `texts`.
- `export const dentist: DentistContent`
- Valores: título «C.D.» · nombre «José Ángel Jiménez Tapia» · especialidad «Especialista en Ortodoncia» · código de país «52» · número «7711437889» · banco «BBVA» · titular «José Ángel Jiménez» · número de tarjeta, 16 dígitos, guardado sin espacios.
- `texts` (propuesta, de tú): «Agenda tu cita» · «Escríbeme por WhatsApp» · «Datos para tu pago» · «Copiar» · «Copiado» · «Mantén presionado para copiar».
- Mensaje de WhatsApp (propuesta, pregunta 4): «Hola, doctor. Quiero agendar una cita.»

**Lógica (`src/lib/`).**
- `buildWhatsAppUrl(countryCode: string, number: string, message: string): string` · devuelve `https://wa.me/<código><número>?text=<mensaje con encodeURIComponent>`. Lanza error si el código o el número traen algo que no sea dígito.
- `onlyDigits(value: string): string` · quita todo lo que no sea dígito.
- `groupDigits(digits: string, size?: number): string` · grupos de `size` (4 por omisión) separados por un espacio.
- `type ClipboardLike = { writeText(text: string): Promise<void> }`
- `type CopyOutcome = "copied" | "fallback"`
- `copyDigits(value: string, clipboard: ClipboardLike | undefined): Promise<CopyOutcome>` · escribe `onlyDigits(value)`. Devuelve `"fallback"` si no hay portapapeles o si rechaza.

**Interfaz (`src/app/`).**
- `export const metadata: Metadata` · título «C.D. José Ángel Jiménez Tapia · Especialista en Ortodoncia».
- `RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element`
- `Home(): React.JSX.Element` · llama a `buildWhatsAppUrl` y `groupDigits`. No formatea nada por su cuenta (P7).
- `CopyButton({ digits, label, copiedLabel, fallbackLabel }: CopyButtonProps): React.JSX.Element` · `"use client"`. Muestra el estado en una región `aria-live="polite"`.
- La tarjeta agrupada se pinta como un solo nodo de texto, para que C6 la encuentre literal en el HTML.

**Script (`scripts/measure-weight.mjs`).**
- `collectAssetPaths(html: string): string[]` · rutas locales únicas de `src=` y `href=` (las de `/_next/` y las de `public/`).
- `measureWeight(outDir: string): { files: string[]; gzipBytes: number }` · gzip nivel 9 de cada archivo, sumado.
- Uso: `node scripts/measure-weight.mjs [--json]`. Sale con código 1 si pasa de 500 000 bytes.
- La prueba lo corre como proceso hijo y lee el JSON. Así TypeScript no importa un `.mjs` sin tipos.

## Respuestas a las preguntas del spec
Todas son «propuesta» hasta que el autor responda en `clarify.md` (P2).
1. **Android.** Propuesta: `npm run dev` en la PC y el teléfono por USB con «reenvío de puertos» de Chrome (`chrome://inspect`). El teléfono abre `localhost:3000`, que cuenta como contexto seguro. Discute la recomendación de dirección: por red local con `http://192.168.x.x`, Chrome no expone `navigator.clipboard` (solo existe en HTTPS o localhost). El botón caería siempre al respaldo y los pasos 5 y 6 de C8 no se podrían cumplir. Alternativa sin cable: `next dev -H 0.0.0.0` más la bandera de Chrome «unsafely-treat-insecure-origin-as-secure» con la IP de la PC. Vercel queda en la meta 002, como propuso dirección.
2. **C7.** Se adopta: script propio, sin Lighthouse. Suma gzip de `out/index.html` y de los recursos que referencia. Umbral 500 000 bytes (pregunta 7). Lighthouse completo en la meta 002. Límite conocido: no cuenta trozos de JS que se cargan después; Lighthouse los verá en 002.
3. **Pruebas de componente.** Se adopta: sin Testing Library ni jsdom. `copyDigits` se prueba con un portapapeles falso. C6 se prueba leyendo `out/index.html`. El componente se prueba en Android (C8).
4. **Mensaje.** Se recomienda «Hola, doctor. Quiero agendar una cita.». Lo confirma el autor.
5. **Respaldo.** Se adopta con un ajuste. Si `navigator.clipboard` no existe o rechaza: aparece un campo de solo lectura con los 16 dígitos sin espacios, ya seleccionado, y el texto «Mantén presionado para copiar». El ajuste evita que el paciente copie la versión con espacios.
6. **Fases y bloques.** Cinco fases en dos bloques. Bloque 1: fases 1–4, todo lo automático, un commit. Bloque 2: fase 5, la verificación a mano del autor y el cierre de la meta.

## Fases
`npm test` debe quedar en verde al cerrar cada fase (C1). Desde la fase 4, `npm test` incluye el build.

**Bloque 1 — fases 1 a 4. Un commit. Se detiene al final o en cuanto una fase falle.**

**Fase 1 — Contenido.**
- Entrega: `src/content/dentist.ts` y `tests/content.test.ts`.
- Criterio: cada campo igual a su valor esperado; tarjeta con exactamente 16 dígitos; código de país «52»; número de 10 dígitos (C2, parte automática).
- Cómo se mide: `npm test`. Se reporta pasadas/totales.
- Propuesta: la prueba también revisa el dígito verificador de la tarjeta (algoritmo de Luhn). Atrapa un dígito mal tecleado.

**Fase 2 — Lógica.**
- Entrega: `src/lib/whatsapp.ts`, `digits.ts`, `copy.ts` y sus pruebas.
- Criterio C3: `buildWhatsAppUrl` con los datos de la fase 1 devuelve exactamente `https://wa.me/527711437889?text=Hola%2C%20doctor.%20Quiero%20agendar%20una%20cita.`
- Criterio C4: con un portapapeles falso, `copyDigits` escribe una cadena de 16 caracteres, todos dígitos, igual a la tarjeta del contenido.
- Criterio de respaldo: portapapeles ausente → `"fallback"`; portapapeles que rechaza → `"fallback"`.
- Cómo se mide: `npm test`.

**Fase 3 — Exportación estática y página.**
- Entrega: `next.config.ts`, `layout.tsx`, `page.tsx`, `CopyButton.tsx`, `globals.css`.
- Criterio C5: `npm run build` sale con código 0 y existe `out/index.html`.
- Cómo se mide: `npm run build` y comprobar el archivo.
- Antes de escribir: `desarrollo` confirma con context7 cómo se declara `output: 'export'` en Next 16.4 (ADR-004).
- Enseñar (P11): qué hace `next build`, qué es `out/` y qué es un componente de cliente.

**Fase 4 — HTML final y peso.**
- Entrega: `tests/build-output.test.ts`, `scripts/measure-weight.mjs`, `pretest` y `weight` en `package.json`. Se borra `tests/smoke.test.ts` (propuesta).
- Criterio C6: `out/index.html` contiene el enlace exacto de C3 en un `href` y la tarjeta agrupada de 4 en 4.
- Criterio C7: `npm run weight` reporta ≤ 500 000 bytes gzip. Se reporta el número exacto.
- Cómo se mide: `npm test` (corre el build antes) y `npm run weight`.
- Al cerrar el bloque: resumen con el número de cada fase, título de commit y `git add` exacto (P2).

**Bloque 2 — fase 5. Lo hace el autor. Empieza después del commit del bloque 1.**

**Fase 5 — Verificación del autor.**
- Entrega: hoja de `/paridad-tarjeta` y hoja de `/prueba-android`, ambas en `Claude outputs/` (fuera de git).
- Criterio C2: 100 % de «sí» en los 7 campos de esta meta (nombre, especialidad, teléfono, WhatsApp, banco, titular, tarjeta). Los demás campos se marcan «fuera de 001».
- Criterio C8: pasos 3, 5 y 6 de `/prueba-android`: 3 de 3 en «sí».
- Cómo se mide: el autor llena las hojas.
- Enseñar (P11): cómo activar la depuración USB y el reenvío de puertos de Chrome, paso a paso.
- Cierre: rutina `cerrar-fase`, luego `encargo-pruebas` (CLAUDE.md §2.8). Cada «no» va al BACKLOG con prioridad Alta.

## ADR propuestos
Numeración propuesta. La asigna `direccion` al registrarlos.

**ADR-005 — Medición del peso de la página.**
- Decisión: script propio que suma gzip (nivel 9) de `out/index.html` y de los recursos locales que referencia. Umbral: 500 000 bytes.
- Descartado: Lighthouse en esta meta. Agrega una dependencia grande y necesita Chrome.
- Porqué: es repetible, sin red y sin dependencias. Gzip es conservador frente a Brotli, que Vercel puede usar.

**ADR-006 — Pruebas de la interfaz en la meta 001.**
- Decisión: sin Testing Library, jsdom ni Playwright. La lógica del copiado vive en `src/lib/` con el portapapeles inyectado. El HTML final se prueba como texto. El botón se prueba en Android.
- Descartado: Testing Library con jsdom. jsdom no reproduce el portapapeles real de Android.
- Porqué: cero dependencias nuevas y P7 se cumple.

**ADR-007 — `npm test` construye antes de probar.**
- Decisión: `pretest` corre `next build`. Así C6 y C7 nunca leen un `out/` viejo.
- Descartado: que la prueba falle si no existe `out/`. Un `out/` viejo pasaría sin avisar.
- Porqué: un clon limpio con `npm ci && npm test` da el mismo resultado (P6). `npm run test:harness` no construye.

## Al BACKLOG
Ids propuestos. Los asigna `direccion`.
| Id | Entrada | Prioridad propuesta |
|---|---|---|
| A4 | Lighthouse móvil completo, ≥ 90 en las cuatro categorías (P9). Meta 002. | Alta |
| A5 | Despliegue en Vercel, vista previa y producción. Meta 002. | Alta |
| M4 | Probar a mano el respaldo del copiado en Android (forzar el fallo). | Media |
| M5 | Metadatos para SEO y para compartir (descripción, Open Graph, ícono). Meta 002. | Media |
| B5 | Pruebas de componente o de punta a punta (Playwright) si la interfaz crece. | Baja |

## Dependencias nuevas
- Ninguna. Todo lo de esta meta usa lo ya instalado y los módulos de Node (`zlib`, `fs`, `child_process`).
- Consideradas y descartadas (versiones comprobadas con `npm view` el 2026-10-07):

| Paquete | Versión | Para qué serviría | Alternativa sin dependencia |
|---|---|---|---|
| `lighthouse` | 13.5.0 | Medir C7 y P9 completo | Script gzip propio. Lighthouse en 002 (A4). |
| `@playwright/test` | 1.64.0 | Probar la página en un navegador | Leer `out/index.html` y prueba en Android. |
| `@testing-library/react` | 16.3.3 | Probar `CopyButton` | Lógica en `src/lib/copy.ts` con Vitest. |
| `@testing-library/dom` | 10.4.2 | Requisito de la anterior | Igual que la anterior. |
| `jsdom` | 30.1.2 | DOM simulado para Vitest | Igual que la anterior. |
| `@vitejs/plugin-react` | 6.1.2 | JSX en Vitest | No se prueban componentes en Vitest. |
- Si el autor elige otra cosa en `clarify.md`, se vuelve a comprobar la versión con `npm view` antes de instalar (P6).

## Preguntas abiertas
Se copian a `clarify.md`. La recomendada va primero.
1. **Prueba en Android.** (a) `npm run dev` + USB con reenvío de puertos de Chrome (recomendada) · (b) `next dev -H 0.0.0.0` + bandera de Chrome para tratar la IP como segura · (c) red local sin más (copiar siempre cae al respaldo; C8 no pasa) · (d) vista previa en Vercel (adelanta la meta 002).
2. **Medición de C7.** (a) Script propio gzip sobre `out/` (recomendada) · (b) Lighthouse ya en esta meta.
3. **Pruebas del botón «Copiar».** (a) Lógica en `src/lib/` con Vitest + Android (recomendada) · (b) Testing Library con jsdom.
4. **Mensaje de WhatsApp.** (a) «Hola, doctor. Quiero agendar una cita.» (recomendada) · (b) otro texto del autor.
5. **Respaldo del copiado.** (a) Campo seleccionado con los 16 dígitos sin espacios + «Mantén presionado para copiar» (recomendada) · (b) el número agrupado queda seleccionable (se copiaría con espacios) · (c) `document.execCommand('copy')` (obsoleto).
6. **Fases y bloques.** (a) 5 fases en 2 bloques: 1–4 automático, 5 del autor (recomendada) · (b) 3 bloques: contenido y lógica · página y medición · autor.
7. **Qué es «500 KB».** (a) 500 000 bytes gzip (recomendada, la más estricta) · (b) 512 000 bytes (500 × 1024).
8. **Build dentro de `npm test`.** (a) `pretest` corre `next build` (recomendada) · (b) script aparte `npm run verify`, y `npm test` falla si falta `out/`.
9. **Textos de la página.** (a) «Agenda tu cita», «Escríbeme por WhatsApp», «Datos para tu pago», «Copiar», «Copiado», «Mantén presionado para copiar» (recomendada) · (b) los cambia el autor.
10. **Prueba de Luhn de la tarjeta.** (a) Sí, como parte de C2 (recomendada) · (b) no.
11. **Borrar `tests/smoke.test.ts`.** (a) Sí, en la fase 4 (recomendada) · (b) dejarlo.
