import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Increase the warning limit (optional, but nice to silence the noise)
    chunkSizeWarningLimit: 1000, // Set to 1000kB (1MB)

    // 2. Configure Manual Chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Put all node_modules (vendor code) into specific chunks
          if (id.includes("node_modules")) {
            // Split out framer-motion because it is large
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            // Split out lucide-react icons
            if (id.includes("lucide-react")) {
              return "lucide-react";
            }
            // Put everything else (react, react-dom, etc.) into a vendor chunk
            return "vendor";
          }
        },
      },
    },
  },
});
