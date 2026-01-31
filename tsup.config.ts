import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2019",
  outDir: "dist",
  outExtension({ format }) {
    return { js: format === "esm" ? ".js" : ".cjs" };
  }
});
