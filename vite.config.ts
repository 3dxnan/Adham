import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // التأكد من المسار الصحيح للمستودع
  base: "/Adham/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    allowedHosts: ["qkvpp4-5173.csb.app"],
  },
});
