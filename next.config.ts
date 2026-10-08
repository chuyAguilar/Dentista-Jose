import type { NextConfig } from "next";

// Exportación estática (ADR-002): `next build` escribe HTML fijo en out/, sin servidor.
const nextConfig: NextConfig = {
  output: "export",
  // Sin AGENTS.md en la raíz (B8): el arnés ya guía a los agentes desde CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
