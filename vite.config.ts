import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // السطر ده هو اللي هيخلي الصور والملفات تشتغل صح أوتوماتيك على GitHub Pages
  base: "./",
  server: {
    allowedHosts: ["qkvpp4-5173.csb.app"],
  },
});
