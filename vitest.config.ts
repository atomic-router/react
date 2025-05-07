import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        exclude: /node_modules.*/,
      },
    }),
  ],
  test: {
    // It is required for auto cleanup to work
    // https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
  },
});
