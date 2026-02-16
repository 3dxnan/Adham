import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // استبدل 'Adham' باسم المستودع بتاعك بالضبط كما يظهر في رابط GitHub
  base: '/Adham/', 
  server: {
    allowedHosts: ["qkvpp4-5173.csb.app"],
  },
});