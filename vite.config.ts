import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // السطر اللي تحت ده هو أهم سطر عشان الموقع يفتح على GitHub Pages
  base: "/Adham/", 
  server: {
    allowedHosts: ["qkvpp4-5173.csb.app"], 
  },
});
