// Mide C7 (ADR-005): gzip nivel 9 de out/index.html y de los recursos locales que referencia.
// Uso: node scripts/measure-weight.mjs [--json]. Sale con 1 si pasa del límite.
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

export const LIMIT_BYTES = 500_000;

// Rutas locales únicas de src= y href=. Las externas (https://, //) no cuentan: no las sirve nuestro CDN.
export function collectAssetPaths(html) {
  const found = new Set();
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const url = match[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    const clean = url.split(/[?#]/)[0];
    // Sin extensión es un enlace a una ruta, no un recurso.
    if (path.posix.extname(clean) === "") continue;
    found.add(clean);
  }
  return [...found].sort();
}

export function measureWeight(outDir) {
  const indexPath = path.join(outDir, "index.html");
  const html = readFileSync(indexPath, "utf8");
  const files = ["/index.html", ...collectAssetPaths(html)];
  let gzipBytes = 0;
  for (const rel of files) {
    const abs = path.join(outDir, ...rel.split("/").filter(Boolean));
    // Un recurso que falta subestimaría el peso: mejor fallar.
    if (!existsSync(abs) || !statSync(abs).isFile()) throw new Error(`Falta el recurso ${rel} en out/.`);
    gzipBytes += gzipSync(readFileSync(abs), { level: 9 }).length;
  }
  return { files, gzipBytes };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
  const result = measureWeight(outDir);
  const ok = result.gzipBytes <= LIMIT_BYTES;
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ ...result, limitBytes: LIMIT_BYTES, ok }));
  } else {
    console.log(`Archivos: ${result.files.length}`);
    console.log(`Peso gzip: ${result.gzipBytes} bytes (límite ${LIMIT_BYTES})`);
    console.log(ok ? "Dentro del límite." : "Pasa del límite.");
  }
  process.exit(ok ? 0 : 1);
}
