import { defineConfig } from "vitest/config";

// Solo corre pruebas de tests/. Nunca entra en info/.
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["node_modules/**", "info/**"],
  },
});
