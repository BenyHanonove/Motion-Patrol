import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "removeAttrs",
              params: { attrs: "(fill|stroke)" },
            },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@mappers": path.resolve(__dirname, "src/data/mappers"),
      "@models": path.resolve(__dirname, "../libs/models/index.ts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@providers": path.resolve(__dirname, "src/data/providers"),
      "@router": path.resolve(__dirname, "src/config/router/index.ts"),
      "@services": path.resolve(__dirname, "src/data/services"),
      "@slice": path.resolve(__dirname, "src/store/slice"),
      "@store": path.resolve(__dirname, "src/store/index.ts"),
      "@theme": path.resolve(__dirname, "src/config/theme/index.ts"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
