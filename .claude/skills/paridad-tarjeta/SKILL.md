---
name: paridad-tarjeta
description: Genera la tabla de comparación entre los datos publicados en src/content y la tarjeta de papel, para que el autor la revise campo por campo (P8).
disable-model-invocation: true
---

# /paridad-tarjeta

La referencia es la tarjeta de papel del dentista. El agente no la ve: `info/` está prohibida (P1).
Por eso el agente arma la tabla y el autor compara a mano.

1. Lee los datos de `src/content/`.
2. Escribe `Claude outputs/paridad/AAAA-MM-DD.md` con una fila por campo:

| Campo | Valor en la página | Referencia (REF-NN) | ¿Coincide? (autor) |
|---|---|---|---|

   Campos: nombre, especialidad, cédula 1, cédula 2, teléfono, WhatsApp (enlace final), correo, dirección Tula, dirección Pachuca, banco, titular, tarjeta, CLABE, horarios.
3. Los números se muestran agrupados de 4 en 4 para leerlos fácil.
4. Devuelve: ruta del archivo · número de campos · campos pendientes (A1, A2).
5. El autor llena la última columna. El criterio es 100 % de «sí» en los campos no pendientes.
