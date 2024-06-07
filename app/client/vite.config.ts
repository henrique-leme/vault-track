/// <reference types="vitest" />

import relay from 'vite-plugin-relay'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [relay, react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components/*': path.resolve(__dirname, './src/components/*'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
})
