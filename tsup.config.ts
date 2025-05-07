import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  external: ["react/jsx-runtime"],
  treeshake: "recommended",
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
});
