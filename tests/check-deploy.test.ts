import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";

// Corre el script como proceso hijo y sin red (ADR-011). Importar el .mjs sin tipos rompería el chequeo de tipos del build.
const ROOT = path.resolve(__dirname, "..");
const SCRIPT = path.join(ROOT, "scripts", "check-deploy.mjs");
const INDEX = path.join(ROOT, "out", "index.html");
const TMP = mkdtempSync(path.join(os.tmpdir(), "check-deploy-"));

type Result = { ok: boolean; problems: string[] };

function run(args: string[]) {
  const child = spawnSync(process.execPath, [SCRIPT, ...args, "--json"], { encoding: "utf8", timeout: 30_000 });
  return { status: child.status, result: JSON.parse(child.stdout) as Result };
}

function writeVariant(name: string, html: string): string {
  const file = path.join(TMP, name);
  writeFileSync(file, html, "utf8");
  return file;
}

afterAll(() => {
  rmSync(TMP, { recursive: true, force: true });
});

describe("check-deploy (C2 y C3, sin red)", () => {
  it("out/index.html contra sí mismo: código 0 y sin problemas", () => {
    const { status, result } = run(["--html", INDEX]);
    expect(result.problems).toEqual([]);
    expect(result.ok).toBe(true);
    expect(status).toBe(0);
  });

  it("sin el enlace de WhatsApp: código 1 y un problema que lo nombra", () => {
    const html = readFileSync(INDEX, "utf8").replace(/href="https:\/\/wa\.me\/[^"]*"/g, 'href="#"');
    const { status, result } = run(["--html", writeVariant("sin-whatsapp.html", html)]);
    expect(status).toBe(1);
    expect(result.problems.some((problem) => problem.includes("WhatsApp"))).toBe(true);
  });

  it("con la tarjeta alterada: código 1 y un problema que la nombra", () => {
    const original = readFileSync(INDEX, "utf8");
    // Los dígitos salen del propio HTML: la prueba no escribe el número.
    const grouped = original.match(/>\s*(\d{4}(?: \d{4}){3})\s*</)?.[1];
    expect(grouped).toBeDefined();
    const last = Number(grouped!.at(-1));
    const altered = grouped!.slice(0, -1) + String((last + 1) % 10);
    const html = original.split(grouped!).join(altered);
    const { status, result } = run(["--html", writeVariant("tarjeta-alterada.html", html)]);
    expect(status).toBe(1);
    expect(result.problems.some((problem) => problem.includes("tarjeta"))).toBe(true);
  });

  it("sin un enlace de mapas (versión vieja): código 1 y un problema que nombra los enlaces", () => {
    const original = readFileSync(INDEX, "utf8");
    const first = original.match(/href="https:\/\/www\.google\.com\/maps\/[^"]*"/)?.[0];
    expect(first).toBeDefined();
    const { status, result } = run(["--html", writeVariant("sin-mapa.html", original.split(first!).join('href="#"'))]);
    expect(status).toBe(1);
    expect(result.problems.some((problem) => problem.includes("enlaces"))).toBe(true);
  });

  it("una URL http:// sale con 1 y «no es https», sin pedir la página", () => {
    // 192.0.2.1 es una dirección reservada para documentación: si el script la pidiera, tardaría o fallaría distinto.
    const { status, result } = run(["http://192.0.2.1/"]);
    expect(status).toBe(1);
    expect(result.problems).toHaveLength(1);
    expect(result.problems[0]).toContain("no es https");
  });
});
