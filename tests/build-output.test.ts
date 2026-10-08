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

  it("meta 003: secciones, cédulas y direcciones visibles", () => {
    const text = html();
    for (const value of [
      dentist.clinic,
      dentist.texts.servicesHeading,
      dentist.texts.officesHeading,
      dentist.hoursNote,
      ...dentist.licenses,
      ...dentist.services.map((s) => s.title),
      ...dentist.offices.flatMap((o) => [o.name, o.street, o.city]),
    ]) {
      expect(text).toContain(value);
    }
  });

  it("meta 003: un enlace de mapas por consultorio y el de llamada", () => {
    const text = html();
    expect(text.match(/href="https:\/\/www\.google\.com\/maps\/search\/\?api=1&amp;query=/g)).toHaveLength(2);
    expect(text).toContain('href="tel:+527711437889"');
  });

  it("meta 003: los enlaces externos abren aparte y sin opener", () => {
    const external = html().match(/<a [^>]*href="https:[^"]*"[^>]*>/g) ?? [];
    expect(external.length).toBeGreaterThanOrEqual(5);
    for (const tag of external) {
      expect(tag).toContain('target="_blank"');
      expect(tag).toContain('rel="noopener noreferrer"');
    }
  });

  it("meta 004: vista previa al compartir con URL absoluta y PNG de 1200×630", () => {
    const text = html();
    expect(text).toContain('<meta property="og:image" content="https://dentista-jose.vercel.app/og.png"/>');
    expect(text).toContain('<meta property="og:locale" content="es_MX"/>');
    expect(text).toContain(`<meta property="og:description" content="${dentist.tagline}"/>`);
    const png = readFileSync(path.join(ROOT, "out", "og.png"));
    // Firma PNG y, en el encabezado IHDR, ancho y alto en bytes 16–23.
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  it("meta 004: ícono SVG, color de tema y fuente servida desde el sitio", () => {
    const text = html();
    expect(text).toMatch(/<link rel="icon" href="\/icon\.svg[^"]*" sizes="any" type="image\/svg\+xml"\/>/);
    expect(text).toContain('<meta name="theme-color" content="#0b2d5b"/>');
    expect(text).toMatch(/href="\/_next\/static\/media\/[^"]+\.woff2"/);
    expect(text).not.toContain("fonts.googleapis.com");
    expect(text).not.toContain("fonts.gstatic.com");
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
