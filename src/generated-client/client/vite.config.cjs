const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "../src/generated-client"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});