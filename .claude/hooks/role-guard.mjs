// Hook PreToolUse de rol. Uso: node role-guard.mjs <rol>
// Niega escribir fuera de las rutas que ese rol puede escribir.
// Falla cerrado: rol desconocido o cualquier error termina con código 2.
import { readFileSync } from "node:fs";
import path from "node:path";

const WRITE_TOOLS = new Set(["Write", "Edit", "MultiEdit", "NotebookEdit"]);

// Patrones relativos a la raíz del repo, en minúsculas y con barras /.
export const ROLE_WRITES = {
  direccion: [
    /^specs\/[^/]+\/(spec|clarify|tasks)\.md$/,
    /^docs\/(decisions|backlog|context)\.md$/,
    /^docs\/history\//,
    /^memory\.md$/,
    /^claude outputs\//,
  ],
  planificacion: [/^specs\/[^/]+\/(plan|clarify)\.md$/, /^claude outputs\//],
  desarrollo: [
    /^src\//,
    /^public\//,
    /^scripts\//,
    /^tests\/(?!harness\.test\.ts$)/,
    /^(package\.json|package-lock\.json|tsconfig\.json|next\.config\.[mc]?[jt]s|vitest\.config\.m?ts|playwright\.config\.[mc]?[jt]s)$/,
    /^specs\/[^/]+\/tasks\.md$/,
    /^memory\.md$/,
    /^docs\/(backlog|architecture|context)\.md$/,
    /^docs\/history\//,
    /^claude outputs\//,
  ],
  pruebas: [/^docs\/pruebas\.md$/, /^claude outputs\/pruebas\//],
};

export function toRelative(filePath, root) {
  const rel = path.relative(root, path.resolve(root, filePath));
  return rel.replace(/\\/g, "/").toLowerCase();
}

// Devuelve el motivo de la negación, o null si se permite.
export function checkRole(role, event, root) {
  const allowed = ROLE_WRITES[role];
  if (!allowed) return `Rol desconocido: ${role}.`;
  if (!WRITE_TOOLS.has(event?.tool_name)) return null;

  const target = event.tool_input?.file_path ?? event.tool_input?.notebook_path;
  if (typeof target !== "string") return "Escritura sin ruta de archivo.";
  const rel = toRelative(target, root);
  if (rel.startsWith("..")) return `El rol ${role} no escribe fuera del repo.`;
  if (allowed.some((re) => re.test(rel))) return null;
  return `El rol ${role} no escribe en ${rel}.`;
}

function main() {
  try {
    const role = process.argv[2];
    const event = JSON.parse(readFileSync(0, "utf8"));
    const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
    const reason = checkRole(role, event, root);
    if (reason) {
      process.stderr.write(`Negado por role-guard.mjs: ${reason}\n`);
      process.exit(2);
    }
    process.exit(0);
  } catch (error) {
    process.stderr.write(`role-guard.mjs falló y niega por seguridad: ${error?.message ?? error}\n`);
    process.exit(2);
  }
}

if (process.argv[1] && process.argv[1].replace(/\\/g, "/").endsWith("/role-guard.mjs")) main();
