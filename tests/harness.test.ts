import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Pruebas del arnés: fallan si se pierde una pieza, un tope o una negación.
const ROOT = path.resolve(__dirname, "..");
const read = (rel: string) => readFileSync(path.join(ROOT, rel), "utf8");
const exists = (rel: string) => existsSync(path.join(ROOT, rel));

const PIECES = [
  "CLAUDE.md",
  "memory.md",
  "README.md",
  ".gitignore",
  ".gitattributes",
  ".mcp.json",
  ".claude/settings.json",
  ".claude/hooks/guard.mjs",
  ".claude/hooks/role-guard.mjs",
  "docs/constitution.md",
  "docs/ARCHITECTURE.md",
  "docs/DECISIONS.md",
  "docs/CONTEXT.md",
  "docs/BACKLOG.md",
  "docs/PRUEBAS.md",
  "docs/history/README.md",
  "specs/_plantilla/spec.md",
  "specs/_plantilla/plan.md",
  "specs/_plantilla/clarify.md",
  "specs/_plantilla/tasks.md",
  ...["direccion", "planificacion", "desarrollo", "pruebas"].map((a) => `.claude/agents/${a}.md`),
  ...["planear", "fase", "cerrar-fase", "encargo-pruebas", "paridad-tarjeta", "prueba-android"].map(
    (s) => `.claude/skills/${s}/SKILL.md`,
  ),
];

const AGENTS = ["direccion", "planificacion", "desarrollo", "pruebas"];
const MAX_LINE = 2000;
const BOOT_BUDGET = 48 * 1024;
const MEMORY_BUDGET = 12 * 1024;

function walk(rel: string): string[] {
  const abs = path.join(ROOT, rel);
  if (!existsSync(abs)) return [];
  if (statSync(abs).isFile()) return [rel];
  return readdirSync(abs).flatMap((name) => walk(path.posix.join(rel, name)));
}

// Archivos del arnés: todo lo que no es código de la app ni dependencias.
function harnessFiles(): string[] {
  const roots = ["CLAUDE.md", "memory.md", "README.md", ".mcp.json", "docs", "specs", ".claude"];
  return roots.flatMap(walk).filter((f) => /\.(md|json|mjs)$/.test(f));
}

function activeSpec(): string {
  const match = read("memory.md").match(/^Spec activo: (specs\/[^\s]+\/)$/m);
  if (!match) throw new Error("memory.md no tiene la línea «Spec activo: specs/NNN-nombre/».");
  return match[1];
}

function bootFiles(): string[] {
  const spec = activeSpec();
  return ["docs/constitution.md", "memory.md", "docs/CONTEXT.md", "CLAUDE.md", `${spec}spec.md`, `${spec}tasks.md`];
}

// Títulos ## y ### fuera de bloques de código, sin el propio «Índice».
function headings(text: string): string[] {
  let inFence = false;
  const out: string[] = [];
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    const m = !inFence && line.match(/^#{2,3} (.+)$/);
    if (m && m[1] !== "Índice") out.push(m[1].trim());
  }
  return out;
}

