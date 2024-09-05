import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
    host: "0.0.0.0", // Allows access from other devices on the network
    port: 5173,
  },
  plugins: [react()],
});
