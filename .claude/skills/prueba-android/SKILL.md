---
name: prueba-android
description: Protocolo de prueba a mano en el teléfono Android del autor. Genera la hoja de resultados para llenar.
disable-model-invocation: true
argument-hint: URL a probar
---

# /prueba-android $ARGUMENTS

Escribe `Claude outputs/android/AAAA-MM-DD.md` con este protocolo y se detiene.

Preparación:
- Teléfono Android con Chrome y WhatsApp instalados.
- Abrir $ARGUMENTS (la URL de Vercel o de la red local) en Chrome.

| # | Paso | Esperado | Resultado (sí/no) | Nota |
|---|---|---|---|---|
| 1 | Abrir la página con datos móviles | Carga completa en menos de 3 s | | |
| 2 | Leer la portada sin hacer zoom | Texto legible, nada se sale de la pantalla | | |
| 3 | Tocar «WhatsApp» | Abre WhatsApp con el chat del doctor y el mensaje escrito | | |
| 4 | Volver al navegador | La página sigue en su lugar | | |
| 5 | Tocar «Copiar» en la tarjeta | Aparece la confirmación «Copiado» | | |
| 6 | Pegar en una nota | Salen los 16 dígitos, sin espacios, iguales a la tarjeta | | |
| 7 | Tocar «Cómo llegar» de Tula | Abre Google Maps en la dirección de Tula | | |
| 8 | Tocar «Cómo llegar» de Pachuca | Abre Google Maps en la dirección de Pachuca | | |
| 9 | Girar el teléfono | El diseño se acomoda sin cortes | | |

Criterio: 9 de 9 en «sí». Cada «no» va al BACKLOG con prioridad Alta.
