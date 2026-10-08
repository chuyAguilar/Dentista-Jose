import { describe, expect, it } from "vitest";
import { dentist } from "../src/content/dentist";
import { buildMapsUrl } from "../src/lib/maps";
import { buildTelUrl, formatMxPhone } from "../src/lib/phone";

describe("buildMapsUrl", () => {
  it("arma la búsqueda exacta de Tula", () => {
    expect(buildMapsUrl(["Cerrada Luis Monroy 101 A", "Col. San Marcos", "Tula, Hgo."])).toBe(
      "https://www.google.com/maps/search/?api=1&query=Cerrada%20Luis%20Monroy%20101%20A%2C%20Col.%20San%20Marcos%2C%20Tula%2C%20Hgo.",
    );
  });

  it("ignora partes vacías y espacios de más", () => {
    expect(buildMapsUrl([" Calle 1 ", "", "Pachuca"])).toBe(
      "https://www.google.com/maps/search/?api=1&query=Calle%201%2C%20Pachuca",
    );
  });

  it("rechaza una dirección vacía", () => {
    expect(() => buildMapsUrl(["", "  "])).toThrow();
  });

  it("cada consultorio tiene un enlace válido", () => {
    for (const o of dentist.offices) {
      expect(() => new URL(buildMapsUrl([o.street, o.area, o.city]))).not.toThrow();
    }
  });
});

describe("teléfono", () => {
  it("formato de la tarjeta: 771 143 78 89", () => {
    expect(formatMxPhone(dentist.phone.number)).toBe("771 143 78 89");
  });

  it("enlace tel: con código de país", () => {
    expect(buildTelUrl("52", "7711437889")).toBe("tel:+527711437889");
  });

  it.each(["771143788", "77114378890", "771 143 78 89"])("rechaza %j", (n) => {
    expect(() => formatMxPhone(n)).toThrow();
  });

  it("rechaza un código con «+»", () => {
    expect(() => buildTelUrl("+52", "7711437889")).toThrow();
  });
});
