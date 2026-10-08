# Plan 002 — publicación

Última actualización: 2026-10-07
Sin código. Solo nombres, firmas y criterios.
Spec: `specs/002-publicacion/spec.md`, aprobado el 2026-10-07 (tácito, ADR-008).

## Índice
- [Archivos que crea o modifica](#archivos-que-crea-o-modifica)
- [Firmas](#firmas)
- [Respuestas a las preguntas del spec](#respuestas-a-las-preguntas-del-spec)
- [Choques y riesgos](#choques-y-riesgos)
- [Fases](#fases)
- [ADR propuestos](#adr-propuestos)
- [Al BACKLOG](#al-backlog)
- [Dependencias nuevas](#dependencias-nuevas)
- [Preguntas abiertas](#preguntas-abiertas)

## Archivos que crea o modifica
| Ruta | Acción | Para qué |
|---|---|---|
| `scripts/check-deploy.mjs` | crea | Mide C2 y C3 contra la URL publicada. Sin dependencias. |
| `tests/check-deploy.test.ts` | crea | Prueba el script sin red: corre como proceso hijo con `--html` (P7, ADR-005). |
| `package.json` | modifica | Agrega `check-deploy` y `precheck-deploy`. `engines.node` pasa a `"24.x"` (propuesta, pregunta 9). No agrega paquetes. |
| `Claude outputs/002-publicacion/guia-publicar.md` | crea | Guía paso a paso para el autor (P11). Fuera de git (pregunta 11). |
- No se crea `vercel.json` (pregunta 3). El rol `desarrollo` tampoco puede escribirlo: `role-guard.mjs` no lo permite.
- No se tocan `src/`, `next.config.ts`, `tsconfig.json`, `.gitignore` ni `tests/build-output.test.ts`.
- Excepción condicional: un arreglo pequeño de Lighthouse en la fase 5 (pregunta 4). Se reporta antes de hacerlo.
- La carpeta sensible (P1) no se abre ni se nombra en la guía. La comprobación previa al push usa `git ls-files` y el historial.

## Firmas
**Script (`scripts/check-deploy.mjs`).** Funciones puras exportadas, más una con red.
- `type Markers = { whatsappHref: string | null; groupedCard: string | null }`
- `extractMarkers(html: string): Markers` · primer `href` que empieza con `https://wa.me/` y primer nodo de texto con cuatro grupos de cuatro dígitos. No trae dígitos escritos en el script.
- `checkTarget(url: string): string | null` · motivo si la URL no es `https:` o no se puede leer; `null` si sirve. Corre antes de cualquier petición.
- `fetchPage(url: string): Promise<{ status: number; finalUrl: string; html: string }>` · única función con red. Sigue redirecciones. Si el certificado no es válido, `fetch` de Node lanza y se reporta como fallo de C2.
- `checkDeploy(localHtml: string, remote: { status: number; finalUrl: string; html: string }): { ok: boolean; problems: string[] }` · pura. Pide estado 200, `finalUrl` en `https:` y marcadores iguales a los de `out/index.html`. Falla también si `out/index.html` no trae algún marcador.
- No compara byte a byte: el id del build cambia entre builds.
- Uso: `node scripts/check-deploy.mjs <url> [--json]` · contra la página publicada.
- Uso sin red: `node scripts/check-deploy.mjs --html <archivo> [--json]` · compara un archivo local con `out/index.html`, como si fuera la respuesta remota (estado 200, `https:`).
- Sale con 0 si todo coincide y con 1 si no. Si falta `out/index.html`, pide `npm run build` y sale con 1.
- `--json` imprime `{ ok, problems, markers }`. Nunca imprime el HTML.

**`package.json`.**
- `"check-deploy": "node scripts/check-deploy.mjs"` · se usa `npm run check-deploy -- <url>`.
- `"precheck-deploy": "next build"` · así nunca compara contra un `out/` viejo (mismo porqué que ADR-007).

**Pruebas (`tests/check-deploy.test.ts`).** Sin red. Corre el script como proceso hijo, igual que `build-output.test.ts`.
- `--html out/index.html` → código 0, `problems` vacío (C3, caso bueno).
- Copia de `out/index.html` sin el enlace de WhatsApp, en una carpeta temporal → código 1 y un problema que nombra WhatsApp.
- Copia con la tarjeta agrupada alterada (dígitos derivados del propio HTML, no escritos en la prueba) → código 1 y un problema que nombra la tarjeta.
- URL `http://` → código 1 con «no es https», sin hacer la petición.
- Por qué proceso hijo: `tsconfig.json` incluye `tests/` en modo estricto e importar un `.mjs` sin tipos rompería el build (pregunta 8).

**Guía (`Claude outputs/002-publicacion/guia-publicar.md`).** Secciones, cada una con el clic o comando exacto y el resultado esperado.
1. Qué vas a hacer y por qué (remoto, Vercel, producción y vista previa, en palabras simples).
2. Antes del push: `git status` limpio y comprobación P1 (fase 2 deja el número).
3. Cuenta de GitHub, si no tienes. Verificación en dos pasos recomendada.
4. Repositorio privado vacío: sin README, sin `.gitignore` y sin licencia, para que no choque con tu historial.
5. Conectar y subir: `git branch --show-current`, `git remote add origin <url>`, `git remote -v`, `git push -u origin <rama>`. El primer push abre el navegador para iniciar sesión (Git Credential Manager).
6. Cuenta de Vercel con «Continue with GitHub». Plan: ver pregunta 12.
7. Dar acceso a Vercel solo a ese repositorio («Only select repositories»).
8. Importar el proyecto: Next.js detectado, Root Directory `./`, Install Command `npm ci`, sin variables de entorno, Deploy.
9. Ajustes después del primer despliegue: Node.js 24.x en Settings › Build and Deployment.
10. Ver el despliegue: Deployments, Build Logs, la URL de producción. Correr `npm run check-deploy -- <url>`.
11. Vista previa (pregunta 10).
12. Android: `/prueba-android <url>` más el paso 10 del respaldo (preguntas 5 y 7).
13. PageSpeed Insights: pagespeed.web.dev, pestaña Móvil, tres corridas, qué números copiar y cómo copiar el enlace del informe.
14. Qué le reportas a `direccion`: tabla con URL, números y enlaces.
15. Si algo falla: build rojo en Vercel, 404, push rechazado. Qué copiar del log.

## Respuestas a las preguntas del spec
Todas son «propuesta». Con ADR-008 avanzan con la recomendada; el autor las revisa en el commit.
1. **Remoto.** GitHub privado con la integración Git de Vercel. Se adopta la recomendación de dirección. Sin CLI de Vercel. Cada push a la rama principal publica producción; cada push a otra rama crea una vista previa. Privado porque el repo trae pruebas con datos exactos y el arnés.
2. **Lighthouse.** PageSpeed Insights en el navegador, pestaña Móvil, sobre la URL de producción. Se adopta. Ajuste: tres corridas y se toma la mediana de cada categoría, porque el rendimiento varía entre corridas. Nunca sobre una vista previa: Vercel le pone `noindex` y la protege con inicio de sesión; SEO saldría bajo o no cargaría.
3. **Configuración.** Ninguna en el repo. Vercel detecta Next.js y sirve el export estático sin `vercel.json`. Los encabezados de seguridad no cuentan en el puntaje de buenas prácticas de Lighthouse: sus auditorías de esa familia son informativas. Además, con `output: 'export'` los `headers` de `next.config` no aplican, y `vercel.json` necesita cambiar `role-guard.mjs`. Lo único que se ajusta es el Install Command (`npm ci`, P6) en el panel de Vercel, y queda escrito en ADR-009. Encabezados: B7.
4. **Lighthouse < 90.** Se adopta con un límite claro. Se corrige aquí solo si no cambia texto visible ni estilos: metadatos en `layout.tsx` (por ejemplo, la descripción), atributos (`aria-*`, `lang`, `alt`) o la configuración. Todo lo demás va a A6 (Alta, meta 004).
5. **Respaldo del copiado (C5).** Se adopta: sin ganchos de prueba en producción. Por la red local con `http://<IP-de-la-PC>:3000` y `npm run dev -- -H 0.0.0.0`. Sin HTTPS, Chrome no expone `navigator.clipboard` y el respaldo aparece solo. Matiz: Next 16 puede bloquear recursos de desarrollo pedidos desde un origen que no es `localhost`. Si pasa, la página carga sin JavaScript y el botón no hace nada. `desarrollo` lo confirma con context7 en la fase 2 y escribe en la guía el comando que sí funciona (pregunta 5).
6. **Fases y bloques.** Cinco fases en tres bloques. Bloque 1 automático (fases 1–2). Bloque 2 del autor (fases 3–4). Bloque 3 automático y corto (fase 5).

## Choques y riesgos
Se reportan a `direccion`. No se resuelven en silencio.
- **C4 pide 9 de 9, pero la página no tiene los pasos 7 y 8.** `/prueba-android` prueba «Cómo llegar» de Tula y Pachuca. Los mapas llegan en la meta 003 y el spec 002 prohíbe secciones nuevas. Propuesta: pasos 7 y 8 «no aplica (meta 003)»; C4 se cumple con 7 de 7 aplicables; M7 los retoma. Pide corregir el texto de C4 en `spec.md` (pregunta 7).
- **Plan Hobby de Vercel y uso comercial.** Según las reglas de uso de Vercel, el plan Hobby es para uso personal y no comercial. La página de un consultorio es comercial. Decisión de costo del autor (P2). Hay que comprobar el texto vigente en la página de precios de Vercel (pregunta 12).
- **M5 y M6 dicen «meta 002» en el BACKLOG.** El spec 002 los deja fuera (M5 en la 004; contenido en la 003). Propuesta: `direccion` actualiza ese texto al cerrar la meta.
- **Comprobación P1 antes del push.** Un push sube todo el historial. Si alguna vez entró un archivo de la carpeta sensible, ya no se borra del remoto. La fase 2 lo mide antes.
- **`npm install` en Vercel.** Por omisión Vercel instala con `npm install`. Se fuerza `npm ci` en el panel (P6).
- **Versión de Node en Vercel.** Con `engines: ">=24.0.0"` Vercel puede elegir otra versión mayor. Propuesta: `"24.x"` (pregunta 9).
- **La palabra «info» en comandos.** El hook la niega (B4). La comprobación P1 usa comandos que no la nombran.

## Fases
`npm test` debe quedar en verde al cerrar cada fase con código (C1). Hoy: 125/125.

**Bloque 1 — fases 1 y 2. Automático. Un commit. Se detiene al final o en cuanto una fase falle.**

**Fase 1 — Script de verificación del despliegue.**
- Entrega: `scripts/check-deploy.mjs`, `tests/check-deploy.test.ts`, scripts y `engines` en `package.json`.
- Criterio C1: `npm test` en verde, con las 4 pruebas nuevas. Se reporta pasadas/totales.
- Criterio C3 (local): `node scripts/check-deploy.mjs --html out/index.html --json` sale con 0 y `problems` vacío.
- Criterio C7 (local): `npm run weight` ≤ 500 000 B gzip. No debe cambiar: el script no entra a la página.
- Cómo se mide: `npm test` (timeout 300 000 ms) y los dos comandos.
- Enseñar (P11): qué es `fetch`, qué es un código de estado HTTP y por qué no se compara byte a byte.

**Fase 2 — Guía para el autor y comprobación previa al push.**
- Entrega: `Claude outputs/002-publicacion/guia-publicar.md` con las 15 secciones de [Firmas](#firmas).
- Criterio P1: `git ls-files` y `git log --all --name-only --format=` muestran 0 rutas dentro de la carpeta sensible. Se reportan los dos conteos.
- Criterio C5 (preparación): la guía trae el comando exacto para abrir la página por la red local, confirmado con context7 para Next 16.4 (origen de desarrollo permitido o no). Si hace falta `allowedDevOrigins`, se reporta antes de tocar `next.config.ts`.
- Criterio de la guía: cada sección tiene el clic o comando exacto y el resultado esperado. Ninguna nombra la carpeta sensible.
- Cómo se mide: los dos conteos y una lectura de la guía contra la lista de secciones.
- Al cerrar el bloque: resumen con el número de cada fase, título de commit y `git add` exacto (P2). La guía no entra a git.

**Bloque 2 — fases 3 y 4. Lo hace el autor. Empieza después del commit del bloque 1.**
El agente espera: hace falta una acción del autor (P2, ADR-008).

**Fase 3 — Publicar (autor).**
- Entrega: repositorio privado en GitHub con el push hecho, proyecto en Vercel y URL de producción `*.vercel.app`.
- Criterio C2 (primera lectura): Vercel muestra el despliegue de producción en «Ready» y la URL abre con candado en el navegador.
- Criterio C2 y C3 (opcional, recomendado): `npm run check-deploy -- <url>` sale con 0.
- Cómo se mide: el autor reporta la URL, el nombre de la rama de producción y la salida del script.
- Enseñar (P11): qué es un remoto, qué hace `git push -u`, qué hace Vercel con cada push, qué es una vista previa, cómo leer el log del build.

**Fase 4 — Verificar en el teléfono y en PageSpeed (autor).**
- Entrega: hoja de `/prueba-android` en `Claude outputs/android/` y una tabla con los números de PageSpeed y el enlace del informe.
- Criterio C4: 7 de 7 pasos aplicables en «sí» sobre la URL de producción. Pasos 7 y 8 «no aplica (meta 003)» (pregunta 7).
- Criterio C5: paso 10 agregado a la hoja. Por la red local, tocar «Copiar»: aparece el campo con 16 dígitos sin espacios y el texto «Mantén presionado para copiar». Mantener presionado y pegar en una nota da los mismos 16 dígitos.
- Criterio C6: mediana de tres corridas en Móvil ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO.
- Criterio C7 (producción): «Total byte weight» del informe, convertido a bytes, ≤ 500 000.
- Cómo se mide: el autor llena la hoja y la tabla. Cada «no» va al BACKLOG con prioridad Alta.

**Bloque 3 — fase 5. Automático y corto. Un commit, que el autor sube por una rama (pregunta 10).**

**Fase 5 — Medir contra producción y cerrar la meta.**
- Entrega: números de C1–C7 en `tasks.md`, BACKLOG y memoria actualizados, ADR-009 a ADR-011 registrados por `direccion`.
- Criterio C1: `npm test` en verde.
- Criterio C2 y C3: `npm run check-deploy -- <url de producción> --json` sale con 0. Se reportan el estado, la URL final y los marcadores encontrados.
- Criterio C7: `npm run weight` y el número de PageSpeed de la fase 4.
- Si C6 < 90: se aplica la regla de la pregunta 4. Un arreglo pequeño exige un nuevo push del autor y repetir las tres corridas de PageSpeed.
- Vista previa: el autor sube el commit de cierre a una rama; Vercel la lista como «Preview» en «Ready»; luego la integra a la rama principal (pregunta 10).
- Cierre: rutina `cerrar-fase`, luego `encargo-pruebas` (CLAUDE.md §2.8). Se cierran A4, A5 y M4.

## ADR propuestos
Numeración propuesta. La asigna `direccion` al registrarlos.

**ADR-009 — Publicación: GitHub privado e integración Git de Vercel.**
- Decisión: el código vive en un repositorio privado de GitHub del autor. Vercel lo lee con su integración Git. La rama principal es producción; las demás ramas crean vistas previas. Install Command `npm ci` y Node 24.x fijados en el panel de Vercel. Sin `vercel.json`.
- Descartado: CLI de Vercel sin remoto. Pide instalar una herramienta, guardar un token y publicar a mano; no hay vista previa automática.
- Descartado: GitHub público. Expone el arnés y las pruebas con datos exactos sin necesidad.
- Porqué: cada push del autor publica solo, y el push sigue siendo del autor (P2).

**ADR-010 — Lighthouse con PageSpeed Insights.**
- Decisión: PageSpeed Insights en el navegador, Móvil, sobre la URL de producción. Mediana de tres corridas por categoría. Se guarda el enlace del informe.
- Descartado: el paquete `lighthouse` por línea de comandos. Dependencia grande, necesita Chrome y mide desde la PC, no desde la red.
- Porqué: cero dependencias. La URL es pública, así que no sale nada sensible (P1).

**ADR-011 — Verificación del despliegue con un script propio.**
- Decisión: `scripts/check-deploy.mjs` pide 200 sobre `https:` y compara el enlace de WhatsApp y la tarjeta agrupada con `out/index.html`. Los marcadores se extraen del HTML; el script no guarda datos. Las pruebas corren sin red con `--html`.
- Descartado: comparar byte a byte. El id del build cambia y daría falsos fallos.
- Porqué: C2 y C3 quedan repetibles con un comando, en cada publicación.

## Al BACKLOG
Ids propuestos. Los asigna `direccion`.
| Id | Entrada | Prioridad propuesta |
|---|---|---|
| A6 | Categoría de Lighthouse < 90 sin arreglo pequeño. Meta 004. Solo se abre si pasa. | Alta |
| A7 | Plan de Vercel para uso comercial antes de anunciar la página a pacientes (pregunta 12). | Alta |
| M7 | Pasos 7 y 8 de `/prueba-android` («Cómo llegar») cuando existan los mapas. Meta 003. | Media |
| M8 | Correr `npm test` en cada push (GitHub Actions o el build de Vercel), para que un push roto no llegue a producción. | Media |
| B7 | Encabezados de seguridad e Install Command en `vercel.json`. Pide permitir `vercel.json` en `role-guard.mjs` (sesión normal). | Baja |

## Dependencias nuevas
- Ninguna. El script usa `fetch` y los módulos de Node (`fs`, `path`, `os`, `child_process`).
- Herramientas externas sin instalar: GitHub, Vercel y PageSpeed Insights, todas en el navegador. Git Credential Manager ya viene con Git para Windows; el autor lo comprueba con `git credential-manager --version` en la guía.
- Considerada y descartada: `lighthouse`. Versión anotada en el plan 001: 13.5.0. Si el autor la elige, se vuelve a comprobar con `npm view lighthouse version` antes de instalar (P6).
- Considerada y descartada: CLI de Vercel (`vercel`). Si el autor la elige, se comprueba con `npm view vercel version`.

## Preguntas abiertas
Se copian a `clarify.md`. La recomendada va primero.
1. **Remoto y despliegue.** (a) GitHub privado + integración Git de Vercel (recomendada: publica en cada push, vista previa por rama, el push sigue siendo del autor) · (b) GitHub público (expone arnés y pruebas sin necesidad) · (c) CLI de Vercel sin remoto (token local, sin vista previa automática).
2. **Medición de Lighthouse.** (a) PageSpeed Insights Móvil sobre producción, mediana de tres corridas (recomendada: cero dependencias, mide desde la red) · (b) paquete `lighthouse` por línea de comandos · (c) Lighthouse de las DevTools de Chrome en la PC (depende de la PC del autor).
3. **Configuración en el repo.** (a) Ninguna; Install Command `npm ci` y Node 24.x en el panel, anotados en ADR-009 (recomendada: Vercel ya sirve el export y los encabezados no suben el puntaje) · (b) `vercel.json` con Install Command y encabezados (pide cambiar `role-guard.mjs` en una sesión normal) · (c) nada, y aceptar `npm install`.
4. **Si una categoría queda < 90.** (a) Se corrige aquí solo si no cambia texto visible ni estilos (metadatos, atributos, configuración); lo demás a A6, meta 004 (recomendada: cierra la meta sin invadir la 003 ni la 004) · (b) todo al BACKLOG · (c) todo en esta meta.
5. **Respaldo del copiado (C5).** (a) Red local por HTTP con `npm run dev -- -H 0.0.0.0`; si Next 16.4 bloquea el origen, se agrega `allowedDevOrigins` solo para desarrollo, previo aviso (recomendada: sin código de prueba en producción, el fallo es real) · (b) servir `out/` por la red local con un script propio (prueba el build real, pero es código extra) · (c) un parámetro de prueba en producción (descartada: deja un gancho en la página).
6. **Fases y bloques.** (a) 5 fases en 3 bloques: 1–2 automático, 3–4 del autor, 5 automático (recomendada: un commit de código y uno de cierre) · (b) 4 bloques, con publicar y verificar separados.
7. **Pasos 7 y 8 de `/prueba-android`.** (a) «No aplica (meta 003)»; C4 = 7 de 7 aplicables; M7 los retoma; `direccion` corrige C4 en `spec.md` (recomendada: los mapas no existen y el spec prohíbe secciones nuevas) · (b) adelantar los mapas a esta meta (rompe P4) · (c) dejar C4 abierto hasta la 003.
8. **Cómo se prueba el script.** (a) Funciones exportadas del `.mjs`; la prueba lo corre como proceso hijo con `--html`, sin red (recomendada: mismo patrón que ADR-005, no rompe el chequeo de tipos) · (b) lógica en `src/lib/deploy-check.ts` importada por Node con eliminación de tipos (depende de una función reciente de Node) · (c) `.mjs` con un archivo de tipos `.d.mts`.
9. **Versión de Node.** (a) `engines.node` = `"24.x"` y Node 24.x en Vercel (recomendada: misma versión mayor en la PC y en Vercel, P6) · (b) dejar `">=24.0.0"` y fijarla solo en el panel.
10. **Prueba de la vista previa.** (a) El commit de cierre de la meta se sube a la rama `cierre-002`; Vercel la lista como Preview en Ready; luego se integra con `git merge --ff-only` y push (recomendada: enseña el flujo que usarán las metas siguientes) · (b) rama de prueba con un commit vacío, borrada después · (c) no se comprueba.
11. **Dónde vive la guía.** (a) `Claude outputs/002-publicacion/guia-publicar.md`, fuera de git (recomendada: `desarrollo` puede escribirla hoy) · (b) `docs/guia-publicar.md`, versionada (pide cambiar `role-guard.mjs`).
12. **Plan de Vercel.** (a) Hobby mientras la página no se anuncia a pacientes (metas 002–004); A7 decide el plan antes del lanzamiento (recomendada: cero costo mientras se prueba, y la decisión queda registrada) · (b) Pro desde ahora (costo mensual) · (c) otro proveedor que permita uso comercial gratis (cambia ADR-002).
