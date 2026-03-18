import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.vue', '.js', '.mjs', '.json'],
  },
  server: {
    port: 8080,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.spec.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{vue,js}'],
      exclude: ['src/main.js', '**/*.spec.js'],
    },
  },
});
