import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "client",
  resolve: {
    alias: {
      "@api": path.resolve("src/generated-client"),
    },
  },
  build: {
    outDir: path.resolve("client/dist"),
    emptyOutDir: true,
  },
});
