# Integración Dental — landing page

Página web del C.D. José Ángel Jiménez Tapia, especialista en Ortodoncia.
Muestra sus servicios, sus dos consultorios y sus horarios.
Tiene dos botones: WhatsApp directo y datos bancarios.

## Requisitos

- Node 24 o superior (comprobado con v24.15.0).
- npm 11 (comprobado con 11.12.1).
- Git Bash en Windows 11.

Comprueba tus versiones:

```bash
node --version
npm --version
```

## Instalación

```bash
npm install
```

Las versiones están fijadas en `package.json`. `.npmrc` usa `save-exact=true`, así que nada sube de versión solo.

## Primera ejecución

Correr las pruebas:

```bash
npm test
```

Levantar el sitio en modo desarrollo (cuando exista la meta 001):

```bash
npm run dev
```

Después abre http://localhost:3000.

## Estructura

| Carpeta | Qué contiene |
|---|---|
| `src/app/` | Las páginas de Next.js (interfaz). |
| `src/lib/` | La lógica pura, sin interfaz. |
| `src/content/` | Los datos del dentista, revisados por el autor. |
| `public/` | Imágenes y archivos estáticos. |
| `tests/` | Las pruebas (Vitest). |
| `scripts/` | Utilidades de mantenimiento. |
| `docs/` | Constitución, arquitectura, decisiones, contexto, backlog. |
| `specs/` | Las metas en flujo SDD. |

## Datos sensibles

La carpeta `info/` tiene fotos originales con datos bancarios.
Está en `.gitignore`. No se sube al repositorio.
