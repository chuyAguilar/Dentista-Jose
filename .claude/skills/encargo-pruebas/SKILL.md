---
name: encargo-pruebas
description: Escribe el encargo para el agente de pruebas al cerrar una meta, en Claude outputs/pruebas/<meta>/encargo.md.
disable-model-invocation: true
argument-hint: NNN-nombre
---

# /encargo-pruebas $ARGUMENTS

Escribe `Claude outputs/pruebas/$ARGUMENTS/encargo.md` con esta plantilla y se detiene.

```
# Encargo de pruebas — $ARGUMENTS
Fecha: AAAA-MM-DD
Commit a probar: <hash corto de HEAD, comprobado con git log -1>

## Qué se entregó
<lista de lo que la meta construyó, desde spec.md>

## Criterios a comprobar
<cada criterio de cierre del spec, con su umbral y el comando o la medición>

## Cómo se prueba
1. git status --short debe salir vacío. Si no, detenerse y reportar.
2. npm ci
3. npm test (timeout 300 000 ms)
4. <mediciones propias de la meta>

## Fuera del encargo
<lo que no se prueba y por qué>

## Qué devolver
Entrada nueva en docs/PRUEBAS.md: fecha · commit · criterio → número → pasa/falla · hallazgos.
```

Al terminar, dile al autor cómo lanzar al agente:
`claude --agent pruebas "Ejecuta el encargo Claude outputs/pruebas/$ARGUMENTS/encargo.md"`
