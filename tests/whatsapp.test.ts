import { describe, expect, it } from "vitest";
import { dentist } from "../src/content/dentist";
import { buildWhatsAppUrl } from "../src/lib/whatsapp";

// C3: el enlace exacto, con los datos del contenido.
const EXPECTED = "https://wa.me/527711437889?text=Hola%2C%20doctor.%20Quiero%20agendar%20una%20cita.";

describe("buildWhatsAppUrl", () => {
  it("arma el enlace exacto de C3", () => {
    const { countryCode, number } = dentist.phone;
    expect(buildWhatsAppUrl(countryCode, number, dentist.whatsappMessage)).toBe(EXPECTED);
  });

  it("codifica acentos y signos", () => {
    expect(buildWhatsAppUrl("52", "1", "¿Sí? & más")).toBe("https://wa.me/521?text=%C2%BFS%C3%AD%3F%20%26%20m%C3%A1s");
  });

  it.each([
    ["+52", "7711437889"],
    ["52", "771 143 7889"],
    ["", "7711437889"],
    ["52", ""],
  ])("rechaza código %j o número %j que no sean solo dígitos", (code, number) => {
    expect(() => buildWhatsAppUrl(code, number, "hola")).toThrow();
  });
});
