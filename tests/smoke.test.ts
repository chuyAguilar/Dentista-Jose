import { describe, expect, it } from "vitest";

// Prueba vacía: solo confirma que la suite arranca.
describe("smoke", () => {
  it("la suite corre", () => {
    expect(true).toBe(true);
  });
});
