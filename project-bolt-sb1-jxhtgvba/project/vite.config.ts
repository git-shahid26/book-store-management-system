import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
   optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base:"/book-store-management-system",
resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
