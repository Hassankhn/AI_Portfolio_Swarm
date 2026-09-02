import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    proxy: {
      '/alpaca-api': {
        target: 'https://paper-api.alpaca.markets',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/alpaca-api/, ''),
        headers: {
          'Origin': 'https://paper-api.alpaca.markets'
        }
      },
      '/alpaca-live-api': {
        target: 'https://api.alpaca.markets',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/alpaca-live-api/, ''),
        headers: {
          'Origin': 'https://api.alpaca.markets'
        }
      },
      '/alpaca-data': {
        target: 'https://data.alpaca.markets',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/alpaca-data/, '')
      }
    }
  }
});
