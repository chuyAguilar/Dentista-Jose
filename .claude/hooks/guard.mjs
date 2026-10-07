// Hook PreToolUse global (P1, P2).
// Niega cualquier herramienta que toque info/ o que haga commit, push o reescriba el historial de git.
// Falla cerrado: cualquier error termina con código 2, que niega la herramienta.
import { readFileSync } from "node:fs";

// Rutas de archivos que pueden traer las herramientas de archivos.
const PATH_KEYS = ["file_path", "path", "notebook_path", "pattern", "glob"];
// Herramientas de shell: se revisa el comando completo.
const SHELL_TOOLS = new Set(["Bash", "PowerShell"]);

const SENSITIVE_PATH = /(^|[\/"'\s=:(*])info([\/"'\s)*]|$)/i;
const SENSITIVE_IN_TEXT = /(^|[\s"'=\/(])info([\/"'\s)*;|&]|$)/i;
const GIT_FORBIDDEN =
  /\bgit(\.exe)?["']?\s[^|;&\n]*?\b(commit|push|rebase|filter-branch|filter-repo|replace)\b/i;

export function normalize(text) {
  return String(text).replace(/\\/g, "/");
}

// Devuelve el motivo de la negación, o null si se permite.
export function check(event) {
  const tool = event?.tool_name;
  const input = event?.tool_input ?? {};
  if (typeof tool !== "string") return "Entrada del hook sin tool_name.";

  if (SHELL_TOOLS.has(tool)) {
    const command = normalize(input.command ?? "");
    if (SENSITIVE_IN_TEXT.test(command)) return "El comando nombra la carpeta sensible info/ (P1).";
    if (GIT_FORBIDDEN.test(command)) return "Commit, push o reescritura de git: solo el autor (P2).";
    return null;
  }

  for (const key of PATH_KEYS) {
    if (typeof input[key] === "string" && SENSITIVE_PATH.test(normalize(input[key]))) {
      return `La herramienta ${tool} apunta a la carpeta sensible info/ (P1).`;
    }
  }

  // Herramientas de MCP y otras: se revisa toda la entrada como texto.
  if (tool.startsWith("mcp__")) {
    const raw = normalize(JSON.stringify(input));
    if (SENSITIVE_PATH.test(raw) || /REF-\d\d/.test(raw)) {
      return "Por un MCP no salen rutas de info/ ni ids REF-NN (P1, ADR-004).";
    }
  }
  return null;
}

function main() {
  try {
    const event = JSON.parse(readFileSync(0, "utf8"));
    const reason = check(event);
    if (reason) {
      process.stderr.write(`Negado por guard.mjs: ${reason}\n`);
      process.exit(2);
    }
    process.exit(0);
  } catch (error) {
    process.stderr.write(`guard.mjs falló y niega por seguridad: ${error?.message ?? error}\n`);
    process.exit(2);
  }
}

if (process.argv[1] && normalize(process.argv[1]).endsWith("/guard.mjs")) main();