function indexEntries(text: string): string[] {
  const section = text.split(/^## Índice$/m)[1]?.split(/^## /m)[0] ?? "";
  return [...section.matchAll(/^\s*- \[([^\]]+)\]\(#/gm)].map((m) => m[1].trim());
}

function runHook(script: string, args: string[], event: unknown) {
  const result = spawnSync(process.execPath, [path.join(ROOT, ".claude/hooks", script), ...args], {
    input: typeof event === "string" ? event : JSON.stringify(event),
    env: { ...process.env, CLAUDE_PROJECT_DIR: ROOT },
    encoding: "utf8",
  });
  return result.status;
}

describe("piezas del arnés", () => {
  it.each(PIECES)("existe %s", (rel) => {
    expect(exists(rel)).toBe(true);
  });
});

describe("memoria y arranque", () => {
  it("memory.md nombra un spec activo que existe", () => {
    expect(exists(activeSpec() + "spec.md")).toBe(true);
    expect(exists(activeSpec() + "tasks.md")).toBe(true);
  });

  it(`el arranque pesa ≤ ${BOOT_BUDGET} bytes`, () => {
    const total = bootFiles().reduce((sum, f) => sum + Buffer.byteLength(read(f)), 0);
    expect(total).toBeLessThanOrEqual(BOOT_BUDGET);
  });

  it(`memory.md pesa ≤ ${MEMORY_BUDGET} bytes`, () => {
    expect(Buffer.byteLength(read("memory.md"))).toBeLessThanOrEqual(MEMORY_BUDGET);
  });
});

describe("formato", () => {
  it(`ninguna línea del arnés pasa de ${MAX_LINE} caracteres`, () => {
    const long = harnessFiles().flatMap((f) =>
      read(f)
        .split("\n")
        .map((line, i) => ({ f, i: i + 1, n: line.length }))
        .filter((x) => x.n > MAX_LINE),
    );
    expect(long).toEqual([]);
  });

  it("cada índice coincide con sus títulos", () => {
    const files = harnessFiles().filter((f) => f.endsWith(".md") && /^## Índice$/m.test(read(f)));
    expect(files.length).toBeGreaterThan(0);
    for (const f of files) {
      const entries = indexEntries(read(f));
      if (entries.length === 0) continue;
      expect(entries, f).toEqual(headings(read(f)));
    }
  });
});

describe("roles", () => {
  it.each(AGENTS)("el agente %s tiene su hook de rol", (name) => {
    const text = read(`.claude/agents/${name}.md`);
    const front = text.split(/^---$/m)[1] ?? "";
    expect(front).toMatch(new RegExp(`^name: ${name}$`, "m"));
    expect(front).toMatch(/PreToolUse:/);
    expect(front).toContain(`role-guard.mjs\\" ${name} || exit 2`);
  });
});

describe("settings.json", () => {
  // Se lee dentro de cada prueba: si falta el archivo, falla la prueba y no toda la suite.
  const loadSettings = () => JSON.parse(read(".claude/settings.json"));

  it.each([
    "Bash(git commit *)",
    "Bash(git push *)",
    "Bash(git * commit *)",
    "Bash(git * push *)",
    "PowerShell(git commit *)",
    "PowerShell(git push *)",
    "PowerShell(git * commit *)",
    "PowerShell(git * push *)",
    "Read(./info/**)",
    "Edit(./info/**)",
  ])("niega %s", (rule) => {
    expect(loadSettings().permissions?.deny ?? []).toContain(rule);
  });

  it("sin atribución y sin memoria privada", () => {
    const settings = loadSettings();
    expect(settings.attribution).toEqual({ commit: "", pr: "" });
    expect(settings.autoMemoryEnabled).toBe(false);
  });

  it("hook global en PreToolUse, que falla cerrado", () => {
    const entries = loadSettings().hooks?.PreToolUse ?? [];
    const global = entries.find((e: { matcher: string }) => e.matcher === "*");
    expect(global?.hooks?.[0]?.command).toMatch(/guard\.mjs" \|\| exit 2$/);
  });

  it("MCP habilitados = declarados en .mcp.json", () => {
    const declared = Object.keys(JSON.parse(read(".mcp.json")).mcpServers);
    expect(loadSettings().enabledMcpjsonServers).toEqual(declared);
  });
});

describe("hook global guard.mjs", () => {
  const bash = (command: string) => ({ tool_name: "Bash", tool_input: { command } });
  const ps = (command: string) => ({ tool_name: "PowerShell", tool_input: { command } });

  it.each([
    bash("git commit -m x"),
    bash("git -C . commit -m x"),
    bash('git -c user.name="a" commit'),
    bash("cd src && git push origin main"),
    bash("git rebase -i HEAD~2"),
    bash("GIT.EXE Commit"),
    ps("git push"),
    ps("& git.exe -C . commit --amend"),
    bash("ls info"),
    bash("cat info/foto.jpeg"),
    bash('cp "info\\foto.jpeg" x'),
    ps("Get-ChildItem .\\info"),
    { tool_name: "Read", tool_input: { file_path: "C:\\Dev\\x\\info\\a.jpeg" } },
    { tool_name: "Glob", tool_input: { pattern: "info/**" } },
    { tool_name: "Grep", tool_input: { pattern: "x", path: "./info" } },
    { tool_name: "Write", tool_input: { file_path: "info/nuevo.txt", content: "x" } },
    { tool_name: "mcp__context7__query-docs", tool_input: { query: "leer info/REF-05" } },
  ])("niega %j", (event) => {
    expect(runHook("guard.mjs", [], event)).toBe(2);
  });

  it.each([
    bash("npm test"),
    bash("git status --short"),
    bash("git log --oneline -5"),
    { tool_name: "Read", tool_input: { file_path: "docs/CONTEXT.md" } },
    { tool_name: "Write", tool_input: { file_path: "src/lib/x.ts", content: "más info aquí" } },
    { tool_name: "mcp__context7__query-docs", tool_input: { query: "next.js static export" } },
  ])("permite %j", (event) => {
    expect(runHook("guard.mjs", [], event)).toBe(0);
  });

  it("falla cerrado con entrada inválida", () => {
    expect(runHook("guard.mjs", [], "esto no es json")).toBe(2);
  });
});

describe("hook de rol role-guard.mjs", () => {
  const write = (file_path: string) => ({ tool_name: "Write", tool_input: { file_path, content: "x" } });

  it.each([
    ["direccion", "src/app/page.tsx"],
    ["direccion", "docs/constitution.md"],
    ["direccion", "specs/001-x/plan.md"],
    ["planificacion", "src/lib/x.ts"],
    ["planificacion", "specs/001-x/spec.md"],
    ["desarrollo", "docs/PRUEBAS.md"],
    ["desarrollo", "docs/constitution.md"],
    ["desarrollo", ".claude/settings.json"],
    ["desarrollo", "tests/harness.test.ts"],
    ["pruebas", "src/lib/x.ts"],
    ["pruebas", "tests/x.test.ts"],
    ["desarrollo", "../fuera.txt"],
  ])("%s no escribe %s", (role, file) => {
    expect(runHook("role-guard.mjs", [role], write(file))).toBe(2);
  });

  it.each([
    ["direccion", "specs/001-x/spec.md"],
    ["direccion", "docs/DECISIONS.md"],
    ["planificacion", "specs/001-x/plan.md"],
    ["desarrollo", "src/lib/x.ts"],
    ["desarrollo", "tests/x.test.ts"],
    ["desarrollo", "specs/001-x/tasks.md"],
    ["pruebas", "docs/PRUEBAS.md"],
  ])("%s sí escribe %s", (role, file) => {
    expect(runHook("role-guard.mjs", [role], write(file))).toBe(0);
  });

  it("falla cerrado con un rol desconocido", () => {
    expect(runHook("role-guard.mjs", ["intruso"], write("src/x.ts"))).toBe(2);
  });
});
