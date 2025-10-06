// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const BASE_URL = "/pwa-1-thing/";
export default defineConfig({
  base: BASE_URL,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg}"],
      },
      manifest: {
        name: "PWA 1-thing",
        short_name: "PWA 1-thing",
        start_url: BASE_URL,
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        orientation: "portrait",
        icons: [
          {
            src: `${BASE_URL}icon-192x192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${BASE_URL}icon-512x512.png`,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
