import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // غيرنا دي لاسم المستودع بالظبط بين 2 سلاش
  base: "/Adham/", 
  server: {
    allowedHosts: ["qkvpp4-5173.csb.app"],
  },
});
