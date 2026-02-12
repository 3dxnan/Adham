import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["qkvpp4-5173.csb.app"], // هذا هو الرابط الذي ظهر في رسالة الخطأ عندك
  },
});
