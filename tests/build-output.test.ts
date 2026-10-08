import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { dentist } from "../src/content/dentist";

// Lee el resultado del build. `pretest` corre `next build` antes (ADR-007), así out/ nunca está viejo.
const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "out", "index.html");
const EXPECTED_URL = "https://wa.me/527711437889?text=Hola%2C%20doctor.%20Quiero%20agendar%20una%20cita.";
const EXPECTED_GROUPED = "4152 3146 2155 8397";

const html = () => readFileSync(INDEX, "utf8");

describe("C5: salida estática", () => {
  it("existe out/index.html", () => {
    expect(existsSync(INDEX)).toBe(true);
  });
});

describe("C6: el HTML final lleva los datos", () => {
  it("el enlace exacto de C3 está en un href", () => {
    expect(html()).toContain(`href="${EXPECTED_URL}"`);
  });

  it("la tarjeta agrupada de 4 en 4 es un solo nodo de texto", () => {
    expect(html()).toContain(`>${EXPECTED_GROUPED}<`);
  });

  it("nombre, especialidad y textos visibles", () => {
    const text = html();
    for (const value of [
      dentist.name,
      dentist.specialty,
      dentist.bank.name,
      dentist.bank.holder,
      dentist.texts.heading,
      dentist.texts.whatsappButton,
      dentist.texts.paymentHeading,
      dentist.texts.copy,
    ]) {
      expect(text).toContain(value);
    }
  });

  it("idioma es-MX", () => {
    expect(html()).toContain('<html lang="es-MX"');
  });
});

describe("C7: peso", () => {
  it("≤ 500 000 bytes gzip (index.html + recursos)", () => {
    const run = spawnSync(process.execPath, [path.join(ROOT, "scripts", "measure-weight.mjs"), "--json"], {
      encoding: "utf8",
    });
    const result = JSON.parse(run.stdout) as { files: string[]; gzipBytes: number; limitBytes: number };
    expect(run.status).toBe(0);
    expect(result.limitBytes).toBe(500_000);
    expect(result.files).toContain("/index.html");
    expect(result.files.length).toBeGreaterThan(1);
    expect(result.gzipBytes).toBeGreaterThan(0);
    expect(result.gzipBytes).toBeLessThanOrEqual(500_000);
  });
});
