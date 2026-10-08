# ARCHITECTURE — qué es el sistema

Última actualización: 2026-10-07
Este archivo describe la estructura. Solo cambia si cambia la estructura.

## Índice
- [Topología](#topología)
- [Componentes](#componentes)
- [Flujo de datos](#flujo-de-datos)
- [Contratos y formatos de salida](#contratos-y-formatos-de-salida)
- [Diagrama](#diagrama)

## Topología
- Es una sola página web estática.
- Next.js la genera en tiempo de build con exportación estática (`output: 'export'`).
- La salida es la carpeta `out/`: HTML, CSS, JS mínimo e imágenes.
- Vercel sirve `out/` desde su CDN, con HTTPS.
- No hay servidor propio, base de datos ni API.
- El navegador del paciente solo habla con Vercel, WhatsApp y Google Maps.

## Componentes
| Componente | Ruta | Responsabilidad | Estado |
|---|---|---|---|
| Contenido | `src/content/` | Datos del dentista: nombre, cédulas, servicios, consultorios, horarios, contacto, banco. Solo datos. | `dentist.ts`: todo menos correo (A8) y CLABE (A1); 001 y 003. `site.ts`: URL pública (004) |
| Lógica | `src/lib/` | Funciones puras: arma el enlace de WhatsApp y el de Google Maps, agrupa dígitos de tarjeta y CLABE. Sin React ni DOM. | WhatsApp, dígitos y copiado (001); Google Maps y teléfono (003, `maps.ts`, `phone.ts`). CLABE: A1 |
| Interfaz | `src/app/` | La página y sus secciones. Lee el contenido y llama a la lógica. | página completa y diseño (003); íconos SVG en línea (`icons.tsx`); fuente con `next/font`, metadatos, `icon.svg` y `og.png/route.tsx` (004) |
| Botón de copiar | `src/app/` | Único componente de cliente. Copia al portapapeles el dato bancario. | hecho en 001 (`CopyButton.tsx`). Probado en Android en 002 |
| Estáticos | `public/` | Imágenes que no se generan en el build. | vacío. El ícono y la imagen para compartir se generan desde `src/app/` (004) |
| Verificación del despliegue | `scripts/check-deploy.mjs` | Pide la URL publicada y exige 200 sobre HTTPS y los mismos marcadores que `out/index.html` (WhatsApp, tarjeta agrupada y lista de enlaces `https:` y `tel:`). Sin dependencias (ADR-011). | hecho en 002; lista de enlaces en 003. Pruebas sin red en `tests/check-deploy.test.ts` |
| Pruebas | `tests/` | Vitest para la lógica y el contenido. Playwright y Lighthouse para la página (por confirmar en el plan 001). | Vitest: contenido, lógica y HTML final; peso con `scripts/measure-weight.mjs` (ADR-005, ADR-006). Lighthouse: al cerrar 004 (A4, ADR-012) |

## Flujo de datos
1. El autor revisa los datos y los escribe en `src/content/`.
2. En el build, `src/app/` lee el contenido.
3. `src/app/` pide a `src/lib/` los enlaces y los formatos.
4. Next.js escribe el HTML final en `out/`.
5. Vercel publica `out/`.
6. El paciente toca un botón: WhatsApp abre el chat, o se copia el dato bancario.

## Contratos y formatos de salida
- **WhatsApp:** `https://wa.me/<código país + número>?text=<mensaje codificado en URL>`. México usa el código 52, sin el «1» antiguo.
- **Google Maps:** `https://www.google.com/maps/search/?api=1&query=<dirección codificada en URL>`.
- **Copiar:** el portapapeles recibe solo dígitos, sin espacios. En pantalla se muestran agrupados de 4 en 4.
- **Salida del build:** `out/index.html` y sus recursos. Peso total transferido ≤ 500 KB (P9).
- **Compartir:** `og:image` apunta a `<site.url>/og.png`, PNG de 1200×630 generado en el build. Un route handler y no `opengraph-image`: con exportación estática, este sale sin extensión.
- No hay contrato con otros sistemas.

## Diagrama
```
  autor ──revisa──▶ src/content/ (datos)
                         │
                         ▼
  src/lib/ (lógica pura) ◀── src/app/ (interfaz)
                         │
                    next build
                         ▼
                      out/ ──deploy──▶ Vercel CDN ──HTTPS──▶ celular del paciente
                                                              │          │
                                                    wa.me (chat)   portapapeles
                                                    Google Maps
```
