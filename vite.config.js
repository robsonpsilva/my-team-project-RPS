import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  server: {
    proxy: {
      "/clear": "http://localhost:5000", // Redireciona chamadas "/api" para o servidor backend
    }
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_list: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
