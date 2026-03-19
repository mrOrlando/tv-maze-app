import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// GitHub Pages project site: set VITE_BASE_PATH=/repo-name/ in CI (see .github/workflows)
const base = process.env.VITE_BASE_PATH?.replace(/\/?$/, '/') || '/';

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.ts', '.tsx', '.vue', '.js', '.mjs', '.json'],
  },
  server: {
    port: 8080,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts', 'tests/unit/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{vue,ts}'],
      exclude: ['src/app/entrypoint/main.ts', '**/*.spec.ts'],
    },
  },
});
