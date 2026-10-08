// Mide C2 y C3 (ADR-011): la página publicada responde 200 sobre https y trae los mismos marcadores que out/index.html.
// Uso: node scripts/check-deploy.mjs <url> [--json]
//      node scripts/check-deploy.mjs --html <archivo> [--json]   (sin red: el archivo hace de respuesta remota)
// Sale con 0 si todo coincide y con 1 si no. Nunca imprime el HTML.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const WHATSAPP_HREF = /\bhref="(https:\/\/wa\.me\/[^"]*)"/;
// Un nodo de texto con cuatro grupos de cuatro dígitos. Los dígitos salen del HTML; el script no guarda datos.
const GROUPED_CARD = />\s*(\d{4}(?: \d{4}){3})\s*</;
// Todos los enlaces externos y de llamada: detecta una versión vieja aunque WhatsApp y tarjeta no cambien.
const LINK_HREF = /\bhref="((?:https:|tel:)[^"]*)"/g;
const FETCH_TIMEOUT_MS = 20_000;

export function extractMarkers(html) {
  return {
    whatsappHref: html.match(WHATSAPP_HREF)?.[1] ?? null,
    groupedCard: html.match(GROUPED_CARD)?.[1] ?? null,
    links: [...new Set([...html.matchAll(LINK_HREF)].map((m) => m[1]))].sort().join(" | ") || null,
  };
}

// Corre antes de cualquier petición: una URL http:// no debe tocar la red.
export function checkTarget(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return `no se puede leer la URL «${url}»`;
  }
  if (parsed.protocol !== "https:") return `la URL no es https (${parsed.protocol})`;
  return null;
}

// Única función con red. Un certificado inválido hace que fetch lance: el que llama lo reporta como fallo de C2.
export async function fetchPage(url) {
  const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  return { status: response.status, finalUrl: response.url, html: await response.text() };
}

// No compara byte a byte: el id del build cambia entre builds y daría falsos fallos.
export function checkDeploy(localHtml, remote) {
  const problems = [];
  if (remote.status !== 200) problems.push(`estado ${remote.status}, se esperaba 200`);
  if (checkTarget(remote.finalUrl) !== null) problems.push(`la URL final no es https (${remote.finalUrl})`);

  const local = extractMarkers(localHtml);
  const published = extractMarkers(remote.html);
  const pairs = [
    ["el enlace de WhatsApp", local.whatsappHref, published.whatsappHref],
    ["la tarjeta agrupada", local.groupedCard, published.groupedCard],
    ["la lista de enlaces", local.links, published.links],
  ];
  for (const [name, expected, found] of pairs) {
    if (expected === null) problems.push(`out/index.html no trae ${name}`);
    else if (found === null) problems.push(`la página publicada no trae ${name}`);
    else if (found !== expected) problems.push(`${name} de la página publicada no coincide con out/index.html`);
  }
  return { ok: problems.length === 0, problems };
}

function describeFetchError(error) {
  // fetch de Node envuelve el motivo real (certificado, DNS, tiempo) en `cause`.
  const cause = error?.cause;
  const detail = cause?.code ?? cause?.message ?? error?.name ?? "";
  return `no se pudo pedir la página (C2): ${error?.message ?? error}${detail ? ` · ${detail}` : ""}`;
}

function report(result, markers, asJson) {
  if (asJson) {
    console.log(JSON.stringify({ ok: result.ok, problems: result.problems, markers }));
  } else if (result.ok) {
    console.log("Coincide: estado 200, https y los tres marcadores iguales a out/index.html.");
  } else {
    console.log("No coincide:");
    for (const problem of result.problems) console.log(`- ${problem}`);
  }
  // exitCode y no process.exit: en Windows, salir con un socket de fetch aún abierto rompe libuv (código 127).
  process.exitCode = result.ok ? 0 : 1;
}

async function main(argv) {
  const asJson = argv.includes("--json");
  const args = argv.filter((arg) => arg !== "--json");
  const htmlIndex = args.indexOf("--html");
  const emptyMarkers = { local: null, remote: null };

  let target = null;
  if (htmlIndex === -1) {
    target = args[0];
    if (!target) {
      console.log("Uso: node scripts/check-deploy.mjs <url> [--json] | --html <archivo> [--json]");
      process.exitCode = 1;
      return;
    }
    const reason = checkTarget(target);
    if (reason) return report({ ok: false, problems: [reason] }, emptyMarkers, asJson);
  }

  const localPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out", "index.html");
  if (!existsSync(localPath)) {
    return report({ ok: false, problems: ["falta out/index.html: corre `npm run build`"] }, emptyMarkers, asJson);
  }
  const localHtml = readFileSync(localPath, "utf8");

  let remote;
  if (htmlIndex !== -1) {
    const file = args[htmlIndex + 1];
    if (!file || !existsSync(file)) {
      return report({ ok: false, problems: [`no existe el archivo de --html: ${file ?? "(falta)"}`] }, emptyMarkers, asJson);
    }
    // Sin red: el archivo se trata como si Vercel lo hubiera servido con 200 sobre https.
    remote = { status: 200, finalUrl: "https://localhost/", html: readFileSync(file, "utf8") };
  } else {
    try {
      remote = await fetchPage(target);
    } catch (error) {
      return report({ ok: false, problems: [describeFetchError(error)] }, emptyMarkers, asJson);
    }
  }

  const result = checkDeploy(localHtml, remote);
  report(result, { local: extractMarkers(localHtml), remote: extractMarkers(remote.html) }, asJson);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) await main(process.argv.slice(2));
