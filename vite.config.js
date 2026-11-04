import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');
          if (normalized.includes('/node_modules/')) {
            if (
              normalized.includes('/react/') ||
              normalized.includes('/react-dom/') ||
              normalized.includes('/scheduler/')
            ) {
              return 'vendor-react';
            }
            if (normalized.includes('/framer-motion/')) {
              return 'vendor-framer';
            }
            if (normalized.includes('/lucide-react/')) {
              return 'vendor-icons';
            }
            if (normalized.includes('/i18next') || normalized.includes('/react-i18next/')) {
              return 'vendor-i18n';
            }
            if (normalized.includes('/zod/')) {
              return 'vendor-zod';
            }
            return 'vendor-libs';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
