import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Type casting process as any to avoid TS error about missing cwd property
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
    define: {
      // Polyfill process.env for the existing code structure
      'process.env': env
    }
  };
});