import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'public',
    target: 'esnext', // Ensure ESNext target for compatibility
    commonjsOptions: {
      transformMixedEsModules: true, // Allow mixed module formats
    },
  },
});
