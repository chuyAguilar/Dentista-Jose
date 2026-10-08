import { describe, expect, it } from "vitest";
import { dentist } from "../src/content/dentist";
import { groupDigits, onlyDigits } from "../src/lib/digits";

describe("onlyDigits", () => {
  it("quita espacios, guiones y letras", () => {
    expect(onlyDigits(" 4152-3146 2155a8397 ")).toBe("4152314621558397");
  });

  it("deja igual una cadena de solo dígitos", () => {
    expect(onlyDigits(dentist.bank.cardNumber)).toBe(dentist.bank.cardNumber);
  });
});

describe("groupDigits", () => {
  it("agrupa la tarjeta de 4 en 4", () => {
    expect(groupDigits(dentist.bank.cardNumber)).toBe("4152 3146 2155 8397");
  });

  it("deja el último grupo corto si no alcanza", () => {
    expect(groupDigits("1234567", 3)).toBe("123 456 7");
  });

  it("cadena vacía da cadena vacía", () => {
    expect(groupDigits("")).toBe("");
  });

  it("rechaza un tamaño inválido", () => {
    expect(() => groupDigits("1234", 0)).toThrow();
  });
});
