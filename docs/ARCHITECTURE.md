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
| Contenido | `src/content/` | Datos del dentista: nombre, cédulas, servicios, consultorios, horarios, contacto, banco. Solo datos. | hecho en 001: nombre, especialidad, teléfono, mensaje, banco y textos (`dentist.ts`). Resto: 002 |
| Lógica | `src/lib/` | Funciones puras: arma el enlace de WhatsApp y el de Google Maps, agrupa dígitos de tarjeta y CLABE. Sin React ni DOM. | hecho en 001: WhatsApp, dígitos y copiado. Google Maps y CLABE: después |
| Interfaz | `src/app/` | La página y sus secciones. Lee el contenido y llama a la lógica. | hecho en 001: página mínima. Secciones y diseño: 002 |
| Botón de copiar | `src/app/` | Único componente de cliente. Copia al portapapeles el dato bancario. | hecho en 001 (`CopyButton.tsx`). Prueba en Android: 002 (A5) |
| Estáticos | `public/` | Imágenes optimizadas y el ícono. | vacío. Meta 002 |
| Verificación del despliegue | `scripts/check-deploy.mjs` | Pide la URL publicada y exige 200 sobre HTTPS y los mismos marcadores que `out/index.html` (WhatsApp y tarjeta agrupada). Sin dependencias (ADR-011). | hecho en 002 (bloque 1). Pruebas sin red en `tests/check-deploy.test.ts` |
| Pruebas | `tests/` | Vitest para la lógica y el contenido. Playwright y Lighthouse para la página (por confirmar en el plan 001). | Vitest: contenido, lógica y HTML final; peso con `scripts/measure-weight.mjs` (ADR-005, ADR-006). Lighthouse: 002 (A4) |

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
