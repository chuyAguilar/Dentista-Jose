import type { NextConfig } from "next";

// Exportación estática (ADR-002): `next build` escribe HTML fijo en out/, sin servidor.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
