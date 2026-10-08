import { describe, expect, it } from "vitest";
import { dentist } from "../src/content/dentist";

// C2 (parte automática): cada dato contra su valor aprobado, dígito por dígito (P8).
const EXPECTED_CARD = "4152314621558397";
const EXPECTED_PHONE = "7711437889";

// Dígito verificador de Luhn: atrapa un dígito mal tecleado.
function luhnValid(digits: string): boolean {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

describe("contenido del dentista", () => {
  it("identidad exacta", () => {
    expect(dentist.title).toBe("C.D.");
    expect(dentist.name).toBe("José Ángel Jiménez Tapia");
    expect(dentist.specialty).toBe("Especialista en Ortodoncia");
  });

  it("teléfono: código 52 y 10 dígitos exactos", () => {
    expect(dentist.phone.countryCode).toBe("52");
    expect(dentist.phone.number).toMatch(/^\d{10}$/);
    expect([...dentist.phone.number]).toEqual([...EXPECTED_PHONE]);
  });

  it("mensaje de WhatsApp exacto", () => {
    expect(dentist.whatsappMessage).toBe("Hola, doctor. Quiero agendar una cita.");
  });

  it("banco, titular y tipo exactos", () => {
    expect(dentist.bank.name).toBe("BBVA");
    expect(dentist.bank.holder).toBe("José Ángel Jiménez");
    expect(dentist.bank.accountType).toBe("tarjeta de débito");
  });

  it("tarjeta: 16 dígitos exactos, sin espacios", () => {
    expect(dentist.bank.cardNumber).toMatch(/^\d{16}$/);
    expect([...dentist.bank.cardNumber]).toEqual([...EXPECTED_CARD]);
  });

  it("tarjeta: dígito verificador de Luhn válido", () => {
    expect(luhnValid(dentist.bank.cardNumber)).toBe(true);
    // Control: un dígito cambiado debe fallar.
    expect(luhnValid("4152314621558398")).toBe(false);
  });

  it("textos de la página, de tú", () => {
    expect(dentist.texts).toEqual({
      heading: "Agenda tu cita",
      whatsappButton: "Escríbeme por WhatsApp",
      paymentHeading: "Datos para tu pago",
      copy: "Copiar",
      copied: "Copiado",
      copyFallback: "Mantén presionado para copiar",
    });
  });
});
